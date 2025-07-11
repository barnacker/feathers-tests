// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers';
import type { TransportConnection, Application } from '@feathersjs/feathers';
import authenticationClient from '@feathersjs/authentication-client';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';

import { benchClient } from './services/bench/bench.shared';
export type { Bench, BenchData, BenchQuery, BenchPatch } from './services/bench/bench.shared';

import { superPatchClient } from './services/super-patch/super-patch.shared';
export type {
  SuperPatch,
  SuperPatchData,
  SuperPatchQuery,
  SuperPatchPatch,
} from './services/super-patch/super-patch.shared';

import { channelsClient } from './services/channels/channels.shared';
export type {
  Channels,
  ChannelsData,
  ChannelsQuery,
  ChannelsPatch,
} from './services/channels/channels.shared';

import { userClient } from './services/users/users.shared';
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared';

export interface Configuration {
  connection: TransportConnection<ServiceTypes>;
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>;

/**
 * Returns a typed client for the backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {},
) => {
  const client: ClientApplication = feathers();

  client.configure(connection);
  client.configure(authenticationClient(authenticationOptions));
  client.set('connection', connection);

  client.configure(userClient);
  client.configure(channelsClient);
  client.configure(channelsClient);
  client.configure(superPatchClient);
  client.configure(benchClient);
  return client;
};
