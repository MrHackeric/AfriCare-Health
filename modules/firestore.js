import admin from "firebase-admin";

let isFirebaseInitialized = false;

// Initialize Firebase Admin SDK
export function initFirebase() {
  if (!isFirebaseInitialized) {
    // Get the Base64 encoded Firebase service account JSON from environment variable
    const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountBase64) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is missing.");
    }

    // Decode the Base64 string and parse it as JSON
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
    );

    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    isFirebaseInitialized = true;
    console.log("Firebase has been initialized successfully.");
  }
}

// Export Firestore instance
export const getFirestore = () => {
  if (!isFirebaseInitialized) {
    throw new Error(
      "Firebase has not been initialized. Call initFirebase() first."
    );
  }
  return admin.firestore();
};

export default initFirebase;


// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";

// let isFirebaseInitialized = false;

// // Initialize Firebase Admin SDK
// export function initFirebase(__dirname) {
//   if (!isFirebaseInitialized) {
//     const serviceAccountPath = path.join(
//       __dirname,
//       "./auth/africare-health-app-firebase-adminsdk-fxdsl-c304604fa8.json"
//     );
//     const serviceAccount = JSON.parse(
//       fs.readFileSync(serviceAccountPath, "utf8")
//     );

//     // Initialize Firebase Admin
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//     isFirebaseInitialized = true;
//     console.log("Firebase has been initialized successfully.");
//   }
// }

// // Export Firestore instance
// export const getFirestore = () => {
//   if (!isFirebaseInitialized) {
//     throw new Error(
//       "Firebase has not been initialized. Call initFirebase() first."
//     );
//   }
//   return admin.firestore();
// };

// export default initFirebase;
