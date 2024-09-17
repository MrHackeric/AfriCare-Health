import { fetchUserEmail } from './userService'; // Adjust path to your userService file
import { useEffect } from 'react';

// Handle typing events
export const handleTyping = async (e, socket, currentUser, setInput, setTypingUser) => {
  setInput(e.target.value);

  // Fetch user's email or username and ensure email is always used if available
  let typingUser = currentUser?.displayName;
  
  if (!typingUser && currentUser?.uid) {
    try {
      // Fetch the user's email
      const email = await fetchUserEmail(currentUser.uid);
      typingUser = email || 'Unknown User';
      setTypingUser(typingUser);
    } catch (error) {
      console.error('Error fetching email:', error);
      typingUser = 'Unknown User';
    }
  }

  // Emit the typing or stop typing events
  if (e.target.value.trim()) {
    socket.emit('typing', typingUser);  // Just emit to the server side
  } else {
    socket.emit('stopTyping', typingUser);
  }
};


// Hook to manage typing notifications
export const useTypingNotifications = (socket, currentUser, typingUser, setTypingUser) => {
  useEffect(() => {
    const handleUserTyping = (user) => {
      if (user !== currentUser?.displayName && user !== currentUser?.email) {
        setTypingUser(user);  // Show typing notification for other users
      }
    };

    const handleUserStopTyping = (user) => {
      if (user === typingUser) {
        setTypingUser('');  // Clear typing notification when user stops
      }
    };

    socket.on('userTyping', handleUserTyping);
    socket.on('userStopTyping', handleUserStopTyping);

    // Cleanup event listeners when component unmounts
    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStopTyping', handleUserStopTyping);
    };
  }, [socket, currentUser, typingUser, setTypingUser]);
};
