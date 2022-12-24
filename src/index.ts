import { createUnplugin } from 'unplugin'
import { parse } from './core'
import type { Options } from './types'
import { isValidId } from './utils'

export default createUnplugin<Options | undefined>(() => ({
  name: 'unplugin-use-macro',
  transformInclude(id) {
    return isValidId(id)
  },
  transform(code) {
    return parse(code)
  },
}))
