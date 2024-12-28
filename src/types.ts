// @dada78641/env-paths <https://github.com/msikma/env-paths>
// © MIT license

// All recognized platform strings.
export type PlatformString = 'windows' | 'macosx' | 'unix_like'

// Data returned by this library.
export interface EnvPaths {
  data: string
  config: string
  cache: string
  log: string
  temp: string
}
