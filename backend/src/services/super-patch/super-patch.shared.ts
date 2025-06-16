// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type {
  SuperPatch,
  SuperPatchData,
  SuperPatchPatch,
  SuperPatchQuery,
  SuperPatchService,
} from './super-patch.class';

export type { SuperPatch, SuperPatchData, SuperPatchPatch, SuperPatchQuery };

export type SuperPatchClientService = Pick<
  SuperPatchService<Params<SuperPatchQuery>>,
  (typeof superPatchMethods)[number]
>;

export const superPatchPath = 'super-patch';

export const superPatchMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const superPatchClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(superPatchPath, connection.service(superPatchPath), {
    methods: superPatchMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [superPatchPath]: SuperPatchClientService;
  }
}
