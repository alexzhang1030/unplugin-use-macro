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
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "App",
  setup(__props, { expose }) {
    expose();
    useMacro("log", (p) => {
      console.log({ p });
    });
    log$: {
      "hello world";
    }
    const __returned__ = { HelloWorld };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
    `
    expect(parse(code)!).toMatchInlineSnapshot(`
      "
      const _sfc_main = /* @__PURE__ */ _defineComponent({
        __name: \\"App\\",
        setup(__props, { expose }) {
          expose();
          
              (p => {
        console.log({
          p
        });
      })(\\"hello world\\")
            ;
          
          const __returned__ = { HelloWorld };
          Object.defineProperty(__returned__, \\"__isScriptSetup\\", { enumerable: false, value: true });
          return __returned__;
        }
      });
          "
    `)
  })
})
