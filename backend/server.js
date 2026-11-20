import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import contentRoutes from './routes/content.routes.js';
import { initDatabase } from './models/index.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be configured and should be at least 32 characters.');
}

// Required when Express is behind Nginx/Cloudflare so req.protocol and client IP
// are resolved correctly. Keep TRUST_PROXY=0 locally unless you need it.
if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1);
}

app.disable('x-powered-by');

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map((value) => value.trim().replace(/\/+$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Server-to-server calls and tools such as curl/Postman may have no Origin.
      if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
        return callback(null, true);
      }
      return callback(new Error('Origin is not allowed by CORS.'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
if (!isProduction) app.use(morgan('dev'));

app.use(
  '/api/uploads',
  express.static(path.join(process.cwd(), 'uploads'), {
    maxAge: isProduction ? '1y' : 0,
    immutable: isProduction,
    etag: true,
    setHeaders(res) {
      // Filenames are unique, so production browsers/CDNs can safely cache them for a year.
      if (isProduction) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Allows the frontend to display media when API and website use different subdomains.
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  })
);

app.get('/api/health', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ ok: true, service: 'AAMF CMS API' });
});

app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);

app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'API route not found.' });
});

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Image is too large. Maximum upload size is controlled by IMAGE_UPLOAD_MAX_MB (15 MB by default).' });
  }

  if (err?.message === 'Only JPG, PNG and WEBP images are allowed.') {
    return res.status(400).json({ message: err.message });
  }

  if (err?.code === 'IMAGE_OPTIMIZATION_FAILED') {
    return res.status(400).json({ message: err.message });
  }

  if (err?.original?.code === 'ER_DATA_TOO_LONG') {
    return res.status(400).json({ message: 'One of the fields is too long. The title can be at most 220 characters.' });
  }

  if (err?.message === 'Origin is not allowed by CORS.') {
    return res.status(403).json({ message: err.message });
  }

  const message = isProduction ? 'Something went wrong.' : err.message || 'Something went wrong.';
  return res.status(500).json({ message });
});

async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`AAMF CMS API running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
