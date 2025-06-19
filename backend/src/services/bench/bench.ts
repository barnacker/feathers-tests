// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations';
import { BenchService, getOptions } from './bench.class';
import { benchPath, benchMethods } from './bench.shared';

export * from './bench.class';

// A configure function that registers the service and its hooks via `app.configure`
export const bench = (app: Application) => {
  // Register our service on the Feathers application
  app.use(benchPath, new BenchService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: benchMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(benchPath).hooks({
    around: {
      all: [],
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [benchPath]: BenchService;
  }
}
