import bcrypt from 'bcryptjs';
import { ensureDatabase, ensureUtf8mb4Tables, sequelize } from '../config/db.js';
import { Admin } from './Admin.js';
import { ContentPost } from './ContentPost.js';

export { sequelize, Admin, ContentPost };

async function ensureInitialAdmin() {
  const totalAdmins = await Admin.count();
  if (totalAdmins > 0) return;

  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
  const adminName = process.env.DEFAULT_ADMIN_NAME?.trim() || 'AAMF Admin';

  if (!adminEmail || !adminPassword) {
    console.warn(
      'No admin account exists. Set DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD in .env, restart once, then remove DEFAULT_ADMIN_PASSWORD after the admin is created.'
    );
    return;
  }

  if (adminPassword.length < 12) {
    throw new Error('DEFAULT_ADMIN_PASSWORD must be at least 12 characters.');
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await Admin.create({
    name: adminName,
    email: adminEmail,
    password_hash: passwordHash,
    role: 'super_admin'
  });

  console.log(`Initial admin created: ${adminEmail}`);
}

export async function initDatabase() {
  await ensureDatabase();
  await sequelize.authenticate();

  // Upgrade any pre-existing latin1/utf8 tables BEFORE sync so Bangla can be stored.
  await ensureUtf8mb4Tables(
    Object.values(sequelize.models).map((model) => model.getTableName()).map(String)
  );

  // Development may auto-align the schema for convenience. In production,
  // sync() creates missing tables but never ALTERs existing tables implicitly.
  if (process.env.NODE_ENV === 'production') {
    await sequelize.sync();
  } else {
    await sequelize.sync({ alter: true });
  }

  await ensureInitialAdmin();
}
