import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Auth/firebase-config'; // Path to firebase authentication API's

//Logic to fetch user email to tag users for replying messages. Adjust to username
export const fetchUserEmail = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().email;
    } else {
      console.error('User document does not exist!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user email: ', error);
    return null;
  }
};
