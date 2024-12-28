[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/) [![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/@dada78641%2Fenv-paths.svg)](https://badge.fury.io/js/@dada78641%2Fenv-paths)

# @dada78641/env-paths

Library for determining platform-specific data paths.

This is mainly based on the [sindresorhus/env-paths](https://github.com/sindresorhus/env-paths) package, with the main difference being that this library will utilize the [XDG Base Directory](https://wiki.archlinux.org/title/XDG_Base_Directory) specification even on macOS, if the `XDG_*_HOME` variables are set.

## Usage

```bash
npm i @dada78641/env-paths
```

```ts
import {createEnvPaths} from '@dada78641/env-paths'

export const envPaths = createEnvPaths('my_program')
```

### Example output

Running the code as above will return paths such as these:

<table>
  <tr>
    <th align="left">Operating system</th>
    <th align="left">Key</th>
    <th align="left">Example path</th>
  </tr>
  
  <tr>
    <td rowspan="5">Windows</td>
    <td><code>data</code></td>
    <td><code>C:\Users\Dada\AppData\Local\my_program\Data</code></td>
  </tr>
  <tr>
    <td><code>config</code></td>
    <td><code>C:\Users\Dada\AppData\Roaming\my_program\Config</code></td>
  </tr>
  <tr>
    <td><code>cache</code></td>
    <td><code>C:\Users\Dada\AppData\Local\my_program\Cache</code></td>
  </tr>
  <tr>
    <td><code>log</code></td>
    <td><code>C:\Users\Dada\AppData\Local\my_program\Log</code></td>
  </tr>
  <tr>
    <td><code>temp</code></td>
    <td><code>C:\Users\Dada\AppData\Local\Temp\my_program</code></td>
  </tr>
  
  <tr>
    <td rowspan="5">macOS</td>
    <td><code>data</code></td>
    <td><code>/Users/dada/Library/Application Support/my_program</code></td>
  </tr>
  <tr>
    <td><code>config</code></td>
    <td><code>/Users/dada/Library/Preferences/my_program</code></td>
  </tr>
  <tr>
    <td><code>cache</code></td>
    <td><code>/Users/dada/Library/Caches/my_program</code></td>
  </tr>
  <tr>
    <td><code>log</code></td>
    <td><code>/Users/dada/Library/Logs/my_program</code></td>
  </tr>
  <tr>
    <td><code>temp</code></td>
    <td><code>/var/folders/tmp/my_program</code>†</td>
  </tr>
  
  <tr>
    <td rowspan="5">Linux (Unix-like)</td>
    <td><code>data</code></td>
    <td><code>/home/dada/.local/share/my_program</code></td>
  </tr>
  <tr>
    <td><code>config</code></td>
    <td><code>/home/dada/.config/my_program</code></td>
  </tr>
  <tr>
    <td><code>cache</code></td>
    <td><code>/home/dada/.cache/my_program</code></td>
  </tr>
  <tr>
    <td><code>log</code></td>
    <td><code>/home/dada/.local/state/my_program</code></td>
  </tr>
  <tr>
    <td><code>temp</code></td>
    <td><code>/tmp/dada/my_program</code></td>
  </tr>
  
</table>

†: This path will typically be a symlink to someplace else, usually a path starting with `/private/var/folders`.

### XDG variables

The following XDG variables are recognized on Linux and macOS:

| Variable | Key | Description |
|:---------|:--------|:------------|
| `XDG_DATA_HOME` | `data` | Data files produced by the application |
| `XDG_CONFIG_HOME` | `config` | Settings, preferences, etc. |
| `XDG_CACHE_HOME` | `cache` | Cache files (should always be deletable) |
| `XDG_STATE_HOME` | `log` | Session files, logs, history files, etc. |

## License

MIT licensed.
