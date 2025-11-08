'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Role = 'rescuer' | 'resident';

interface ThemeContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('resident'); // default

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', role);
  }, [role]);

  return (
    <ThemeContext.Provider value={{ role, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useRoleTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useRoleTheme must be used within RoleThemeProvider');
  return context;
}
