import { getFirebaseApp } from "./firebase";

export async function initAnalytics() {
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    const supported = await isSupported();
    if (supported) {
      getAnalytics(getFirebaseApp());
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Skipping Firebase analytics init", error);
    }
  }
}
