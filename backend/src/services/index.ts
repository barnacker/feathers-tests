import { bench } from './bench/bench';
import { superPatch } from './super-patch/super-patch';
import { channels } from './channels/channels';
import { user } from './users/users';
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations';

export const services = (app: Application) => {
  app.configure(bench);
  app.configure(superPatch);
  app.configure(channels);
  app.configure(user);
};
