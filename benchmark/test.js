const { isMainThread } = require('worker_threads');
console.log('worker_threads available:', isMainThread);
