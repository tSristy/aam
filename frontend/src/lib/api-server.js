import { mediaUrl } from './media';

const API_BASE_URL = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');

function normalizePublicPost(item) {
  if (!item || typeof item !== 'object') return item;
  // Use a same-origin /uploads/... URL instead of the host name the backend
  // happened to see on the request (see src/lib/media.js).
  return { ...item, image_url: mediaUrl(item) };
}

async function serverFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Backend request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function getPublicContent(type) {
  const result = await serverFetch(`/content?type=${encodeURIComponent(type)}`);
  return Array.isArray(result.data) ? result.data.map(normalizePublicPost) : [];
}

export async function getPublicPost(idOrSlug) {
  const result = await serverFetch(`/content/${encodeURIComponent(idOrSlug)}`);
  return normalizePublicPost(result.data || result);
}

export { API_BASE_URL };
