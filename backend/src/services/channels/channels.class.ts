// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';
import { app } from '../../app';
import type { Application } from '../../declarations';
import type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery } from './channels.schema';

export type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery };

export interface ChannelsServiceOptions {
  app: Application;
}

export interface ChannelsParams extends Params<ChannelsQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ChannelsService<ServiceParams extends ChannelsParams = ChannelsParams>
  implements ServiceInterface<Channels, ChannelsData, ServiceParams, ChannelsPatch>
{
  constructor(public options: ChannelsServiceOptions) {}

  async find(_params?: ServiceParams): Promise<Channels[]> {
    return [];
  }

  async get(id: string, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
      sessions: [],
    };
  }

  async create(data: ChannelsData, params?: ServiceParams): Promise<Channels> {
    if (params?.connection) {
      console.log('params', params.connection);
      params.connection.channels.push(data.id);
      app.channel(data.id).join(params.connection);
    }

    return {
      id: data.id,
      sessions: data.sessions,
    };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: string, data: ChannelsData, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
      sessions: [],
    };
  }

  async patch(id: string, data: ChannelsPatch, params?: ServiceParams): Promise<Channels> {
    if (params?.connection && data.sessions) {
      params.connection.channels[id].sessions.push(data.sessions[0]);
      return {
        id: id,
        sessions: params.connection.channels[id].sessions,
      };
    }
    // raise error here
    return { id: id, sessions: [] };
  }

  async remove(id: string, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
      sessions: [],
    };
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
