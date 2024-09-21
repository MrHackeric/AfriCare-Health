import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { server, app } from "./modules/server.js";
import { Server } from "socket.io";
import socketConnection from "./modules/socket.js";
import dotenv from "dotenv";
import initFirebase from './modules/firestore.js';

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase
initFirebase(__dirname);

// Initialize dotenv
dotenv.config();

// Function to generate a timestamp
const getTimestamp = () => {
  return new Date().toLocaleString();
};

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: "https://africare-app.netlify.app", // Your React app's URL
    methods: ["GET", "POST"],
  },
});

// Register socket.io events
socketConnection(io);

// Listen on the port with logging
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`[${getTimestamp()}] Server running on port ${PORT}`);
});

// Error handling
server.on('error', (error) => {
  console.error(`[${getTimestamp()}] Server error: ${error.message}`);
});

// Example of logging any socket connection with timestamps
io.on('connection', (socket) => {
  console.log(`[${getTimestamp()}] User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[${getTimestamp()}] User disconnected: ${socket.id}`);
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  io.close(() => {
    console.log(`[${getTimestamp()}] Socket server closed`);
    server.close(() => {
      console.log(`[${getTimestamp()}] HTTP server closed`);
      process.exit(0);
    });
  });
});
