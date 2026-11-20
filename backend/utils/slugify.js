export function slugify(value = '') {
  return String(value)
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    // Keep letters, combining marks and numbers from every language, including Bangla.
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
