// @dada78641/env-paths <https://github.com/msikma/env-paths>
// © MIT license

import * as path from 'node:path'
import * as os from 'node:os'
import * as process from 'node:process'
import {getNormalizedPlatform} from './platform.ts'
import type {PlatformString, EnvPaths} from './types.ts'

/**
 * Creates an object of base paths suitable for the user's platform.
 * 
 * On Unix-like platforms, including macOS, this will honor the XDG environment variables if set.
 * 
 * None of these paths are guaranteed to exist.
 * 
 * This is mostly based on @sindresorhus/env-paths (also MIT licensed).
 */
export function createEnvPaths(name: string, forcePlatform?: PlatformString): EnvPaths {
  // See <https://nodejs.org/api/os.html> for how these two values are generated.
  const home = os.homedir()
  const tmp = os.tmpdir()
  const env = process.env

  // The platform, normalized to only applicable values.
  const platform = forcePlatform ?? getNormalizedPlatform(process.platform)

  function getPathSegments() {
    // On Windows, the following paths don't seem to be standardized.
    // We're using the same paths as in sindresorhus/env-paths:
    // <https://github.com/sindresorhus/env-paths/blob/main/index.js#L26>
    if (platform === 'windows') {
      const appData = env.APPDATA ?? [home, 'AppData', 'Roaming']
      const localAppData = env.LOCALAPPDATA ?? [home, 'AppData', 'Local']
      return {
        data: [localAppData, name, 'Data'],
        config: [appData, name, 'Config'],
        cache: [localAppData, name, 'Cache'],
        log: [localAppData, name, 'Log'],
        temp: [tmp, name],
      }
    }

    // On macOS, there are a number of special OS defined locations for storing data.
    // XDG is not "supposed" to be used here, but there's nothing stopping you from using it anyway.
    // For that reason, we do honor the XDG envvars if they happen to be set.
    if (platform === 'macosx') {
      return {
        data: [env.XDG_DATA_HOME || [home, 'Library', 'Application Support'], name],
        config: [env.XDG_CONFIG_HOME || [home, 'Library', 'Preferences'], name],
        cache: [env.XDG_CACHE_HOME || [home, 'Library', 'Caches'], name],
        log: [env.XDG_STATE_HOME || [home, 'Library', 'Logs'], name],
        temp: [tmp, name],
      }
    }

    // On all other platforms, use XDG paths.
    else {
      const username = path.basename(home)
      return {
        data: [env.XDG_DATA_HOME || [home, '.local', 'share'], name],
        config: [env.XDG_CONFIG_HOME || [home, '.config'], name],
        cache: [env.XDG_CACHE_HOME || [home, '.cache'], name],
        log: [env.XDG_STATE_HOME || [home, '.local', 'state'], name],
        temp: [tmp, username, name],
      }
    }
  }

  const pathSegments = getPathSegments()

  return {
    data: path.join(...pathSegments.data.flat()),
    config: path.join(...pathSegments.config.flat()),
    cache: path.join(...pathSegments.cache.flat()),
    log: path.join(...pathSegments.log.flat()),
    temp: path.join(...pathSegments.temp.flat()),
  }
}
