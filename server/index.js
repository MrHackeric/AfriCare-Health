import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initFirebase } from "./modules/firestore.js";
import { socketConnection } from "./modules/socket.js";
import chatbot from './chatbot/chatbot.js';

// Initialize dotenv
dotenv.config();

// Set up file path utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase
initFirebase(__dirname);

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app's URL
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Community Server!");
});

// Handle chatbot routes
app.use("/", chatbot);

// Initialize socket.io connections
socketConnection(io);

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Listen on the port
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
