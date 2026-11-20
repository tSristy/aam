import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';

function adminPayload(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role
  };
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const admin = await Admin.findOne({ where: { email: email.trim().toLowerCase() } });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid login credentials.' });
  }

  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) {
    return res.status(401).json({ message: 'Invalid login credentials.' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is missing in backend .env.' });
  }

  const payload = adminPayload(admin);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, admin: payload });
}

export async function me(req, res) {
  res.json({ admin: req.admin });
}
