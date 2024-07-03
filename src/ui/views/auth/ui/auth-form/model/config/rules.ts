import { Rule } from 'antd/es/form'

export const nameValidationRules: Rule[] = [
  { max: 30, message: 'The name is too long!' },
  { required: true, message: 'Please input your name!', whitespace: true },
]

export const getEmailValidationRules = (auth?: boolean): Rule[] => {
  if (auth) {
    return [
      { type: 'email', message: 'The input is not valid email!' },
      { required: true, message: 'Please input your email!' },
    ]
  }

  return [
    { max: 30, message: 'The email is too long!' },
    { type: 'email', message: 'The input is not valid email!' },
    { required: true, message: 'Please input your email!' },
  ]
}

export const getPasswordValidationRules = (auth?: boolean): Rule[] => {
  if (auth) {
    return [{ required: true, message: 'Please input your password!' }]
  }

  return [
    { max: 32, message: 'The password is too long! (Maximum 32 characters)' },
    { min: 8, message: 'The password is too short! (Minimum 8 characters)' },
    { required: true, message: 'Please input your password!' },
    { pattern: /(?=.*[A-Z])/, message: 'The password must contain at least one uppercase letter!' },
    { pattern: /(?=.*[a-z])/, message: 'The password must contain at least one lowercase letter!' },
    { pattern: /(?=.*\d)/, message: 'The password must contain at least one digit!' },
    { pattern: /^[A-Za-z\d]*$/, message: 'The password must contain only English letters!' },
  ]
}

export const confirmValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('The new password that you entered do not match!'))
    },
  }),
]
