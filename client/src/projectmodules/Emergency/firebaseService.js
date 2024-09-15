import { getAuth } from 'firebase/auth';
import { doc, collection, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../Auth/firebase-config'; // Import Firestore configuration

export const addContactToFirestore = async (newContact) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { name, phone, email } = newContact;

  if (name && phone && email) {
    try {
      // Reference to the user's emergency contacts subcollection
      const contactRef = doc(collection(db, `users/${user.uid}/emergencyContacts`));
      await setDoc(contactRef, newContact);
    } catch (error) {
      console.error('Error adding contact:', error);
      throw new Error('Failed to add contact');
    }
  } else {
    throw new Error('Name, Email, and Phone Number are required');
  }
};

//
export const fetchEmergencyContacts = (callback) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Reference to the user's emergencyContacts subcollection
    const contactsRef = collection(db, `users/${user.uid}/emergencyContacts`);

    // Listen for real-time updates in the emergencyContacts subcollection
    const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(contactList);
    });

    // Return the unsubscribe function to cleanup subscription on component unmount
    return unsubscribe;
  } else {
    callback([]); // No user, return empty array
    return () => {}; // No cleanup needed
  }
};



export const updateContact = async (contactId, updatedData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const contactRef = doc(db, `users/${user.uid}/emergencyContacts`, contactId);
    await setDoc(contactRef, updatedData, { merge: true });
  } else {
    throw new Error('No user is logged in');
  }
};

export const deleteContact = async (contactId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const contactRef = doc(db, `users/${user.uid}/emergencyContacts`, contactId);
    await deleteDoc(contactRef);
  } else {
    throw new Error('No user is logged in');
  }
};
