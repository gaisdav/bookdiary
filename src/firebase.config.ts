import { initializeApp } from 'firebase/app';
import { FirebaseApp } from '@firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.BOOK_FIREBASE_API_KEY,
  authDomain: import.meta.env.BOOK_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.BOOK_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.BOOK_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.BOOK_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.BOOK_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.BOOK_FIREBASE_APP_ID,
  measurementId: import.meta.env.BOOK_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
const db = getDatabase(app);

export { app, db };
