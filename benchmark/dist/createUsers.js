"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_1 = require("@feathersjs/feathers");
const socketio_client_1 = __importDefault(require("@feathersjs/socketio-client"));
const socket_io_client_1 = require("socket.io-client");
// Initialize Feathers client with Socket.io
const app = (0, feathers_1.feathers)();
const socket = (0, socket_io_client_1.io)('http://localhost:3030'); // Replace with your Feathers server URL
app.configure((0, socketio_client_1.default)(socket));
// Get the users service
const userService = app.service('users');
// Function to generate random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
// Function to generate a random user
function generateRandomUser(id) {
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
    }
    catch (error) {
        console.error('Error creating users:', error);
    }
}
// Run the function
createUsers();
