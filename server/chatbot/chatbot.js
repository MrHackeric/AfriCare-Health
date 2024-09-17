import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import fs from 'fs';
import { model, safetySettings, generationConfig } from './generativeAIConfig.js'; // AI setup import
import { db } from '../auth/firebase-config.js';


// Initialize dotenv
dotenv.config();



// Read service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your React app's URL
    methods: ["GET", "POST"]
  }
});

// Middlewares for both server functionalities
app.use(bodyParser.json());
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Chat server functionality
const botName = "Africare Bot";
let messages = [];



// Chat endpoint
app.post('/chat', upload.single('file'), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const response = await runChat(text);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ask AI endpoint
app.post('/askAi', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const response = await runChat(text);
    res.json({ response });
  } catch (error) {
    console.error("Error in /askAi endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Listen on the same port
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});














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


export default router;