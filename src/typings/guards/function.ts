import { TypeGuard } from '@typings/type-guard'

export const isFunction: TypeGuard<Function> = (value: unknown): value is Function => {
  return typeof value === 'function'
}
