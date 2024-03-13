import { TypeGuard } from '@typings/guards/type-guard'

export const isString: TypeGuard<string> = (value: unknown): value is string => typeof value === 'string'
