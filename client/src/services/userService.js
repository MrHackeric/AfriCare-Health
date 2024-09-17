import { doc, getDoc } from 'firebase/firestore';
import { db } from '../projectmodules/Auth/firebase-config'; // Ensure this path is correct
import { getAuth } from 'firebase/auth';

// Function to fetch user email by user ID
export const fetchUserEmail = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.email;  // Make sure 'email' is a field in your user document
    } else {
      // console.error('Email does not exist!');
      return null;
    }
  } catch (error) {
    // console.error('Error fetching Email: ', error);
    return null;
  }
};

// Function to fetch current user's ID
export const fetchUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user.uid;
  } else {
    throw new Error('User not authenticated');
  }
};
