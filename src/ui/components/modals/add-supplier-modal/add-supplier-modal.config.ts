import { Rule } from 'antd/es/form'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { requiredRule } from '@config/form-rules/get-required-rules'

export const getRequiredLinkRules = () => [
  { required: true, message: t(TranslationKey['Please input your link!']) },
  {
    pattern: /^(https?|ftp):\/\/(([a-z0-9]+:[a-z0-9]+)@)?([a-z0-9-]+\.)+[a-z\u00a1-\uffff]{2,}(:[0-9]{1,5})?(\/.*)?$/i,
    message: t(TranslationKey['Please enter a valid URL!']),
  },
]

export const getRequiredEmailRules = (): Rule[] => [
  { type: 'email', message: t(TranslationKey['Please enter a valid email!']) },
]

export const getRequiredPhoneNumberRules = (): Rule[] => [
  requiredRule,
  {
    pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\/0-9]*$/g,
    message: t(TranslationKey['Please enter a valid phone number!']),
  },
]
