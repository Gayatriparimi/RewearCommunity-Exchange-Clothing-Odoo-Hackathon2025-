// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, CollectionReference, DocumentData } from 'firebase/firestore';
import type { UserProfile, Swap, Tracking, AppNotification, Rating } from './types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Type-safe collection helpers
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

const usersCollection = createCollection<UserProfile>('users');
const swapsCollection = createCollection<Swap>('swaps');
const notificationsCollection = createCollection<AppNotification>('notifications');
const ratingsCollection = createCollection<Rating>('ratings');


// Helper to get a typed subcollection
const createSubCollection = <T = DocumentData>(...path: [string, ...string[]]) => {
    return collection(db, path.join('/')) as CollectionReference<T>;
}

export { 
    app, 
    auth, 
    db,
    usersCollection,
    swapsCollection,
    notificationsCollection,
    ratingsCollection,
    createSubCollection,
};
