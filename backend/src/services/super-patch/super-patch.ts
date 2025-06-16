// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  superPatchDataValidator,
  superPatchPatchValidator,
  superPatchQueryValidator,
  superPatchResolver,
  superPatchExternalResolver,
  superPatchDataResolver,
  superPatchPatchResolver,
  superPatchQueryResolver,
} from './super-patch.schema';

import type { Application } from '../../declarations';
import { SuperPatchService, getOptions } from './super-patch.class';
import { superPatchPath, superPatchMethods } from './super-patch.shared';

export * from './super-patch.class';
export * from './super-patch.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const superPatch = (app: Application) => {
  // Register our service on the Feathers application
  app.use(superPatchPath, new SuperPatchService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: superPatchMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(superPatchPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(superPatchExternalResolver),
        schemaHooks.resolveResult(superPatchResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(superPatchQueryValidator),
        schemaHooks.resolveQuery(superPatchQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(superPatchDataValidator),
        schemaHooks.resolveData(superPatchDataResolver),
      ],
      patch: [
        schemaHooks.validateData(superPatchPatchValidator),
        schemaHooks.resolveData(superPatchPatchResolver),
      ],
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
    [superPatchPath]: SuperPatchService;
  }
}
