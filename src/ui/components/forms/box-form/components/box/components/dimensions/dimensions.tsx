import { FC, memo, useState } from 'react'

import {
  getConversion,
  getDimensionsSizesType,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './dimensions.style'

interface DimensionsProps {
  formFields: IBox
  volumeWeightCoefficient: number
}

export const Dimensions: FC<DimensionsProps> = memo(props => {
  const { formFields, volumeWeightCoefficient } = props

  const { classes: styles, cx } = useStyles()
  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
  const weightSizesType = getWeightSizesType(sizeSetting)
  const dimensionsSizesType = getDimensionsSizesType(sizeSetting)
  const finalWeightForBox = calcFinalWeightForBox(formFields, volumeWeightCoefficient)

  return (
    <div className={styles.wrapper}>
      <div className={styles.switcherWrapper}>
        <p className={cx(styles.text, styles.textSecond)}>{t(TranslationKey['Sizes from storekeeper'])}</p>
        <CustomSwitcher
          condition={sizeSetting}
          switcherSettings={[
            { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
            { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
          ]}
          changeConditionHandler={condition => setSizeSetting(condition as string)}
        />
      </div>

      <p className={styles.text}>
        {t(TranslationKey.Length) + ': '}
        {toFixed(formFields?.lengthCmWarehouse / lengthConversion, 2)}
        {' ' + dimensionsSizesType}
      </p>
      <p className={styles.text}>
        {t(TranslationKey.Width) + ': '}
        {toFixed(formFields?.widthCmWarehouse / lengthConversion, 2)}
        {' ' + dimensionsSizesType}
      </p>
      <p className={styles.text}>
        {t(TranslationKey.Height) + ': '}
        {toFixed(formFields?.heightCmWarehouse / lengthConversion, 2)}
        {' ' + dimensionsSizesType}
      </p>
      <p className={styles.text}>
        {t(TranslationKey.Weight) + ': '}
        {toFixed(formFields?.weighGrossKgWarehouse / weightConversion, 2)}
        {' ' + weightSizesType}
      </p>
      <p className={styles.text}>
        {t(TranslationKey['Volume weight']) + ': '}
        {toFixed(calcVolumeWeightForBox(formFields, volumeWeightCoefficient) / weightConversion, 2)}
        {' ' + weightSizesType}
      </p>
      <p className={cx(styles.text, styles.twoLines)}>
        {t(TranslationKey['Final weight']) + ': '}
        {`${toFixed(finalWeightForBox / weightConversion, 2)} ${weightSizesType} `}
        <span className={styles.textAlert}>
          {finalWeightForBox / weightConversion < totalWeightConversion
            ? `< ${toFixed(totalWeightConversion, 2)} ${weightSizesType}`
            : ''}
        </span>
      </p>
    </div>
  )
})
