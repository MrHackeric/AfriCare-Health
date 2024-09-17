import { db } from '../projectmodules/Auth/firebase-config'; // Import the Firestore instance
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { fetchUserId } from '../services/userService'; // Update path as necessary

//COMMUNITY
export const requestAiResponse = async (text, setMessages) => {
  if (typeof setMessages !== 'function') {
    throw new TypeError('setMessages must be a function');
  }

  const placeholderId = `placeholder-${Date.now()}`;

  // Show fetching for AI prompts
  setMessages((prevMessages) => [
    ...prevMessages,
    {
      id: placeholderId,
      sender: 'AI',
      text: 'Fetching...',
      timestamp: new Date(),
      likes: 0,
    },
  ]);

  try {
    const userId = fetchUserId(); // Fetch user ID

    const response = await fetch('http://localhost:3030/askAi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }), // Include userId in the request body
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Response error details:', errorDetails);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const aiResponseText = data.response;

    // Replace placeholder message with AI response
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === placeholderId ? { ...msg, text: aiResponseText } : msg
      )
    );
  } catch (error) {
    console.error('Error fetching AI response:', error);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === placeholderId
          ? { ...msg, text: 'Oops! Something went wrong. Please try again later. 🌟💬✨' }
          : msg
      )
    );
  }
};




//CHATBOT
// Function to send user message and get a chatbot response, then save both to Firestore
export const requestChatbotResponse = async (text, setMessages, setLoading, setError, userId) => {
  if (!text.trim() || !userId) return;

  const userMessage = { sender: 'user', text: text.trim(), timestamp: new Date() };
  
  // Add user message to the chat UI
  setMessages((prevMessages) => [...prevMessages, userMessage]);

  // Save user message to Firestore
  await saveUserMessage(userId, userMessage.text, userMessage.sender);

  setLoading(true);
  setError(null);

  try {
    // Send the user message to the backend chatbot API
    const response = await fetch('http://localhost:3030/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userMessage.text }),
    });

    // Handle the response from the chatbot
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const botMessage = { sender: 'bot', text: data.response, timestamp: new Date() };

    // Add bot message to the chat UI
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Save bot message to Firestore
    await saveUserMessage(userId, botMessage.text, botMessage.sender);
  } catch (error) {
    console.error('Error fetching bot response:', error);
    setError('Oops! Something went wrong. Please try again later. 🌟💬✨');
  } finally {
    setLoading(false);
  }
};

// Function to fetch user messages from Firestore
export const fetchUserMessages = async (userId, setMessages) => {
  try {
    // Reference to the Firestore collection for user messages
    const messagesRef = collection(db, 'users', userId, 'messages');

    // Query to fetch messages ordered by timestamp
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    // Fetch documents
    const querySnapshot = await getDocs(q);

    // Map query results to an array of message objects
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Update state with fetched messages
    setMessages(messages);
  } catch (error) {
    console.error('Error fetching messages from Firestore:', error);
    throw error; // Optionally throw error to be handled elsewhere
  }
};




