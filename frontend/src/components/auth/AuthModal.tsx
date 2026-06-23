"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apiRequest, AuthUser } from "@/lib/api";

type AuthData = {
  accessToken: string;
  tokenType: "Bearer";
  isNewUser: boolean;
  user: AuthUser;
};

type AuthModalProps = {
  intent: string;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (token: string, user: AuthUser) => void;
};

export default function AuthModal({
  intent,
  isOpen,
  onClose,
  onLogin,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setMode("login");
    setEmail("");
    setPassword("");
    setName("");
    setMessage("");
    setError("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const body: Record<string, string> = { email, password };
      if (mode === "signup" && name) body.name = name;

      const response = await apiRequest<AuthData>(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });

      onLogin(response.data.accessToken, response.data.user);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-charcoal/70 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
        >
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="chunky-card w-full max-w-md rounded-[1.4rem] bg-cream p-5 text-charcoal md:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="display-text mb-2 text-xl text-red">Login Required</p>
                <h2 id="auth-title" className="display-text text-4xl md:text-5xl">
                  Sign in to {intent}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="display-text flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-xl text-cream"
                aria-label="Close login popup"
              >
                X
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-black transition-colors ${
                  mode === "login"
                    ? "bg-red text-white"
                    : "bg-charcoal/10 text-charcoal"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-black transition-colors ${
                  mode === "signup"
                    ? "bg-red text-white"
                    : "bg-charcoal/10 text-charcoal"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase text-charcoal/60">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border-2 border-charcoal bg-white px-4 py-3 text-base font-bold outline-none focus:border-red"
                  required
                />
              </label>

              {mode === "signup" && (
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase text-charcoal/60">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border-2 border-charcoal/20 bg-white px-4 py-3 text-base font-bold outline-none focus:border-red"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase text-charcoal/60">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border-2 border-charcoal bg-white px-4 py-3 text-base font-bold outline-none focus:border-red"
                  required
                  minLength={6}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="display-text w-full rounded-full bg-red px-5 py-4 text-lg text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login"
                    : "Create Account"}
              </button>
            </form>

            {(message || error) && (
              <p
                className={`mt-4 rounded-xl px-4 py-3 text-sm font-black ${
                  error ? "bg-red text-white" : "bg-yellow text-charcoal"
                }`}
              >
                {error || message}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
