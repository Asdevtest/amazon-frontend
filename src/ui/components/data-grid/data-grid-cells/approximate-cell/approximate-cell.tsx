import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './approximate-cell.style'

import { MultilineTextCell } from '../multiline-text-cell/multiline-text-cell'

interface CustomDestinationsCellProps {
  destinations: any
  field: any
}

export const ApproximateCell: FC<CustomDestinationsCellProps> = memo(({ destinations, field }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {destinations.map((destination, index) => (
        <div key={index} className={styles.destination}>
          <MultilineTextCell
            text={
              field === 'destinationName'
                ? destination?.destination?.name
                : field === 'weight'
                ? `${t(TranslationKey.From)} ${destination.minWeight} ${t(TranslationKey.To)} ${
                    destination.maxWeight
                  } kg`
                : field === 'costUnitWithDeliveryToUsa'
                ? toFixed(destination?.destination?.costUnitWithDeliveryToUsa, 2)
                : field === 'roi'
                ? toFixed(destination?.destination?.roi, 2)
                : destination[field]
            }
          />
        </div>
      ))}
    </div>
  )
})
