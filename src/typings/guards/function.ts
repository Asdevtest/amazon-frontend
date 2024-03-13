import { TypeGuard } from './type-guard'

export const isFunction: TypeGuard<Function> = (value: unknown): value is Function => {
  return typeof value === 'function'
}
