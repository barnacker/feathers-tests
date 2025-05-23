// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers';
import { app } from '../../app';
import type { Application } from '../../declarations';
import type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery } from './channels.schema';

export type { Channels, ChannelsData, ChannelsPatch, ChannelsQuery };

import { NotFound, GeneralError, NotImplemented } from '@feathersjs/errors';

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
    throw new NotImplemented(`Channels can't be read.`);
  }

  async get(_id: string, params?: ServiceParams): Promise<Channels> {
    throw new NotImplemented(`Channels can't be read.`);
  }

  async create(data: ChannelsData, params?: ServiceParams): Promise<Channels> {
    if (params?.connection) {
      console.log('params', params.connection);
      app.channel(data._id).join(params.connection);
      return data;
    }
    throw new GeneralError(`Failed to add Channel with id ${data._id}, not using WebSockets`);
  }

  async patch(_id: string, data: ChannelsPatch, params?: ServiceParams): Promise<Channels> {
    throw new NotImplemented(`Channels can't be patched.`);
  }

  async remove(_id: string, params?: ServiceParams): Promise<Channels> {
    if (params?.connection) {
      app.channel(_id).leave(params.connection);
    }
    // raise error here
    throw new NotFound(`Channel with id ${_id} not found`);
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
