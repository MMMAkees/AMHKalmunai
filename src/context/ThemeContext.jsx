import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'light', isDark: false });

// Light mode only - no toggle needed
export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ theme: 'light', isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
