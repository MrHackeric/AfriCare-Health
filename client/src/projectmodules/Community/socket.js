import { io } from 'socket.io-client';

const socket = io('http://localhost:3030'); //Sockets connection
const aiSocket = io('http://localhost:3030'); // AI service socket connection

export { socket, aiSocket };
