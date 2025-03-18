// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations';

export const wait = async (context: HookContext) => {
  await new Promise((r) => setTimeout(r, 1000));
};
