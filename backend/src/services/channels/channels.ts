// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  channelsDataValidator,
  channelsPatchValidator,
  channelsQueryValidator,
  channelsResolver,
  channelsExternalResolver,
  channelsDataResolver,
  channelsPatchResolver,
  channelsQueryResolver,
} from './channels.schema';

import type { Application } from '../../declarations';
import { ChannelsService, getOptions } from './channels.class';
import { channelsPath, channelsMethods } from './channels.shared';

export * from './channels.class';
export * from './channels.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const channels = (app: Application) => {
  // Register our service on the Feathers application
  app.use(channelsPath, new ChannelsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: channelsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(channelsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(channelsExternalResolver),
        schemaHooks.resolveResult(channelsResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(channelsQueryValidator),
        schemaHooks.resolveQuery(channelsQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(channelsDataValidator),
        schemaHooks.resolveData(channelsDataResolver),
      ],
      patch: [
        schemaHooks.validateData(channelsPatchValidator),
        schemaHooks.resolveData(channelsPatchResolver),
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
    [channelsPath]: ChannelsService;
  }
}
