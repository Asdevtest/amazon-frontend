import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const rangePresets = (): RangePickerProps['presets'] => [
  { label: t(TranslationKey.Yesterday), value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
  { label: t(TranslationKey.Today), value: [dayjs(), dayjs()] },
  { label: t(TranslationKey.Tomorrow), value: [dayjs().add(1, 'day'), dayjs().add(1, 'day')] },
  { label: t(TranslationKey['This week']), value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: t(TranslationKey['This month']), value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: t(TranslationKey['Last 30 Days']), value: [dayjs().add(-30, 'd'), dayjs()] },
]
