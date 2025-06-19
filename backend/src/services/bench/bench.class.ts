// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers';

import type { Application } from '../../declarations';
import { EventEmitter } from 'events'

type Bench = any;
type BenchData = any;
type BenchPatch = any;
type BenchQuery = any;

export type { Bench, BenchData, BenchPatch, BenchQuery };

export interface BenchServiceOptions {
  app: Application;
}

export interface BenchParams extends Params<BenchQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class BenchService<ServiceParams extends BenchParams = BenchParams > extends EventEmitter
  implements ServiceInterface<Bench, BenchData, ServiceParams, BenchPatch>
{
  constructor(public options: BenchServiceOptions) { super();}

  async find(_params?: ServiceParams): Promise<Bench[]> {
    return [];
  }

  async get(id: Id, _params?: ServiceParams): Promise<Bench> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data: BenchData, params?: ServiceParams): Promise<Bench>;
  async create(data: BenchData[], params?: ServiceParams): Promise<Bench[]>;
  async create(data: BenchData | BenchData[], params?: ServiceParams): Promise<Bench | Bench[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }
    this.emit('superPatch', 'hello');

    return {
      id: 0,
      ...data,
    };
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id: NullableId, data: BenchData, _params?: ServiceParams): Promise<Bench> {
    return {
      id: 0,
      ...data,
    };
  }

  async patch(id: NullableId, data: BenchPatch, _params?: ServiceParams): Promise<Bench> {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data,
    };
  }

  async remove(id: NullableId, _params?: ServiceParams): Promise<Bench> {
    return {
      id: 0,
      text: 'removed',
    };
  }
}

export const getOptions = (app: Application) => {
  return { app };
};
