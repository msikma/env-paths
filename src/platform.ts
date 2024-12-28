// @dada78641/env-paths <https://github.com/msikma/env-paths>
// © MIT license

import type {PlatformString} from './types.ts'

/**
 * Returns the current platform string, normalized to a value we can utilize.
 * 
 * See <https://nodejs.org/api/process.html#processplatform> for more information.
 */
export function getNormalizedPlatform(platform: string): PlatformString {
  if (platform === 'win32') {
    return 'windows'
  }
  if (platform === 'darwin') {
    return 'macosx'
  }
  // All other platforms are assumed to be either Linux or similar enough.
  return 'unix_like'
}
