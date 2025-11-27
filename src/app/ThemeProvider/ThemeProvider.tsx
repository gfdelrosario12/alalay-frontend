"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Role } from "../context/auth"; // ✅ shared Role type
import { useAuth } from "../context/auth";

interface ThemeContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [role, setRole] = useState<Role>("RESIDENT"); // default

  useEffect(() => {
    if (user && user.role) {
      setRole(user.role as Role);
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", role.toLowerCase());
  }, [role]);

  return (
    <ThemeContext.Provider value={{ role, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useRoleTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useRoleTheme must be used within ThemeProvider");
  return context;
}
