// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import { ObjectIdSchema } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import type { SuperPatchService } from './super-patch.class';

// Main data model schema
export const superPatchSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(),
  },
  { $id: 'SuperPatch', additionalProperties: false },
);
export type SuperPatch = Static<typeof superPatchSchema>;
export const superPatchValidator = getValidator(superPatchSchema, dataValidator);
export const superPatchResolver = resolve<SuperPatch, HookContext<SuperPatchService>>({});

export const superPatchExternalResolver = resolve<SuperPatch, HookContext<SuperPatchService>>({});

// Schema for creating new entries
export const superPatchDataSchema = Type.Pick(superPatchSchema, ['text'], {
  $id: 'SuperPatchData',
});
export type SuperPatchData = Static<typeof superPatchDataSchema>;
export const superPatchDataValidator = getValidator(superPatchDataSchema, dataValidator);
export const superPatchDataResolver = resolve<SuperPatch, HookContext<SuperPatchService>>({});

// Schema for updating existing entries
export const superPatchPatchSchema = Type.Partial(superPatchSchema, {
  $id: 'SuperPatchPatch',
});
export type SuperPatchPatch = Static<typeof superPatchPatchSchema>;
export const superPatchPatchValidator = getValidator(superPatchPatchSchema, dataValidator);
export const superPatchPatchResolver = resolve<SuperPatch, HookContext<SuperPatchService>>({});

// Schema for allowed query properties
export const superPatchQueryProperties = Type.Pick(superPatchSchema, ['_id', 'text']);
export const superPatchQuerySchema = Type.Intersect(
  [
    querySyntax(superPatchQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type SuperPatchQuery = Static<typeof superPatchQuerySchema>;
export const superPatchQueryValidator = getValidator(superPatchQuerySchema, queryValidator);
export const superPatchQueryResolver = resolve<SuperPatchQuery, HookContext<SuperPatchService>>({});
