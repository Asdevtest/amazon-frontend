import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getRequiredRules = () => [{ required: true, message: t(TranslationKey['Fill in the field']) }]