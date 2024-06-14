import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TimeParts } from '@typings/enums/date'

export const DEFAULT_NOTICE_MESSAGE =
  'ВНИМАНИЕ!\nНа сервисе будут проводиться плановые технические работы. Рекомендуем сохранить изменения и завершить работы. Все несохраненные изменения будут потеряны. Приносим извинения за неудобства!'

export const timeToMilliseconds = {
  [TimeParts.DAYS]: 1000 * 60 * 60 * 24,
  [TimeParts.HOURS]: 1000 * 60 * 60,
  [TimeParts.MINUTES]: 1000 * 60,
}

export const getSelectConfig = () =>
  Object.values(TimeParts).map(item => ({
    value: item,
    label: t(TranslationKey[item]),
  }))
