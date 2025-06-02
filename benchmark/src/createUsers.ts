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

// Get the users service
const userService = app.service('users');

// Function to generate random string
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random user
function generateRandomUser(id: number): User {
  return {
    firstName: `John${id}`,
    lastName: `Doe${id}`,
    email: `user${id}@example.com`,
    password: `pass${id}${generateRandomString(8)}`,
  };
}

// Async function to create 2000 users
async function createUsers() {
  try {
    for (let i = 0; i < 2000; i++) {
      const user = generateRandomUser(i);
      await userService.create(user);
      console.log(`Created user ${i + 1}: ${user.email}`);
    }
    console.log('Successfully created 2000 users.');
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

// Run the function
createUsers();
