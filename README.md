# unplugin-use-macro

> **Note**
> This project is in alpha stage, and is not ready for production use.

[![NPM version](https://img.shields.io/npm/v/unplugin-use-macro?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-use-macro)

## Install

```bash
pnpm i -D unplugin-use-macro
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UseMacro from 'unplugin-use-macro/vite'

export default defineConfig({
  plugins: [
    UseMacro({/* options */}),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UseMacro from 'unplugin-use-macro/vite'

export default {
  plugins: [
    UseMacro({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-use-macro/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-use-macro/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-use-macro/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UseMacro from 'unplugin-use-macro/esbuild'

build({
  plugins: [UseMacro()],
})
```

<br></details>

## Usage

Define a macro and then use it after defined.

```ts
// Define by using `useMacro`
useMacro('myMacro', (arg) => {
  return arg
})

// Using by `label` statement, but will be compiled
// `$` suffix is necessary
myMacro$: {
  'Hello Macro'
}
```

Compile To

```js
((arg) => {
  return arg
})('hello Macro')
```

## Known Issues

### 1. HMR

This stage not handle `HMR`, so will not update when you change the macro body.
