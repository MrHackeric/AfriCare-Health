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

    const response = await fetch('https://africare.loca.lt/askAi', {
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