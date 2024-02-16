import { TypeGuard } from '@typings/type-guard'

export const isString: TypeGuard<string> = (value: unknown): value is string => typeof value === 'string'
