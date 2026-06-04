import { amhApi } from './amhApi.js';
import { AUTH_KEY } from './api.js';

export const demoCredentials = {
  patient: { email: 'rizwan@email.com', password: 'patient123' },
  reception: { email: 's.rahma@amh.gov.lk', password: 'reception123' },
  doctor: { email: 'a.nazeer@amh.gov.lk', password: 'doctor123' },
  admin: { email: 'admin@amh.gov.lk', password: 'admin123' },
};

export const authService = {
  login: async (email, password, role) => {
    try {
      const data = await amhApi.login(email, password, role);
      const session = {
        user: data.user,
        profile: data.profile,
        token: data.token,
        role: data.role,
        loginAt: Date.now(),
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true, user: session };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  logout: () => localStorage.removeItem(AUTH_KEY),

  getSession: () => {
    try {
      const data = localStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => !!authService.getSession(),
};
