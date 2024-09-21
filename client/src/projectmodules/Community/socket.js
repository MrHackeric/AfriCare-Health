import { io } from 'socket.io-client';

const socket = io('https://africare-backrnd-ghfwd0e4d6aeegcv.southafricanorth-01.azurewebsites.net/'); //Sockets connection
const aiSocket = io('https://africare-backrnd-ghfwd0e4d6aeegcv.southafricanorth-01.azurewebsites.net/'); // AI service socket connection

export { socket, aiSocket };
