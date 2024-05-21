import { TranslationKey } from '@constants/translations/translation-key'

import { ClsIcon, EtaIcon } from '@components/shared/svg-icons'
import { EtdIcon } from '@components/shared/svg-icons/etd-icon'

import { t } from '@utils/translations'

export const cellConfig = [
  {
    param: 'cls',
    icon: <ClsIcon />,
    tooltipText: t(TranslationKey['CLS (batch closing date)']),
  },
  {
    param: 'etd',
    icon: <EtdIcon />,
    tooltipText: t(TranslationKey['ETD (date of shipment)']),
  },
  {
    param: 'eta',
    icon: <EtaIcon />,
    tooltipText: t(TranslationKey['ETA (arrival date)']),
  },
]
