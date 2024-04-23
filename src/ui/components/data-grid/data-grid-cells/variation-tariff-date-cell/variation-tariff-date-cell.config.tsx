import { TranslationKey } from '@constants/translations/translation-key'

import { ClsIcon, EtaIcon, EtdIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

export const cellConfig = [
  {
    param: 'cls',
    icon: <ClsIcon />,
    tooltipText: t(TranslationKey['CLS (batch closing date)']),
  },
  {
    param: 'eta',
    icon: <EtaIcon />,
    tooltipText: t(TranslationKey['ETA (arrival date)']),
  },
  {
    param: 'etd',
    icon: <EtdIcon />,
    tooltipText: t(TranslationKey['ETD (date of shipment)']),
  },
]
