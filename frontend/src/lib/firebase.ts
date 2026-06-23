import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3Adm7CCytOslLjXXFyTap8WJ2wlDWQS0",
  authDomain: "burger-40dda.firebaseapp.com",
  projectId: "burger-40dda",
  storageBucket: "burger-40dda.firebasestorage.app",
  messagingSenderId: "902698790697",
  appId: "1:902698790697:web:de029e13b272da01fcd138",
  measurementId: "G-57SGFE407V",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export type { ConfirmationResult };

export const sendFirebaseOtp = async (
  mobileNumber: string,
  containerId: string
): Promise<ConfirmationResult> => {
  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
  const confirmationResult = await signInWithPhoneNumber(auth, mobileNumber, verifier);
  return confirmationResult;
};

export const verifyFirebaseOtp = async (
  confirmationResult: ConfirmationResult,
  otp: string
): Promise<string> => {
  const result = await confirmationResult.confirm(otp);
  const idToken = await result.user.getIdToken();
  return idToken;
};

export { auth };
