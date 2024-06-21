/* eslint-disable @typescript-eslint/no-explicit-any */

export const cloneDeep = <T>(target: T): T => {
  if (target === null) {
    return target
  }

  if (target instanceof Date) {
    return new Date(target.getTime()) as any
  }

  if (Array.isArray(target)) {
    return target.map(v => cloneDeep<any>(v)) as any
  }

  if (typeof target === 'object') {
    const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any }
    Object.keys(cp).forEach(k => {
      cp[k] = cloneDeep<any>(cp[k])
    })
    return cp as T
  }

  return target
}
