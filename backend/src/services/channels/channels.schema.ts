// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { ChannelsService } from './channels.class';

// Main data model schema
export const channelsSchema = Type.Object(
  {
    _id: Type.String(),
    sessions: Type.Array(Type.String()),
  },
  { $id: 'Channels', additionalProperties: false },
);
export type Channels = Static<typeof channelsSchema>;
export const channelsValidator = getValidator(channelsSchema, dataValidator);
export const channelsResolver = resolve<Channels, HookContext<ChannelsService>>({});

export const channelsExternalResolver = resolve<Channels, HookContext<ChannelsService>>({});

// Schema for creating new entries
export const channelsDataSchema = Type.Pick(channelsSchema, ['_id', 'sessions'], {
  $id: 'ChannelsData',
});
export type ChannelsData = Static<typeof channelsDataSchema>;
export const channelsDataValidator = getValidator(channelsDataSchema, dataValidator);
export const channelsDataResolver = resolve<Channels, HookContext<ChannelsService>>({});

// Schema for updating existing entries
export const channelsPatchSchema = Type.Partial(channelsSchema, {
  $id: 'ChannelsPatch',
});
export type ChannelsPatch = Static<typeof channelsPatchSchema>;
export const channelsPatchValidator = getValidator(channelsPatchSchema, dataValidator);
export const channelsPatchResolver = resolve<Channels, HookContext<ChannelsService>>({});

// Schema for allowed query properties
export const channelsQueryProperties = Type.Pick(channelsSchema, ['_id']);
export const channelsQuerySchema = Type.Intersect(
  [
    querySyntax(channelsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ChannelsQuery = Static<typeof channelsQuerySchema>;
export const channelsQueryValidator = getValidator(channelsQuerySchema, queryValidator);
export const channelsQueryResolver = resolve<ChannelsQuery, HookContext<ChannelsService>>({});
