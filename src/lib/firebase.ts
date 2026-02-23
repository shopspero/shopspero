import type { Firestore } from 'firebase-admin/firestore';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const throwNotConfigured = () => {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set or invalid');
};

let _db: Firestore;

try {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error('missing');
  if (!getApps().length) {
    initializeApp({ credential: cert(JSON.parse(key)) });
  }
  _db = getFirestore();
} catch {
  _db = new Proxy({} as Firestore, {
    get: throwNotConfigured,
  });
}

export const db = _db;
