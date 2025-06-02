import { parentPort, workerData } from 'worker_threads';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { io } from 'socket.io-client';

// Define the User type
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Initialize Feathers client with Socket.io
const app = feathers();
const socket = io('http://localhost:3030'); // Replace with your Feathers server URL
app.configure(socketio(socket));

const userService = app.service('users');

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
  process.exit();
});
