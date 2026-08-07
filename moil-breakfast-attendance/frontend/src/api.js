const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Admin session token lives in sessionStorage only, never localStorage: this is
// what gives us the "stays unlocked until you lock it or close the tab" behavior
// the design spec calls for, without any client-side PIN comparison.
const TOKEN_KEY = 'moil_admin_token';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  if (res.status === 401) {
    setToken(null);
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  getConfig: () => request('/config'),

  pinLogin: (pin) => request('/auth/pin', { method: 'POST', body: { pin } }),
  lock: () => request('/auth/lock', { method: 'POST', auth: true }),
  me: () => request('/auth/me', { auth: true }),

  getStudents: () => request('/students'),
  addStudent: (student) => request('/students', { method: 'POST', body: student, auth: true }),
  bulkAddStudents: (entries) => request('/students/bulk', { method: 'POST', body: { entries }, auth: true }),
  editStudent: (id, patch) => request(`/students/${id}`, { method: 'PUT', body: patch, auth: true }),
  deleteStudent: (id) => request(`/students/${id}`, { method: 'DELETE', auth: true }),
  toggleActive: (id) => request(`/students/${id}/toggle-active`, { method: 'PATCH', auth: true }),
  moveStudent: (id, direction) => request(`/students/${id}/move`, { method: 'POST', body: { direction }, auth: true }),

  getAttendance: (term, week, day) => request(`/attendance?term=${term}&week=${week}&day=${day}`),
  toggleAttendance: (term, week, day, studentId) =>
    request('/attendance/toggle', { method: 'POST', body: { term, week, day, studentId } }),
  markAll: (term, week, day) => request('/attendance/mark-all', { method: 'POST', body: { term, week, day } }),
  searchMark: (term, week, day, query) =>
    request('/attendance/search-mark', { method: 'POST', body: { term, week, day, query } }),

  getReports: (term) => request(`/reports?term=${term}`, { auth: true }),
  getExportFull: () => request('/export/full', { auth: true }),

  savePin: (pin) => request('/settings/pin', { method: 'PUT', body: { pin }, auth: true })
};

export { ApiError };
