"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apiRequest, AuthUser } from "@/lib/api";
import { sendFirebaseOtp, verifyFirebaseOtp, ConfirmationResult } from "@/lib/firebase";

type FirebaseAuthData = {
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
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("+91");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);
  const recaptchaId = "recaptcha-container";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setStep("mobile");
    setMobileNumber("+91");
    setName("");
    setOtp("");
    setMessage("");
    setError("");
    confirmationResultRef.current = null;
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

  const sendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const confirmationResult = await sendFirebaseOtp(mobileNumber, recaptchaId);
      confirmationResultRef.current = confirmationResult;

      setStep("otp");
      setMessage("OTP sent to your phone.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send OTP right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const confirmationResult = confirmationResultRef.current;
      if (!confirmationResult) {
        throw new Error("No OTP request found. Please request an OTP again.");
      }

      const idToken = await verifyFirebaseOtp(confirmationResult, otp);
      const response = await apiRequest<FirebaseAuthData>("/auth/firebase", {
        method: "POST",
        body: JSON.stringify({ idToken, name }),
      });

      onLogin(response.data.accessToken, response.data.user);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to verify OTP right now."
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

            <div id={recaptchaId} />

            {step === "mobile" ? (
              <form onSubmit={sendOtp} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase text-charcoal/60">
                    Mobile number
                  </span>
                  <input
                    value={mobileNumber}
                    onChange={(event) => setMobileNumber(event.target.value)}
                    className="w-full rounded-xl border-2 border-charcoal bg-white px-4 py-3 text-base font-bold outline-none focus:border-red"
                    required
                  />
                </label>
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
                <button
                  type="submit"
                  disabled={loading}
                  className="display-text w-full rounded-full bg-red px-5 py-4 text-lg text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={verifyOtp} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase text-charcoal/60">
                    OTP
                  </span>
                  <input
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    inputMode="numeric"
                    className="w-full rounded-xl border-2 border-charcoal bg-white px-4 py-3 text-base font-bold tracking-[0.35em] outline-none focus:border-red"
                    required
                  />
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("mobile")}
                    className="display-text rounded-full border-2 border-charcoal px-5 py-3 text-base"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="display-text flex-1 rounded-full bg-red px-5 py-3 text-base text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60"
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                </div>
              </form>
            )}

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
