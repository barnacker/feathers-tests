import { parentPort } from 'worker_threads';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { io } from 'socket.io-client';

const app = feathers();
const socket = io('http://localhost:3030'); // Replace with your Feathers server URL
app.configure(socketio(socket));

const userService = app.service('users');

async function patchUsers(count: number = 120) {
  try {
    console.log(`Emit super patch...`);

    app.emit('superPatch', 'hello');
    console.log(`Emitted super patched`);
  } catch (error) {
    console.error('Error patching users:', error);
  }
}

// Run the function
patchUsers(1000);
