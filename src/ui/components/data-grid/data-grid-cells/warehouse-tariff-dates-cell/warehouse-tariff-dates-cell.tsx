import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { formatDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './warehouse-tariff-dates-cell.style'

interface WarehouseTariffDatesCellProps {
  cls?: string
  etd?: string
  eta?: string
}

export const WarehouseTariffDatesCell: FC<WarehouseTariffDatesCellProps> = memo(({ cls, etd, eta }) => {
  const { classes: styles } = useStyles()

  return (
    <div>
      <div className={styles.warehouseTariffDatesItem}>
        <p>{t(TranslationKey['CLS (batch closing date)'])}</p>
        <p>{!cls ? '-' : formatDateWithoutTime(cls)}</p>
      </div>

      <div className={styles.warehouseTariffDatesItem}>
        <p>{t(TranslationKey['ETD (date of shipment)'])}</p>
        <p>{!etd ? '-' : formatDateWithoutTime(etd)}</p>
      </div>
      <div className={styles.warehouseTariffDatesItem}>
        <p>{t(TranslationKey['ETA (arrival date)'])}</p>
        <p>{!eta ? '-' : formatDateWithoutTime(eta)}</p>
      </div>
    </div>
  )
})
