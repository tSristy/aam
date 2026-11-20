import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { ContentPost } from '../models/index.js';
import { slugify } from '../utils/slugify.js';

function removeFile(filename) {
  if (!filename) return;
  const filePath = path.join(process.cwd(), 'uploads', filename);
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (error) {
    console.error(`Failed to remove upload ${filename}:`, error);
  }
}

function publicBaseUrl(req) {
  const configured = process.env.PUBLIC_BASE_URL?.trim().replace(/\/+$/, '');
  if (configured) return configured;
  return `${req.protocol}://${req.get('host')}`;
}

function imageUrl(req, filename) {
  if (!filename) return null;
  return `${publicBaseUrl(req)}/uploads/${encodeURIComponent(filename)}`;
}

function mapPost(req, post) {
  const data = post.toJSON ? post.toJSON() : post;
  return {
    ...data,
    image_url: imageUrl(req, data.cover_image)
  };
}

async function uniqueSlug(title, idToIgnore = null) {
  const base = slugify(title) || `post-${Date.now()}`;
  let candidate = base;
  let counter = 1;

  while (true) {
    const where = idToIgnore
      ? { slug: candidate, id: { [Op.ne]: idToIgnore } }
      : { slug: candidate };

    const exists = await ContentPost.findOne({ where, attributes: ['id'] });
    if (!exists) return candidate;

    candidate = `${base}-${counter++}`;
  }
}

function normalizeOptional(value) {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed || null;
}

function normalizeDisplaySection(type, value) {
  const allowed = ['default', 'top_headline', 'side_headline', 'feed_story'];
  const section = allowed.includes(value) ? value : 'default';

  if (type === 'moment') return 'default';
  return section;
}

function normalizeBoolean(value) {
  return value === true || value === 'true' || value === '1' || value === 1 || value === 'on';
}

function getBodyFields(body) {
  const type = body.type;

  return {
    type,
    display_section: normalizeDisplaySection(type, body.display_section),
    is_featured: type === 'moment' ? normalizeBoolean(body.is_featured) : false,
    category: normalizeOptional(body.category),
    location: normalizeOptional(body.location),
    year: normalizeOptional(body.year),
    source: normalizeOptional(body.source),
    tag: normalizeOptional(body.tag),
    title: normalizeOptional(body.title),
    excerpt: normalizeOptional(body.excerpt),
    content: normalizeOptional(body.content),
    status: ['draft', 'published'].includes(body.status) ? body.status : 'published'
  };
}

export async function listPublicContent(req, res) {
  const { type, category, year, tag, section } = req.query;
  const where = { status: 'published' };

  if (type && ['moment', 'news'].includes(type)) where.type = type;
  if (category) where.category = String(category).trim();
  if (year) where.year = String(year).trim();
  if (tag) where.tag = String(tag).trim();
  if (section && ['default', 'top_headline', 'side_headline', 'feed_story'].includes(section)) {
    where.display_section = section;
  }

  const rows = await ContentPost.findAll({
    where,
    order: type === 'moment' ? [['is_featured', 'DESC'], ['created_at', 'DESC']] : [['created_at', 'DESC']]
  });

  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ data: rows.map((row) => mapPost(req, row)) });
}

export async function getPublicContent(req, res) {
  const { idOrSlug } = req.params;
  const numericId = /^\d+$/.test(idOrSlug) ? Number(idOrSlug) : null;

  const orConditions = [{ slug: idOrSlug }];
  if (numericId) orConditions.unshift({ id: numericId });

  const row = await ContentPost.findOne({
    where: {
      status: 'published',
      [Op.or]: orConditions
    }
  });

  if (!row) return res.status(404).json({ message: 'Post not found.' });

  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json({ data: mapPost(req, row) });
}

export async function listAdminContent(req, res) {
  const { type, status, section } = req.query;
  const where = {};

  if (type && ['moment', 'news'].includes(type)) where.type = type;
  if (status && ['draft', 'published'].includes(status)) where.status = status;
  if (section && ['default', 'top_headline', 'side_headline', 'feed_story'].includes(section)) {
    where.display_section = section;
  }

  const rows = await ContentPost.findAll({
    where,
    order: type === 'moment' ? [['is_featured', 'DESC'], ['created_at', 'DESC']] : [['created_at', 'DESC']]
  });

  res.set('Cache-Control', 'no-store');
  res.json({ data: rows.map((row) => mapPost(req, row)) });
}

export async function createContent(req, res) {
  const fields = getBodyFields(req.body);

  if (!['moment', 'news'].includes(fields.type)) {
    removeFile(req.file?.filename);
    return res.status(400).json({ message: 'Type must be moment or news.' });
  }

  if (!fields.title) {
    removeFile(req.file?.filename);
    return res.status(400).json({ message: 'Title is required.' });
  }

  try {
    const slug = await uniqueSlug(fields.title);

    if (fields.type === 'moment' && fields.is_featured) {
      await ContentPost.update({ is_featured: false }, { where: { type: 'moment' } });
    }

    const created = await ContentPost.create({
      ...fields,
      slug,
      cover_image: req.file?.filename || null,
      created_by: req.admin.id
    });

    return res.status(201).json({ data: mapPost(req, created) });
  } catch (error) {
    removeFile(req.file?.filename);
    throw error;
  }
}

export async function updateContent(req, res) {
  const { id } = req.params;
  const existing = await ContentPost.findByPk(id);

  if (!existing) {
    removeFile(req.file?.filename);
    return res.status(404).json({ message: 'Post not found.' });
  }

  const fields = getBodyFields({ ...existing.toJSON(), ...req.body });

  if (!['moment', 'news'].includes(fields.type)) {
    removeFile(req.file?.filename);
    return res.status(400).json({ message: 'Type must be moment or news.' });
  }

  if (!fields.title) {
    removeFile(req.file?.filename);
    return res.status(400).json({ message: 'Title is required.' });
  }

  // SEO: a published URL must stay stable when an editor changes the title.
  // Existing slugs are therefore immutable through the current update endpoint.
  const slug = existing.slug;
  const newImage = req.file?.filename || null;
  const coverImage = newImage || existing.cover_image;
  const oldImage = existing.cover_image;

  try {
    if (fields.type === 'moment' && fields.is_featured) {
      await ContentPost.update(
        { is_featured: false },
        { where: { type: 'moment', id: { [Op.ne]: Number(id) } } }
      );
    }

    await existing.update({
      ...fields,
      slug,
      cover_image: coverImage
    });

    // Delete the old image only after the database update succeeds.
    if (newImage && oldImage && oldImage !== newImage) removeFile(oldImage);

    return res.json({ data: mapPost(req, existing) });
  } catch (error) {
    // If the DB update fails, remove only the newly uploaded file.
    if (newImage) removeFile(newImage);
    throw error;
  }
}

export async function deleteContent(req, res) {
  const { id } = req.params;
  const existing = await ContentPost.findByPk(id);

  if (!existing) return res.status(404).json({ message: 'Post not found.' });

  const oldImage = existing.cover_image;
  await existing.destroy();
  removeFile(oldImage);

  res.json({ message: 'Post deleted successfully.' });
}
