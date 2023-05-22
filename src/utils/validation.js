import { ValidationError } from 'class-validator'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { getObjectKeys } from './object'
import { t } from './translations'

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
      func({ errorProperty: err.property, constraint: err.constraints[firstConstraint] })
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
  'fbaamount must be a number conforming to the specified constraints':
    'fbaamount must be a number conforming to the specified constraints',
  'width must be a number conforming to the specified constraints':
    'width must be a number conforming to the specified constraints',
  'height must be a number conforming to the specified constraints':
    'height must be a number conforming to the specified constraints',
  'length must be a number conforming to the specified constraints':
    'length must be a number conforming to the specified constraints',
  'weight must be a number conforming to the specified constraints':
    'weight must be a number conforming to the specified constraints',
  'fbafee must be a number conforming to the specified constraints':
    'fbafee must be a number conforming to the specified constraints',
  'Product code field is required for this action': 'Product code field is required for this action',
  'This product already exists': 'This product already exists',
  'reffee must be a number conforming to the specified constraints':
    'reffee must be a number conforming to the specified constraints',
  'minpurchase must be a number conforming to the specified constraints':
    'minpurchase must be a number conforming to the specified constraints',
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
    case errorMessages['fbaamount must be a number conforming to the specified constraints']:
      return t(TranslationKey['Fbaamount must be a number conforming to the specified constraints'])
    case errorMessages['width must be a number conforming to the specified constraints']:
      return t(TranslationKey['Width must be a number conforming to the specified constraints'])
    case errorMessages['height must be a number conforming to the specified constraints']:
      return t(TranslationKey['Height must be a number conforming to the specified constraints'])
    case errorMessages['length must be a number conforming to the specified constraints']:
      return t(TranslationKey['Length must be a number conforming to the specified constraints'])
    case errorMessages['weight must be a number conforming to the specified constraints']:
      return t(TranslationKey['Weight must be a number conforming to the specified constraints'])
    case errorMessages['fbafee must be a number conforming to the specified constraints']:
      return t(TranslationKey['Fbafee must be a number conforming to the specified constraints'])
    case errorMessages['Product code field is required for this action']:
      return t(TranslationKey['Product code field is required for this action'])
    case errorMessages['This product already exists']:
      return t(TranslationKey['This product already exists'])
    case errorMessages['reffee must be a number conforming to the specified constraints']:
      return t(TranslationKey['Reffee must be a number conforming to the specified constraints'])
    case errorMessages['minpurchase must be a number conforming to the specified constraints']:
      return t(TranslationKey['Min purchase price must be a number conforming to the specified constraints'])

    default:
      return error
  }
}

export const translateProposalsLeftMessage = (num1, num2) => {
  if (SettingsModel.languageTag === 'ru') {
    return `Осталось ${num1} из ${num2} предложений`
  } else {
    return `${num1} out of ${num2} proposals left`
  }
}

export const validationMessagesArray = (
  errorMinLength,
  errorOneNumber,
  errorUppercaseLetter,
  errorLowercaseLetter,
  errorNoEngLetter,
) => [
  {
    name: t(TranslationKey['The password must contain']),
    error: '',
  },
  {
    name: `${t(TranslationKey.minimum)} 6 ${t(TranslationKey.characters)},`,
    error: errorMinLength,
  },

  {
    name: `1 ${t(TranslationKey.number)},`,
    error: errorOneNumber,
  },
  {
    name: t(TranslationKey.uppercase),
    error: errorUppercaseLetter,
  },
  {
    name: t(TranslationKey.and),
    error: '',
  },

  {
    name: t(TranslationKey.lowercase),
    error: errorLowercaseLetter,
  },

  {
    name: t(TranslationKey['latin letters']),
    error: errorNoEngLetter,
  },
]
