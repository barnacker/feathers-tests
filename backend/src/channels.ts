// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import type { RealTimeConnection, Params } from '@feathersjs/feathers';
import type { AuthenticationResult } from '@feathersjs/authentication';
import '@feathersjs/transport-commons';
import type { Application, HookContext } from './declarations';
import { logger } from './logger';
import { ChannelsService } from './services/channels/channels.class';
export const channels = (app: Application) => {
  logger.warn(
    'Publishing all events to all authenticated users. See `channels.ts` and https://dove.feathersjs.com/api/channels.html for more information.',
  );

  app.on('connection', (connection: RealTimeConnection) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult: AuthenticationResult, { connection }: Params) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      //Add user channels
      app.channel(`users/${connection.user._id}`).join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, context: HookContext) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.pub  lish(eventname, () => {})`
    // e.g. to publish all service events to all authenticated users use
    const conex = app.channel('anonymous').connections;
    console.log('lenght of channels', app.channel('anonymous').length);
    // console.log('connections in anonymous channel', conex);
    if (context.self instanceof ChannelsService) {
      console.log('is a channel service');
      console.log(context.arguments[2]?.connection?.channels);
      return;
    }
    if (context.arguments[2]?.connection?.user) {
      return [app.channel(context.arguments[0])];
    }
    return app.channel('anonymous');
  });
};
