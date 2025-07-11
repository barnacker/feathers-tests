"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const path_1 = require("path");
// Main thread logic
if (worker_threads_1.isMainThread) {
    async function spinWorkers() {
        const workerCount = 200;
        const workers = [];
        const results = [];
        let patched = [];
        // Path to the compiled worker script (JavaScript file)
        const workerPath = (0, path_1.join)(__dirname, '../dist/userWorker.js');
        // Create 200 workers
        console.log(`Spinning up ${workerCount} workers...`);
        console.time('Workers');
        for (let i = 0; i < workerCount; i++) {
            try {
                const worker = new worker_threads_1.Worker(workerPath, { workerData: { workerId: i } });
                workers.push(worker);
                worker.on('message', (result) => {
                    if (result.patched) {
                        if (patched.length === 0) {
                            console.log('Patching record...');
                            console.time('Users notified');
                        }
                        patched.push(result.workerId);
                        if (patched.length === workers.length) {
                            console.log(`Notified ${patched.length} users.`);
                            console.timeEnd('Users notified');
                            patched = [];
                        }
                        return;
                    }
                    results.push(result);
                    console.log(`Worker ${result.workerId}: ${result.success ? `Fetched ${result.user.firstName} ${result.user.lastName}` : `Error: ${result.error}`}`);
                });
                worker.on('error', (error) => {
                    console.error(`Worker ${i} error:`, error);
                });
                worker.on('exit', (code) => {
                    if (code !== 0) {
                        console.error(`Worker ${i} exited with code ${code}`);
                    }
                });
            }
            catch (error) {
                console.error(`Failed to create worker ${i}:`, error);
            }
        }
        console.log(`Created ${workers.length} workers.`);
        console.timeEnd('Workers');
        // Wait for all workers to complete
        await Promise.all(workers.map((worker, index) => new Promise((resolve) => {
            worker.on('exit', () => resolve(index));
        })));
        console.log('All workers completed.');
        console.log(`Summary: ${results.filter((r) => r.success).length} workers succeeded, ${results.filter((r) => !r.success).length} failed.`);
    }
    spinWorkers().catch((error) => {
        console.error('Error in main thread:', error);
    });
}
