import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Auth/firebase-config'; // Path to firebase authentication API's
import { getAuth } from 'firebase/auth';  // Adjust based on your Firebase setup


//Logic to fetch userName to tag users for replying messages
export const fetchUserName = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().userName;
    } else {
      console.error('userName does not exist!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching userName: ', error);
    return null;
  }
};

export const fetchUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user.uid;  // Returns the user ID (uid) from Firebase
  } else {
    // If the user is not logged in, you can return a default value or handle the error
    throw new Error('User not authenticated');
  }
};
