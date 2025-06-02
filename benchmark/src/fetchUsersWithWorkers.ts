import { Worker, isMainThread } from 'worker_threads';
import { join } from 'path';

// Define the User type
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Main thread logic
if (isMainThread) {
  async function spinWorkers() {
    const workerCount = 200;
    const workers: Worker[] = [];
    const results: any[] = [];

    // Path to the compiled worker script (JavaScript file)
    const workerPath = join(__dirname, '../dist/userWorker.js');

    // Create 200 workers
    for (let i = 0; i < workerCount; i++) {
      try {
        const worker = new Worker(workerPath, { workerData: { workerId: i } });
        workers.push(worker);

        worker.on('message', (result) => {
          results.push(result);
          console.log(
            `Worker ${result.workerId}: ${result.success ? `Fetched ${result.count} users` : `Error: ${result.error}`}`,
          );
        });

        worker.on('error', (error) => {
          console.error(`Worker ${i} error:`, error);
        });

        worker.on('exit', (code) => {
          if (code !== 0) {
            console.error(`Worker ${i} exited with code ${code}`);
          }
        });
      } catch (error) {
        console.error(`Failed to create worker ${i}:`, error);
      }
    }

    // Wait for all workers to complete
    await Promise.all(
      workers.map(
        (worker, index) =>
          new Promise((resolve) => {
            worker.on('exit', () => resolve(index));
          }),
      ),
    );

    console.log('All workers completed.');
    console.log(
      `Summary: ${results.filter((r) => r.success).length} workers succeeded, ${results.filter((r) => !r.success).length} failed.`,
    );
  }

  spinWorkers().catch((error) => {
    console.error('Error in main thread:', error);
  });
}
