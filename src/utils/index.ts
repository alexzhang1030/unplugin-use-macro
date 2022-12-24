import type { NodePath } from '@babel/core'
import type { Identifier } from '@babel/types'
import { DEFINE_MACRO, VALID_ID_RE } from '../constant'

export const isValidId = (id: string) => {
  return VALID_ID_RE.test(id)
}

export const isDefineMacro = (path: NodePath<Identifier>) => {
  return path.node.name === DEFINE_MACRO
}

export const getBodyAndName = (funcArgus: NodePath[]) => {
  const [name, body] = funcArgus
  if (!name.isStringLiteral() || !body.isArrowFunctionExpression())
    throw new Error('Invalid defineMacro arguments')
  return {
    name, body,
  }
}
