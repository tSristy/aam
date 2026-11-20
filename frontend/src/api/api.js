export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'
).replace(/\/+$/, '');

export function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('aamf_admin_token');
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('aamf_admin_token', token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem('aamf_admin_token');
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed.');
  return data;
}
