import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Dimensions as DimensionsEnum } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'

import { Entities, useDimensions } from '@hooks/use-dimensions'

import { useStyles } from './dimensions.style'

interface DimensionsProps {
  data: IBox // if need other data - replace "IBox" to "any"
  sizeSetting: DimensionsEnum
  calculationField: Entities
  isCell?: boolean
  isTotalWeight?: boolean
}

export const Dimensions: FC<DimensionsProps> = memo(props => {
  const { data, sizeSetting, calculationField, isCell, isTotalWeight } = props

  const { classes: styles, cx } = useStyles()
  const { length, width, height, weight, volumeWeight, finalWeight, totalWeight, dimensionsSize, unitsSize } =
    useDimensions({
      data,
      sizeSetting,
      calculationField,
    })

  const isLessWeight = isTotalWeight && Number(finalWeight) < Number(totalWeight)

  return (
    <div className={cx(styles.dimensions, { [styles.isCell]: isCell })}>
      <p className={styles.text}>{`${t(TranslationKey.Length)}: ${length} ${dimensionsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey.Width)}: ${width} ${dimensionsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey.Height)}: ${height} ${dimensionsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey.Weight)}: ${weight} ${unitsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey['Volume weight'])}: ${volumeWeight} ${unitsSize}`}</p>
      <p className={cx(styles.text, { [styles.alert]: isLessWeight })}>{`${t(
        TranslationKey['Final weight'],
      )}: ${finalWeight} ${unitsSize}`}</p>
      {isLessWeight ? (
        <p className={cx(styles.text, styles.alert)}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
          totalWeight,
          2,
        )} ${unitsSize}!`}</p>
      ) : null}
    </div>
  )
})
