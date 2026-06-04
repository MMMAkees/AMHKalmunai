import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());

  const login = useCallback(async (email, password, role) => {
    const result = await authService.login(email, password, role);
    if (result.success) setSession(result.user);
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ session, login, logout, isAuthenticated: !!session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
