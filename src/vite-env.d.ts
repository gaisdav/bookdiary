/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  BOOK_FIREBASE_API_KEY: string;
  BOOK_FIREBASE_AUTH_DOMAIN: string;
  BOOK_FIREBASE_DATABASE_URL: string;
  BOOK_FIREBASE_PROJECT_ID: string;
  BOOK_FIREBASE_STORAGE_BUCKET: string;
  BOOK_FIREBASE_MESSAGING_SENDER_ID: string;
  BOOK_FIREBASE_APP_ID: string;
  BOOK_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
