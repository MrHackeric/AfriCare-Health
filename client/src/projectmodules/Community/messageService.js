import { auth, db } from '../Auth/firebase-config'; // Adjust the path as needed
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment, getDoc, setDoc, deleteDoc } from 'firebase/firestore';


// Fetch messages from Firestore along with their likes count
export const fetchMessages = async (setMessages) => {
  if (typeof setMessages !== 'function') {
    console.error('setMessages is not a valid function');
    return;
  }

  try {
    const messagesCollection = collection(db, 'messages');
    const q = query(messagesCollection, orderBy('timestamp', 'asc'));
    
    onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => {
        const messageData = doc.data();
        return {
          id: doc.id,
          text: messageData.text,          // Assuming message text is stored in a 'text' field
          timestamp: messageData.timestamp, // Assuming timestamp is stored
          likes: messageData.likes || 0,    // Fetch likes count, default to 0 if it doesn't exist
          sender: messageData.sender        // Assuming message sender is stored
        };
      });

      setMessages(messageList);  // Update the state with the fetched messages and likes
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Send message using socket connection
export const sendMessage = (message, socket, setMessages, setInput, setReplyTo) => {
  if (typeof setMessages !== 'function') {
    console.error('setMessages is not a valid function');
    return;
  }

  socket.emit('chatMessage', message);
  socket.emit('stopTyping');

  // Update messages with the new one
  setMessages((prevMessages) => [...prevMessages, message]);
  setInput('');  // Clear the input field
  setReplyTo(null);  // Reset the reply state if applicable
};


// Function to handle liking or unliking a message
export const handleLike = async (messageId, setLikes) => {
  try {
    const userId = auth.currentUser.uid; // Get the current user ID (assuming Firebase Auth)
    const messageRef = doc(db, 'messages', messageId);
    const userLikeRef = doc(db, 'messages', messageId, 'userLikes', userId); // Reference to the user's like status
    const messageDoc = await getDoc(messageRef);
    const userLikeDoc = await getDoc(userLikeRef);

    if (messageDoc.exists()) {
      const currentLikes = messageDoc.data().likes || 0;

      // If user has already liked the message, unlike it
      if (userLikeDoc.exists()) {
        // Decrement the likes count
        await updateDoc(messageRef, {
          likes: increment(-1),
        });

        // Remove user's like document
        await deleteDoc(userLikeRef);

        // Update the local likes state
        setLikes((prevLikes) => ({
          ...prevLikes,
          [messageId]: currentLikes - 1,
        }));
      } else {
        // Otherwise, like the message
        await updateDoc(messageRef, {
          likes: increment(1),
        });

        // Create a record that the user has liked this message
        await setDoc(userLikeRef, {
          likedAt: new Date().toISOString(),
        });

        // Update the local likes state
        setLikes((prevLikes) => ({
          ...prevLikes,
          [messageId]: currentLikes + 1,
        }));
      }
    }
  } catch (error) {
    console.error('Error liking/unliking the message:', error);
  }
};

// Fetch likes status for the current user
export const fetchUserLikes = async (messageId, setLikes) => {
  try {
    const userId = auth.currentUser.uid; // Get current user ID
    const userLikeRef = doc(db, 'messages', messageId, 'userLikes', userId); // Reference to user's like status

    const userLikeDoc = await getDoc(userLikeRef);
    return userLikeDoc.exists(); // Return true if user has liked the message
  } catch (error) {
    console.error('Error fetching user like status:', error);
    return false;
  }
};


// // Function to handle liking a message
// export const handleLike = async (messageId, setLikes) => {
//   try {
//     // Reference to the message document
//     const messageRef = doc(db, 'messages', messageId);
    
//     // Get the current document to update the likes count
//     const messageDoc = await getDoc(messageRef);

//     if (messageDoc.exists()) {
//       const currentLikes = messageDoc.data().likes || 0;

//       // Update the likes count (increment by 1)
//       await updateDoc(messageRef, {
//         likes: increment(1),
//       });

//       // Update likes state in the frontend
//       setLikes((prevLikes) => ({
//         ...prevLikes,
//         [messageId]: currentLikes + 1,
//       }));
//     }
//   } catch (error) {
//     console.error("Error liking the message:", error);
//   }
// };


// // Function to handle unliking a message (optional)
// export const handleUnlike = async (messageId, setLikes) => {
//   try {
//     const messageRef = doc(db, 'messages', messageId);
//     const messageDoc = await getDoc(messageRef);

//     if (messageDoc.exists()) {
//       const currentLikes = messageDoc.data().likes || 0;

//       // Ensure likes don't go below 0
//       if (currentLikes > 0) {
//         await updateDoc(messageRef, {
//           likes: increment(-1),
//         });

//         // Update likes state in the frontend
//         setLikes((prevLikes) => ({
//           ...prevLikes,
//           [messageId]: currentLikes - 1,
//         }));
//       }
//     }
//   } catch (error) {
//     console.error("Error unliking the message:", error);
//   }
// };
