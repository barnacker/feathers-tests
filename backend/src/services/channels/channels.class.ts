// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';
import {app} from "../../app"
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
    return [];
  }

  async get(id: string, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
    };
  }

  async create(data: ChannelsData, params?: ServiceParams): Promise<Channels>{

   if(params?.connection){
params.connection.channels.push(data.id)
    app.channel(`channels/${data.id}`).join(params.connection)
    }

    return {
      id: data.id,
    };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: string, data: ChannelsData, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
    };
  }

  async patch(id: string, data: ChannelsPatch, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
    };
  }

  async remove(id: string, _params?: ServiceParams): Promise<Channels> {
    return {
      id: id,
    };
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
