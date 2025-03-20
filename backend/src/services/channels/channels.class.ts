// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';

import type { Application } from '../../declarations';
import type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery } from './channels.schema';

export type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery };

export interface ChannelsServiceOptions {
  app: Application;
}

export interface ChannelsParams extends Params<ChannelsQuery> { }

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ChannelsService<ServiceParams extends ChannelsParams = ChannelsParams>
  implements ServiceInterface<Channels, ChannelsData, ServiceParams, ChannelsPatch>
{
  constructor(public options: ChannelsServiceOptions) { }

  async find(_params?: ServiceParams): Promise<Channels[]> {
    console.log(_params);
    return [];
  }

  async get(id: Id, _params?: ServiceParams): Promise<Channels> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data: ChannelsData, params?: ServiceParams): Promise<Channels>;
  async create(data: ChannelsData[], params?: ServiceParams): Promise<Channels[]>;
  async create(data: ChannelsData | ChannelsData[], params?: ServiceParams): Promise<Channels | Channels[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }
    console.log(params);
    return {
      id: 0,
      ...data,
    };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: ChannelsData, _params?: ServiceParams): Promise<Channels> {
    return {
      id: 0,
      ...data,
    };
  }

  async patch(id: NullableId, data: ChannelsPatch, _params?: ServiceParams): Promise<Channels> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data,
    };
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<Channels> {
    return {
      id: 0,
      text: 'removed',
    };
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
