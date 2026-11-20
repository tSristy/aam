// Public image URLs.
//
// Images are requested from the SAME origin as the website (/uploads/<file>);
// next.config.mjs proxies that path to the backend. This avoids the classic
// problems of images that "work on localhost" but not online: the backend
// reporting an internal host name, http images on an https site (mixed
// content), a reverse proxy that only forwards /api, or a missing/incorrect
// public API URL at build time.
//
// To serve images from a CDN or another domain instead, set
// NEXT_PUBLIC_MEDIA_BASE_URL (for example https://cdn.example.com).
const MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '').replace(/\/+$/, '');

export function mediaUrl(item) {
  if (!item) return '';
  if (item.cover_image) return `${MEDIA_BASE_URL}/uploads/${encodeURIComponent(item.cover_image)}`;
  return item.image_url || '';
}

// Next.js gives dynamic route params percent-encoded (Bangla slugs arrive as
// %E0%A6%...). Decode once so we do not encode them a second time when
// calling the API or comparing with the stored slug.
export function safeDecode(value = '') {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
