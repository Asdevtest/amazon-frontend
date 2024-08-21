import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { Dimensions as DimensionsEnum } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'

import { Entities, useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

import { useStyles } from './dimensions-cell.style'

interface DimensionsCellProps {
  data: IBox // if need other data - replace "IBox" to "any" or use combine types
  calculationField?: Entities
  isTotalWeight?: boolean
  transmittedSizeSetting?: DimensionsEnum
}

export const DimensionsCell: FC<DimensionsCellProps> = memo(props => {
  const { data, calculationField = Entities.WAREHOUSE, isTotalWeight, transmittedSizeSetting } = props

  const { classes: styles, cx } = useStyles()
  const { length, width, height, weight, volumeWeight, finalWeight, totalWeight } = useShowDimensions({
    data,
    sizeSetting: transmittedSizeSetting || DimensionsEnum.EU,
    calculationField,
  })

  const isLessWeight = isTotalWeight && Number(finalWeight) < Number(totalWeight)

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.option}>
          <p>{t(TranslationKey.Length)}</p>
          <p>{length}</p>
        </div>

        <div className={styles.option}>
          <p>{t(TranslationKey.Width)}</p>
          <p>{width}</p>
        </div>

        <div className={styles.option}>
          <p>{t(TranslationKey.Height)}</p>
          <p>{height}</p>
        </div>
      </div>

      <div>
        <div className={styles.option}>
          <p>{t(TranslationKey.Weight)}</p>
          <p>{weight}</p>
        </div>

        <div className={styles.option}>
          <p>{t(TranslationKey.Volume)}</p>
          <p>{volumeWeight}</p>
        </div>

        <div className={styles.option}>
          <p>{t(TranslationKey.Final)}</p>
          <p>{1000}</p>
        </div>
      </div>
    </div>
  )
})
