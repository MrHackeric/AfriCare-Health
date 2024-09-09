import { db } from '../Auth/firebase-config'; // Adjust the path as needed
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { socket } from './socket';

// Fetch messages from Firestore
export const fetchMessages = async (setMessages) => {
  if (typeof setMessages !== 'function') {
    console.error('setMessages is not a valid function');
    return;
  }

  try {
    const messagesCollection = collection(db, 'messages');
    const q = query(messagesCollection, orderBy('timestamp', 'asc'));
    
    onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messageList);  // Update the state with the fetched messages
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

// Like a message
export const likeMessage = (index, likedMessages, setLikedMessages) => {
  if (typeof setLikedMessages !== 'function') {
    console.error('setLikedMessages is not a valid function');
    return;
  }

  const liked = likedMessages.has(index);
  socket.emit('likeMessage', { index, liked: !liked });
  
  setLikedMessages((prevLiked) => {
    const newLiked = new Set(prevLiked);
    liked ? newLiked.delete(index) : newLiked.add(index);
    return newLiked;
  });
};
