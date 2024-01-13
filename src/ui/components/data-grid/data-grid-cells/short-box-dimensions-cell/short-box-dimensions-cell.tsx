/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './short-box-dimensions-cell.style'

interface ShortBoxDimensionsCellProps {
  box: any
  volumeWeightCoefficient: number
  unitsOption: string
}

export const ShortBoxDimensionsCell: FC<ShortBoxDimensionsCellProps> = memo(
  ({ box, volumeWeightCoefficient, unitsOption }) => {
    const { classes: styles, cx } = useStyles()
    const finalWeight = calcFinalWeightForBox(box, volumeWeightCoefficient)

    const lengthConversion = getConversion(unitsOption, inchesCoefficient)
    const weightConversion = getConversion(unitsOption, poundsWeightCoefficient)
    const totalWeightConversion = getConversion(unitsOption, 12 / poundsWeightCoefficient, 12)
    const weightSizesType = getWeightSizesType(unitsOption)

    return (
      <div className={styles.shortBoxDimensionsWrapper}>
        <p className={styles.shortBoxDimensionsText}>{`${toFixed(
          box.lengthCmWarehouse / lengthConversion,
          2,
        )}x${toFixed(box.widthCmWarehouse / lengthConversion, 2)}x${toFixed(
          box.heightCmWarehouse / lengthConversion,
          2,
        )}`}</p>

        <p className={styles.shortBoxDimensionsText}>{`${t(TranslationKey.Weight)}: ${toFixed(
          box.weighGrossKgWarehouse / weightConversion,
          2,
        )} ${weightSizesType}`}</p>

        <p className={styles.shortBoxDimensionsText}>{`${t(TranslationKey['Volume weight'])}: ${toFixed(
          calcVolumeWeightForBox(box, volumeWeightCoefficient) / weightConversion,
          2,
        )} ${weightSizesType}`}</p>

        <p
          className={cx(styles.shortBoxDimensionsText, {
            [styles.alertText]: !box.isDraft && finalWeight / weightConversion < totalWeightConversion,
          })}
        >{`${t(TranslationKey['Final weight'])}: ${toFixed(finalWeight / weightConversion, 2)} ${weightSizesType}!`}</p>

        {!box.isDraft && finalWeight / weightConversion < totalWeightConversion && (
          <span className={styles.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
            totalWeightConversion,
            2,
          )} ${weightSizesType}!`}</span>
        )}

        {box.amount > 1 && (
          <p className={styles.shortBoxDimensionsText}>{`${t(TranslationKey['Total final weight'])}: ${toFixed(
            (calcFinalWeightForBox(box, volumeWeightCoefficient) / weightConversion) * box.amount,
            2,
          )} ${weightSizesType}`}</p>
        )}
      </div>
    )
  },
)
