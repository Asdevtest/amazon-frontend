import React, { ChangeEvent, FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { calcVolumeWeightForBoxWithoutAmount } from '@utils/calculation'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IOrderBox } from '@typings/order-box'

import { useStyles } from './warehouse-demensions.style'

interface WarehouseDemensionsProps {
  orderBox: IOrderBox
  volumeWeightCoefficient: number
  setFormField: (fieldName: string) => (value: ChangeEvent<HTMLInputElement>) => void
  sizeSetting: string
}

export const WarehouseDemensions: FC<WarehouseDemensionsProps> = React.memo(
  ({ orderBox, volumeWeightCoefficient, setFormField, sizeSetting }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.numberInputFieldsBlocksWrapper}>
        <div className={styles.numberInputFieldsWrapper}>
          <Field
            inputProps={{ maxLength: 6 }}
            error={
              (Number(orderBox.lengthCmWarehouse) === 0 && true) ||
              maxBoxSizeFromOption(sizeSetting, orderBox.lengthCmWarehouse)
            }
            containerClasses={styles.numberInputField}
            labelClasses={styles.label}
            label={t(TranslationKey.Length) + ': '}
            value={orderBox.lengthCmWarehouse}
            onChange={setFormField('lengthCmWarehouse')}
          />

          <Field
            inputProps={{ maxLength: 6 }}
            error={
              (Number(orderBox.widthCmWarehouse) === 0 && true) ||
              maxBoxSizeFromOption(sizeSetting, orderBox.widthCmWarehouse)
            }
            containerClasses={styles.numberInputField}
            labelClasses={styles.label}
            label={t(TranslationKey.Width) + ': '}
            value={orderBox.widthCmWarehouse}
            onChange={setFormField('widthCmWarehouse')}
          />
        </div>
        <div className={styles.numberInputFieldsWrapper}>
          <Field
            inputProps={{ maxLength: 6 }}
            error={
              (Number(orderBox.heightCmWarehouse) === 0 && true) ||
              maxBoxSizeFromOption(sizeSetting, orderBox.heightCmWarehouse)
            }
            labelClasses={styles.label}
            containerClasses={styles.numberInputField}
            label={t(TranslationKey.Height) + ': '}
            value={orderBox.heightCmWarehouse}
            onChange={setFormField('heightCmWarehouse')}
          />

          <Field
            inputProps={{ maxLength: 6 }}
            error={Number(orderBox.weighGrossKgWarehouse) === 0 && true}
            containerClasses={styles.numberInputField}
            labelClasses={styles.label}
            label={t(TranslationKey.Weight) + ': '}
            value={toFixed(orderBox.weighGrossKgWarehouse, 2)}
            onChange={setFormField('weighGrossKgWarehouse')}
          />
        </div>
        <div className={styles.numberInputFieldsWrapper}>
          <Field
            disabled
            containerClasses={styles.numberInputField}
            label={t(TranslationKey['Volume weight']) + ': '}
            labelClasses={styles.label}
            value={toFixed(calcVolumeWeightForBoxWithoutAmount(orderBox, volumeWeightCoefficient), 2)}
          />

          <Field
            disabled
            containerClasses={styles.numberInputField}
            label={t(TranslationKey['Final weight']) + ': '}
            labelClasses={styles.label}
            value={toFixed(
              Math.max(
                (orderBox.heightCmWarehouse * orderBox.widthCmWarehouse * orderBox.lengthCmWarehouse) /
                  volumeWeightCoefficient,
                orderBox.weighGrossKgWarehouse,
              ),
              2,
            )}
          />
        </div>
      </div>
    )
  },
)
