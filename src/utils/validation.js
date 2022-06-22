import {ValidationError} from 'class-validator'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {getObjectKeys} from './object'
import {t} from './translations'

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

export const errorMessages = {
  'amazon must be a number conforming to the specified constraints':
    'amazon must be a number conforming to the specified constraints',
  'checkednotes should not be empty': 'checkednotes should not be empty',
  'buyersComment should not be empty': 'buyersComment should not be empty',
  'icomment should not be empty': 'icomment should not be empty',
}

export const errorMessagesTranslate = error => {
  switch (error) {
    case errorMessages['checkednotes should not be empty']:
      return t(TranslationKey["Supervisor's comment cannot be empty"])
    case errorMessages['buyersComment should not be empty']:
      return t(TranslationKey["Buyer's comment cannot be empty"])
    case errorMessages['icomment should not be empty']:
      return t(TranslationKey["The researcher's comment cannot be empty"])
    case errorMessages['amazon must be a number conforming to the specified constraints']:
      return t(TranslationKey['Amazon must be a number conforming to the specified constraints'])
  }
}

export const translateProposalsLeftMessage = (num1, num2) => {
  if (SettingsModel.languageTag === 'ru') {
    return `Осталось ${num1} из ${num2} предложений`
  } else {
    return `${num1} out of ${num2} proposals left`
  }
}
