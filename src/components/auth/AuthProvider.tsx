"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AuthModal from "@/components/auth/AuthModal";
import { apiRequest, AuthUser } from "@/lib/api";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  openAuthModal: (intent?: string) => void;
  requireAuth: (intent?: string) => boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "crav_access_token";
const USER_KEY = "crav_user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState("continue");

  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_KEY);
    const storedUser = window.localStorage.getItem(USER_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AuthUser);
      } catch {
        window.localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const login = useCallback((nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken);
    setUser(nextUser);
    window.localStorage.setItem(TOKEN_KEY, nextToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setModalOpen(false);
  }, []);

  const openAuthModal = useCallback((intent = "continue") => {
    setAuthIntent(intent);
    setModalOpen(true);
  }, []);

  const requireAuth = useCallback(
    (intent = "continue") => {
      if (token && user) {
        return true;
      }

      openAuthModal(intent);
      return false;
    },
    [openAuthModal, token, user]
  );

  const logout = useCallback(async () => {
    if (token) {
      await apiRequest("/auth/logout", {
        method: "POST",
        token,
      }).catch(() => null);
    }

    setToken(null);
    setUser(null);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      openAuthModal,
      requireAuth,
      login,
      logout,
    }),
    [login, logout, openAuthModal, requireAuth, token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        intent={authIntent}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={login}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
}
