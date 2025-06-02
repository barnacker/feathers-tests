"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const feathers_1 = require("@feathersjs/feathers");
const socketio_client_1 = __importDefault(require("@feathersjs/socketio-client"));
const socket_io_client_1 = require("socket.io-client");
// Initialize Feathers client with Socket.io
const app = (0, feathers_1.feathers)();
const socket = (0, socket_io_client_1.io)('http://localhost:3030'); // Replace with your Feathers server URL
app.configure((0, socketio_client_1.default)(socket));
const userService = app.service('users');
async function fetchUsers() {
    var _a;
    try {
        const users = await userService.find();
        return { success: true, workerId: worker_threads_1.workerData.workerId, count: users.length || ((_a = users.data) === null || _a === void 0 ? void 0 : _a.length) };
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
    process.exit();
});
