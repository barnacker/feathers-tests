import { parentPort, workerData } from 'worker_threads';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { io } from 'socket.io-client';

// Define the User type
interface User {
  _id: string; // Assuming _id is a string, adjust as necessary
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
// Sauvegarder la méthode console.log originale
const originalLog = console.log;

// Surcharger console.log
console.log = function (...args) {
  // Obtenir le timestamp actuel au format 'HH:MM:SS:ms'
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const timestamp = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  // Ajouter le timestamp comme premier argument
  originalLog.apply(console, [`[${timestamp}]`, ...args]);
};
// Initialize Feathers client with Socket.io
const app = feathers();
const socket = io('http://localhost:3030'); // Replace with your Feathers server URL
app.configure(socketio(socket));

const userService = app.service('users');

userService.on('patched', (user: User) => {
  const test = workerData.workerId;
  console.log(`Worker id:`, test);
  parentPort?.postMessage({ success: true, workerId: workerData.workerId, patched: user });
  process.exit(0);
});
async function fetchUsers() {
  try {
    const users = await userService.find();
    return { success: true, workerId: workerData.workerId, count: users.length || users.data?.length };
  } catch (error) {
    // Type guard to check if error is an Error instance
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, workerId: workerData.workerId, error: errorMessage };
  }
}

// Execute and send result back to main thread
fetchUsers().then((result) => {
  parentPort?.postMessage(result);
});
