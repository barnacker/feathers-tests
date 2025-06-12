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

async function patchUsers(count: number = 120) {
  try {
    console.time('Patched');
    console.log(`Starting patch of ${count} users...`);

    const users = await userService.find();
    console.log(`Fetched ${users.data.length} users from the service.`);
    for (let i = 0; i < count; i++) {
      const user = users.data[i];
      user.firstName = `${user.firstName}${i}`;
      await userService.patch(user._id, user);

      // Log progress every 10 users
      if ((i + 1) % 10 === 0) {
        console.log(`Patched ${i + 1}/${count} users`);
      }
    }
    console.timeEnd('Patched');
    console.log(`Successfully patched ${count} users.`);
  } catch (error) {
    console.error('Error patching users:', error);
  }
}

// Run the function
patchUsers(1000);
