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
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import chatbot from "./chatbot/chatbot.js";

// Store the user's email
let userEmail = '';



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
  // socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

  // Capture the user's email when they join
io.on('userEmail', (email) => {
  userEmail = email;
});


  socket.on("chatMessage", async (msg) => {
    const message = formatMessage(msg.sender, msg.text);
    try {
      // Save message to Firestore
      await db.collection("messages").add(message);
      io.emit("message", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("likeMessage", ({ index, liked }) => {
    if (messages[index]) {
      messages[index].likes = liked
        ? (messages[index].likes || 0) + 1
        : (messages[index].likes || 1) - 1;
      io.emit("updateLikes", { index, likes: messages[index].likes });
    }
  });




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
    }});
});


//chatbot component
app.use("/", chatbot);

// Listen on the same port
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
