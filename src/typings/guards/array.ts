export const isArrayOfString = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string')
