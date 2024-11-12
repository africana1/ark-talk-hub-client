// src/context/AuthContext.tsx
import React, {createContext, useEffect, useState} from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
  role: string;
}

interface AuthContextType {
  role?: string;
  user: DecodedToken | null;
  setToken: (token: string | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        const isValid = decoded.exp ? decoded.exp > currentTime : true;
        setUser(isValid ? decoded : null);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return <AuthContext.Provider value={{user, setToken}}>{children}</AuthContext.Provider>;
};
