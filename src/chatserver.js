import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Create an Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Utility to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the client files
app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast when a user connects
  socket.broadcast.emit('message', { user: 'server', text: 'A user has joined the chat' });

  // Handle incoming messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle typing notification
  socket.on('typing', () => {
    socket.broadcast.emit('typing');
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing');
  });

  // Broadcast when a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('message', { user: 'server', text: 'A user has left the chat' });
  });
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
