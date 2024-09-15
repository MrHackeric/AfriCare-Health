import express from 'express';
import { model, safetySettings, generationConfig } from './generativeAIConfig.js'; // AI setup import
import { db } from '../auth/firebase-config.js';

const app = express();

// Helper function to run a general chat with error handling
const runChat = async (userInput) => {
  try {
    // Start a new chat with AI model
    const chat = model.startChat({
      generationConfig,
      safetySettings,
    });

    // Send message to the AI model
    const result = await chat.sendMessage({
      message: userInput,  // Ensure this is a valid input
    });

    // Validate that result and response are present
    if (!result || !result.response) {
      throw new Error("AI model did not return a valid response");
    }

    // Return the text part of the response
    return result.response.text();
  } catch (error) {
    console.error("Error during AI chat:", error);
    throw new Error("Failed to communicate with AI model.");
  }
};

// Chat endpoint using the AI model
router.post("/chat",  async (req, res) => {
  try {
    const { text, userId } = req.body;

    // Check if required fields are present
    if (!text || !userId) {
      return res.status(400).json({ error: "Invalid request: text and userId are required" });
    }

    // Execute general AI chat
    const response = await runChat(text);
    
    // Send response back to the client
    res.json({ response });
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error: Failed to process chat" });
  }
});

// Ask AI endpoint for general chat functionality
router.post("/askAi", async (req, res) => {
  try {
    const { text, userId } = req.body;

    // Validate that both text and userId are present
    if (!text || !userId) {
      return res.status(400).json({ error: "Text and userId fields are required" });
    }

    // Execute general AI chat
    const response = await runChat(text);
    
    // Respond with the AI output
    res.json({ response });
  } catch (error) {
    console.error("Error in /askAi endpoint:", error);
    res.status(500).json({ error: "Internal Server Error: Failed to process AI request" });
  }
});

// Fetch messages for a specific user from Firestore
router.get('/messages/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    console.log('Fetching messages for userId:', userId); // Add log here
    const userRef = db.collection('users').doc(userId);
    const messagesRef = userRef.collection('messages');
    const querySnapshot = await messagesRef.get();

    const messages = [];
    querySnapshot.forEach((doc) => messages.push(doc.data()));
    
    console.log('Fetched messages:', messages); // Log fetched messages
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});


// Save new message to Firestore
router.post('/messages/send', async (req, res) => {
  const { userId, text, sender } = req.body;

  if (!userId || !text || !sender) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const messagesRef = userRef.collection('messages');
    await messagesRef.add({
      text,
      sender,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Error saving message' });
  }
});

export default router;