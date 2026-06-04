const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const AUTH_KEY = 'amh_auth';

function getToken() {
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
    return session?.token || null;
  } catch {
    return null;
  }
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }

  return json.data !== undefined ? json.data : json;
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export { API_BASE, AUTH_KEY };
