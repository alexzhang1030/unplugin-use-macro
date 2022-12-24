import type { NodePath } from '@babel/core'
import { parseSync, traverse } from '@babel/core'
import type { ArrowFunctionExpression } from '@babel/types'
import Ms from 'magic-string'
import { getBodyAndName, isDefineMacro } from '../utils'

export const Macros = new Map<string, NodePath<ArrowFunctionExpression>>()

export function parse(code: string) {
  let insertPos = 0
  const ast = parseSync(code)
  const codeMs = new Ms(code)
  traverse(ast, {
    CallExpression(path) {
      const callee = path.get('callee')
      if (callee.isIdentifier() && isDefineMacro(callee)) {
        const { name, body } = getBodyAndName(path.get('arguments'))
        if (!Macros.has(name.node.value))
          Macros.set(name.node.value, body)
        else
          console.warn(`Duplicate macro define: ${name}`)
        codeMs.remove(path.node.start!, path.node.end!)
        insertPos = path.node.start!
      }
    },
    LabeledStatement(path) {
      const label = path.get('label')
      const name = label.node.name
      if (!name.endsWith('$'))
        return
      const macroName = name.slice(0, -1)
      const macroBody = Macros.get(macroName)
      codeMs.remove(path.node.start!, path.node.end!)
      const callMacroBody = path.get('body')
      if (macroBody) {
        const params = callMacroBody.toString().replaceAll('\n', '').slice(1, -2).trim()
        codeMs.appendRight(insertPos, `
        (${macroBody?.toString()})(${params})
      `)
      }
    },
  })
  return codeMs.toString()
}
