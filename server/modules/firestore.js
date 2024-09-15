import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let isFirebaseInitialized = false;

// Initialize Firebase Admin SDK
export function initFirebase(__dirname) {
  if (!isFirebaseInitialized) {
    const serviceAccountPath = path.join(__dirname, '../server/auth/africare-health-app-firebase-adminsdk-fxdsl-c304604fa8.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    isFirebaseInitialized = true;
    console.log('Firebase has been initialized successfully.');
  }
}

// Export Firestore instance
export const getFirestore = () => {
  if (!isFirebaseInitialized) {
    throw new Error('Firebase has not been initialized. Call initFirebase() first.');
  }
  return admin.firestore();
};
