import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import formatMessage from "./utils/messages.js"; // Ensure this path is correct for your project
import dotenv from "dotenv";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import fs from "fs";
import chatbot from './chatbot/chatbot.js'

// Initialize dotenv
dotenv.config();

// Set up file path utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(
  __dirname,
  "./auth/africare-health-app-firebase-adminsdk-fxdsl-c304604fa8.json"
);

// Read service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore using Firebase Admin SDK
const db = admin.firestore();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app's URL
    methods: ["GET", "POST"],
  },
});

// Store the user's email
let userEmail = '';

// Middlewares for both server functionalities
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Chat server functionality
const botName = "Africare Bot";
let messages = [];

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Community Server!");
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit(
    "message",
    formatMessage(botName, "Welcome to Africare Community Support!")
  );

  // Capture the user's email when they join
  socket.on('userEmail', (email) => {
    userEmail = email;
  });

  // Load initial messages from Firestore
  const messagesRef = db.collection("messages");
  const q = messagesRef.orderBy("timestamp");
  
  // Listen to real-time updates from Firestore
  q.onSnapshot((snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    io.emit("loadMessages", messages);
  });

  // Handle new chat messages
socket.on("chatMessage", async (msg) => {
  const message = {
    sender: msg.sender,        // assuming msg.sender contains the sender's ID
    text: msg.text,            // assuming msg.text contains the text of the message
    timestamp: new Date().toISOString(), // current timestamp
    likes: 0                   // initialize the likes count to 0
  };

  try {
    // Add message to Firestore with the likes count
    const messageRef = await db.collection("messages").add(message);
    
    // Emit the message event with the newly added message and its ID
    io.emit("message", { 
      id: messageRef.id,        // Firestore-generated message ID
      ...message                // spread the rest of the message fields
    });
  } catch (error) {
    console.error("Error saving message:", error);
  }
});

  // Handle message likes
  socket.on("likeMessage", async (messageId) => {
    const messageRef = db.collection("messages").doc(messageId);
    
    try {
      const messageSnapshot = await messageRef.get();
      if (messageSnapshot.exists) {
        const currentLikes = messageSnapshot.data().likes || 0;
        await messageRef.update({
          likes: currentLikes + 1
        });
        
        // Emit the updated likes count
        io.emit("messageLiked", { id: messageId, likes: currentLikes + 1 });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  });

  // Logic to handle emitting to users, when a user is typing
  socket.on('typing', (user) => {
    socket.broadcast.emit('userTyping', user); // Broadcast to all except sender
  });

  socket.on('stopTyping', (user) => {
    socket.broadcast.emit('userStopTyping', user); // Broadcast to all except sender
  });

  socket.on("disconnect", () => {
    if (userEmail) {
      console.log(`User with email ${userEmail} disconnected`);
    } else {
      console.log('A user disconnected');
    }
  });
});

//chatbot component
app.use("/", chatbot);

// Listen on the same port
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
