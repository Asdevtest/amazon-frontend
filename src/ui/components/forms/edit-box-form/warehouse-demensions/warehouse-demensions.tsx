import { FC } from 'react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IOrderBox } from '@typings/order-box'

import { useClassNames } from './warehouse-demensions.style'

interface WarehouseDemensionsProps {
  orderBox: IOrderBox
  sizeSetting: string
}

export const WarehouseDemensions: FC<WarehouseDemensionsProps> = ({ orderBox, sizeSetting }) => {
  const { classes: classNames, cx } = useClassNames()

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
  const weightSizesType = getWeightSizesType(sizeSetting)

  return (
    <>
      <p className={classNames.standartText}>
        {t(TranslationKey.Length) + ': '}

        {toFixed(orderBox.lengthCmWarehouse / lengthConversion, 2)}
      </p>
      <p className={classNames.standartText}>
        {t(TranslationKey.Width) + ': '}
        {toFixed(orderBox.widthCmWarehouse / lengthConversion, 2)}
      </p>
      <p className={classNames.standartText}>
        {t(TranslationKey.Height) + ': '}
        {toFixed(orderBox.heightCmWarehouse / lengthConversion, 2)}
      </p>

      <p className={classNames.standartText}>
        {t(TranslationKey.Weight) + ': '}
        {toFixed(orderBox.weighGrossKgWarehouse / weightConversion, 2)}
        {' ' + weightSizesType}
      </p>

      <p className={classNames.standartText}>
        {t(TranslationKey['Volume weight']) + ': '}
        {toFixed(orderBox.volumeWeightKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </p>

      <p
        className={cx(classNames.standartText, {
          [classNames.alertText]: orderBox.weightFinalAccountingKgWarehouse / weightConversion < totalWeightConversion,
        })}
      >
        {t(TranslationKey['Final weight']) + ': '}
        {toFixed(orderBox.weightFinalAccountingKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </p>

      {orderBox.weightFinalAccountingKgWarehouse / weightConversion < totalWeightConversion ? (
        <span className={classNames.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
          totalWeightConversion,
          2,
        )} ${weightSizesType}!`}</span>
      ) : null}
    </>
  )
}
