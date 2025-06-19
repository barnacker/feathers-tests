"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const feathers_1 = require("@feathersjs/feathers");
const socketio_client_1 = __importDefault(require("@feathersjs/socketio-client"));
const socket_io_client_1 = require("socket.io-client");
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
const app = (0, feathers_1.feathers)();
const socket = (0, socket_io_client_1.io)('http://localhost:3030'); // Replace with your Feathers server URL
app.configure((0, socketio_client_1.default)(socket));
let users;
const userService = app.service('users');
const benchService = app.service('bench');
userService.on('patched', (user) => {
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ success: true, workerId: worker_threads_1.workerData.workerId, patched: user });
});
benchService.on('created', async (data) => {
    var _a, _b, _c;
    await userService.patch(users.data[0]._id, {
        firstName: `${(_a = users === null || users === void 0 ? void 0 : users.data[0]) === null || _a === void 0 ? void 0 : _a.firstName} ${worker_threads_1.workerData.workerId}`,
    });
    console.log(`Worker ${worker_threads_1.workerData.workerId} patched: ${(_b = users === null || users === void 0 ? void 0 : users.data[0]) === null || _b === void 0 ? void 0 : _b.firstName} ${(_c = users === null || users === void 0 ? void 0 : users.data[0]) === null || _c === void 0 ? void 0 : _c.lastName}`);
});
async function fetchUsers() {
    try {
        users = await userService.find({ query: { $limit: 1, $skip: worker_threads_1.workerData.workerId } });
        return { success: true, workerId: worker_threads_1.workerData.workerId, user: users.data[0] };
    }
    catch (error) {
        // Type guard to check if error is an Error instance
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { success: false, workerId: worker_threads_1.workerData.workerId, error: errorMessage };
    }
}
// Execute and send result back to main thread
fetchUsers().then((result) => {
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(result);
});
