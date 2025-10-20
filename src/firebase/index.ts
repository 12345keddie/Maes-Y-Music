'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // When not in a browser, or when automatic initialization is not supported (e.g. Vercel),
  // we must initialize with the config object.
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
      const firebaseApp = initializeApp(firebaseConfig);
      return getSdks(firebaseApp);
  }

  // In the browser, first try automatic initialization for Firebase Hosting.
  try {
    const firebaseApp = initializeApp();
    return getSdks(firebaseApp);
  } catch (e) {
    console.warn('Automatic Firebase initialization failed. Falling back to firebase config object.', e);
    // If that fails, fall back to the config object.
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
