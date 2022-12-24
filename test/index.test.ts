import { describe, expect, it } from 'vitest'
import { parse } from '../src/core'
import { isValidId } from '../src/utils'

describe('valid id', () => {
  it('valid id', () => {
    const data = ['ts', 'tsx', 'js', 'jsx', 'vue', 'svelte', '.png']
    for (const item of data)
      expect(isValidId(`index.${item}`)).toMatchSnapshot(item)
  })
  it('test', () => {
    const code = `
      useMacro("log", ($1, $2) => {
        console.log($2, $1)
      })

      log$: {
        "hello world",
        "next world"
      };
    `
    expect(parse(code)!).toMatchInlineSnapshot(`
      "
            

            ;
          
              (($1, $2) => {
        console.log($2, $1);
      })(\\"hello world\\", \\"next world\\")
            "
    `)
  })
})
