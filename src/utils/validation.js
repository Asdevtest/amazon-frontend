import {ValidationError} from 'class-validator'

import {getObjectKeys} from './object'

export const isValidationErrors = errors => {
  if (Array.isArray(errors)) {
    return errors.every(error => error instanceof ValidationError)
  }

  return false
}

export const plainValidationErrors = errors =>
  errors.reduce((acc, cur) => {
    let accTmp = []
    if (cur.children?.length) {
      accTmp = [...acc, ...cur.children]
    } else {
      accTmp = [...acc, cur]
    }
    return accTmp
  }, [])

export const plainValidationErrorAndApplyFuncForEachError = (error, func) => {
  const plainErrors = plainValidationErrors(error)
  plainErrors.forEach(err => {
    if (err.constraints) {
      const [firstConstraint] = getObjectKeys(err.constraints)
      func({errorProperty: err.property, constraint: err.constraints[firstConstraint]})
    }
  })
}

export const disallowsSpecialCharInFirstCharEmail = field =>
  field.charAt(0).replace(/[{}@"!#$%^&*()+=;:`~|'?/><, ]/, '')
export const disallowsSpecialCharInEmailField = field => field.replace(/[{}"!#$%^&*()+=;:`~|'?/><, ]/, '')
