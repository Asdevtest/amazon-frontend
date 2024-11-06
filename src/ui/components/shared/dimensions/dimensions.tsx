import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Dimensions as DimensionsEnum } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'

import { Entities, useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

import { useStyles } from './dimensions.style'

import { SizeSwitcher } from '../size-switcher'

interface DimensionsProps {
  data?: IBox // if need other data - replace "IBox" to "any" or use combine types
  calculationField?: Entities
  title?: string
  isCell?: boolean
  isTotalWeight?: boolean
  transmittedSizeSetting?: DimensionsEnum
}

export const Dimensions: FC<DimensionsProps> = memo(props => {
  const { data, calculationField = Entities.WAREHOUSE, title, isCell, isTotalWeight, transmittedSizeSetting } = props

  if (!data) {
    return null
  }

  const { classes: styles, cx } = useStyles()
  const [sizeSetting, setSizeSetting] = useState(DimensionsEnum.EU)
  const { length, width, height, weight, volumeWeight, finalWeight, totalWeight, dimensionsSize, unitsSize } =
    useShowDimensions({
      data,
      sizeSetting: transmittedSizeSetting || sizeSetting,
      calculationField,
    })

  const isLessWeight = isTotalWeight && Number(finalWeight) < Number(totalWeight)

  return (
    <div className={cx(styles.wrapper, { [styles.isCell]: isCell })}>
      {!transmittedSizeSetting ? (
        <div className={styles.switcher}>
          <p className={cx(styles.text, styles.textSecond)}>{title || t(TranslationKey.Dimensions)}</p>

          <SizeSwitcher<DimensionsEnum> condition={sizeSetting} onChangeCondition={setSizeSetting} />
        </div>
      ) : null}

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
