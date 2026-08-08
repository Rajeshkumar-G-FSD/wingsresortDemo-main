import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Wings Resort — Firebase project config (client-side keys are safe to expose;
// actual protection comes from Firestore Security Rules, see FIREBASE_SETUP.md).
const firebaseConfig = {
  apiKey: 'AIzaSyDl9NQNdtBDbfGcM9FGVquJx7gUYANst-A',
  authDomain: 'wingsresort-fd0cd.firebaseapp.com',
  projectId: 'wingsresort-fd0cd',
  storageBucket: 'wingsresort-fd0cd.firebasestorage.app',
  messagingSenderId: '193553773747',
  appId: '1:193553773747:web:c3ae7cfdab7ed43cd9acc6',
  measurementId: 'G-N18ZF0KJVK',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
