// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { SuperPatch, SuperPatchData, SuperPatchPatch, SuperPatchQuery } from './super-patch.schema';

export type { SuperPatch, SuperPatchData, SuperPatchPatch, SuperPatchQuery };

export interface SuperPatchParams extends MongoDBAdapterParams<SuperPatchQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SuperPatchService<ServiceParams extends Params = SuperPatchParams> extends MongoDBService<
  SuperPatch,
  SuperPatchData,
  SuperPatchParams,
  SuperPatchPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('super-patch')),
  };
};
