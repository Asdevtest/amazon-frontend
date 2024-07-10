import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const nameValidationRules: Rule[] = [
  { max: 32, message: t(TranslationKey['The name is too long!']) },
  { required: true, message: t(TranslationKey['Please input your name!']) },
]

export const getEmailValidationRules = (auth?: boolean): Rule[] => {
  const commonRules: Rule[] = [
    { type: 'email', message: t(TranslationKey['The input is not valid email!']) },
    { required: true, message: t(TranslationKey['Please input your email!']) },
  ]
  const additionalRules: Rule[] = auth ? [] : [{ max: 30, message: t(TranslationKey['The email is too long!']) }]

  return [...additionalRules, ...commonRules]
}

export const getPasswordValidationRules = (auth?: boolean, editUser?: boolean): Rule[] => {
  if (auth) {
    return [
      { required: true, message: t(TranslationKey['Please input your password!']) },
      () => ({
        validator(_, value) {
          if (value && value.trim() !== value) {
            return Promise.reject(new Error(t(TranslationKey['The password should not start or end with a space!'])))
          }

          return Promise.resolve()
        },
      }),
    ]
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
    { pattern: /^[A-Za-z\d\s]*$/, message: t(TranslationKey['The password must contain only English letters!']) },
    () => ({
      validator(_, value) {
        if (value && value.trim() !== value) {
          return Promise.reject(new Error(t(TranslationKey['The password should not start or end with a space!'])))
        }

        return Promise.resolve()
      },
    }),
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
      if (value && value.trim() !== value) {
        return Promise.reject(new Error(t(TranslationKey['The password should not start or end with a space!'])))
      }

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
