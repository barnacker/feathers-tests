// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery, ChannelsService } from './channels.class';

export type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery };

export type ChannelsClientService = Pick<
  ChannelsService<Params<ChannelsQuery>>,
  (typeof channelsMethods)[number]
>;

export const channelsPath = 'channels';

export const channelsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const channelsClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(channelsPath, connection.service(channelsPath), {
    methods: channelsMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [channelsPath]: ChannelsClientService;
  }
}
