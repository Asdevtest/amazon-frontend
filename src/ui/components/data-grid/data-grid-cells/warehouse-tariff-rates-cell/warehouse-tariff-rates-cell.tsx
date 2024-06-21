/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { roundHalf } from '@utils/calculation'
import { toFixed } from '@utils/text'

import { useStyles } from './warehouse-tariff-rates-cell.style'

interface WarehouseTariffRatesCellProps {
  conditionsByRegion: any
  inYuans: boolean
}

export const WarehouseTariffRatesCell: FC<WarehouseTariffRatesCellProps> = memo(({ conditionsByRegion, inYuans }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.tariffRatesWrapper}>
      <p>
        {toFixed(
          inYuans
            ? roundHalf(conditionsByRegion.west.rate * conditionsByRegion.yuanToDollarRate)
            : conditionsByRegion.west.rate,
          2,
        ) || '-'}
      </p>
      <p>
        {toFixed(
          inYuans
            ? roundHalf(conditionsByRegion.central.rate * conditionsByRegion.yuanToDollarRate)
            : conditionsByRegion.central.rate,
          2,
        ) || '-'}
      </p>
      <p>
        {toFixed(
          inYuans
            ? roundHalf(conditionsByRegion.east.rate * conditionsByRegion.yuanToDollarRate)
            : conditionsByRegion.east.rate,
          2,
        ) || '-'}
      </p>
    </div>
  )
})
