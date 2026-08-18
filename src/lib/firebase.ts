import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

// Wings Resort — Firebase project config (client-side keys are safe to expose;
// actual protection comes from Firestore Security Rules, see FIREBASE_SETUP.md).
const firebaseConfig = {
  apiKey: 'AIzaSyDu3RDqpcboiKTODkjj6W9qbwCcoLqqBLc',
  authDomain: 'wingsresort-1063b.firebaseapp.com',
  projectId: 'wingsresort-1063b',
  storageBucket: 'wingsresort-1063b.firebasestorage.app',
  messagingSenderId: '953462122700',
  appId: '1:953462122700:web:d7066c6a83aac039a27a69',
  measurementId: 'G-KWSYFTEK7R',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

// Analytics only runs in supported browser environments (not SSR/test), so
// initialize it asynchronously and expose it once ready.
export let analytics: Analytics | undefined;
isSupported().then((supported) => {
  if (supported) analytics = getAnalytics(firebaseApp);
});
