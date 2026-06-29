// Firebase Admin SDK — server-side only (API routes, not client components)
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (getApps().length > 0) return;

  // If a service account JSON is provided as an env var, use it (recommended for prod)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } else {
    // Fallback: use Application Default Credentials (works on GCP/Firebase hosting)
    // OR use project ID only (Firestore emulator / open rules in dev)
    initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "autoplanet-99ad7",
    });
  }
}

initAdmin();

export const adminDb = getFirestore();
