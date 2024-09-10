import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Auth/firebase-config'; // Path to firebase authentication API's

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
