import { isNotUndefined } from '@utils/checks'

import { getLoggerServiceForClass } from '../logger-service-for-class/index'

export const LoggerForMethodDecorator = config => (target, propertyKey, descriptor) => {
  const logger = getLoggerServiceForClass(target)
  let fn
  let patchedFn

  if (isNotUndefined(descriptor)) {
    fn = descriptor.value
  }

  return {
    configurable: true,
    enumerable: false,
    get: () => {
      if (isNotUndefined(Function)) {
        patchedFn = (...args) => {
          if (isNotUndefined(fn)) {
            try {
              logger.logParams(propertyKey, args)
              const result = fn.apply(this, args)
              logger.logResult(propertyKey, result)
              return result
            } catch (error) {
              logger.logCoughtError(propertyKey, error)
              if (!config?.doNotThrowErrors) {
                throw error
              }
            }
          }
        }
      }
      return patchedFn
    },
    set: newFn => {
      patchedFn = undefined
      fn = newFn
    },
  }
}
