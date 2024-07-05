import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const nameValidationRules: Rule[] = [
  { max: 30, message: t(TranslationKey['The name is too long!']) },
  { required: true, message: t(TranslationKey['Please input your name!']) },
]

export const getEmailValidationRules = (auth?: boolean): Rule[] => {
  if (auth) {
    return [
      { type: 'email', message: t(TranslationKey['The input is not valid email!']) },
      { required: true, message: t(TranslationKey['Please input your email!']) },
    ]
  }

  return [
    { max: 30, message: t(TranslationKey['The email is too long!']) },
    { type: 'email', message: t(TranslationKey['The input is not valid email!']) },
    { required: true, message: t(TranslationKey['Please input your email!']) },
  ]
}

export const getPasswordValidationRules = (auth?: boolean, editUser?: boolean): Rule[] => {
  if (auth) {
    return [{ required: true, message: t(TranslationKey['Please input your password!']) }]
  }

  const rulesWithoutRequired: Rule[] = [
    { max: 32, message: t(TranslationKey['The password is too long! (Maximum 32 characters)']) },
    { min: 8, message: t(TranslationKey['The password is too short! (Minimum 8 characters)']) },
    {
      pattern: /(?=.*[A-Z])/,
      message: t(TranslationKey['The password must contain at least one uppercase letter!']),
    },
    {
      pattern: /(?=.*[a-z])/,
      message: t(TranslationKey['The password must contain at least one lowercase letter!']),
    },
    { pattern: /(?=.*\d)/, message: t(TranslationKey['The password must contain at least one digit!']) },
    { pattern: /^[A-Za-z\d]*$/, message: t(TranslationKey['The password must contain only English letters!']) },
  ]

  if (editUser) {
    return rulesWithoutRequired
  }

  return [...rulesWithoutRequired, { required: true, message: t(TranslationKey['Please input your password!']) }]
}

export const confirmValidationRules: Rule[] = [
  {
    required: true,
    message: t(TranslationKey['Please confirm your password!']),
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(t(TranslationKey['The new password that you entered do not match!'])))
    },
  }),
]

export const newPasswordValidationRules: Rule[] = [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('oldPassword') !== value) {
        return Promise.resolve()
      }
      return Promise.reject(
        new Error(t(TranslationKey['The new password that you entered matches the current password!'])),
      )
    },
  }),
]

export const MAX_INPUT_LENGTH = 64
