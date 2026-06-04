import { demoCredentials, users } from '../data/users';
import { ROLES } from '../utils/constants';

const AUTH_KEY = 'amh_auth';

export const authService = {
  login: (email, password, role) => {
    const creds = demoCredentials[role];
    if (creds && creds.email === email && creds.password === password) {
      const user = users.find((u) => u.email === email && u.role === role) || {
        id: 'demo',
        name: ROLE_NAMES[role],
        email,
        role,
      };
      const session = { user, role, token: 'demo-jwt-token', loginAt: Date.now() };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true, user: session };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

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

const ROLE_NAMES = {
  [ROLES.PATIENT]: 'Demo Patient',
  [ROLES.RECEPTION]: 'Demo Receptionist',
  [ROLES.DOCTOR]: 'Demo Doctor',
  [ROLES.ADMIN]: 'Demo Administrator',
};
