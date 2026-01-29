import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDhRu_7L42mPBna9NIU6QUJxz42QTpm9Q",
  authDomain: "huzaifa-karigar.firebaseapp.com",
  projectId: "huzaifa-karigar",
  storageBucket: "huzaifa-karigar.firebasestorage.app",
  messagingSenderId: "798815308866",
  appId: "1:798815308866:web:50fe4cb95c444613e071db",
  measurementId: "G-GZ507XTC4Q"
};

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let isInitialized = false;

export const initializeFirebase = async () => {
  if (isInitialized) {
    return { app, auth, db, storage };
  }

  try {
    // Initialize Firebase app
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    // Initialize Firebase Auth with proper React Native persistence
    try {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
    } catch (error: any) {
      // Fallback to getAuth if initializeAuth fails
      console.log('Using fallback auth initialization:', error.message);
      auth = getAuth(app);
    }

    // Initialize other Firebase services
    db = getFirestore(app);
    storage = getStorage(app);

    isInitialized = true;
    console.log('✅ Firebase initialized successfully');
    return { app, auth, db, storage };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
};

export const getFirebaseServices = async () => {
  if (!isInitialized) {
    return await initializeFirebase();
  }
  return { app, auth, db, storage };
};

export { app, auth, db, storage };

