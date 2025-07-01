import type { Config, Options } from '../types';

import { defaults } from './defaults';

/**
 * Merges any provided options with the default configuration
 *
 * @param options - The options to merge with the default configuration
 *
 * @returns The merged configuration object
 */
export const mergeConfig = (options?: Options): Config => {
  if (!options) {
    return { ...defaults };
  }

  const { selectors, ...rest } = options;

  return {
    ...defaults,
    ...rest,
    selectors: { ...defaults.selectors, ...selectors },
  };
};
