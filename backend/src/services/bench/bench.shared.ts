// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Bench, BenchData, BenchPatch, BenchQuery, BenchService } from './bench.class';

export type { Bench, BenchData, BenchPatch, BenchQuery };

export type BenchClientService = Pick<BenchService<Params<BenchQuery>>, (typeof benchMethods)[number]>;

export const benchPath = 'bench';

export const benchMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const benchClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(benchPath, connection.service(benchPath), {
    methods: benchMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [benchPath]: BenchClientService;
  }
}
