import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { calcVolumeWeightForBoxWithoutAmount } from '@utils/calculation'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './warehouse-demensions.style'

interface WarehouseDemensionsProps {
  orderBox: IBox
  volumeWeightCoefficient: number
  setFormField: (fieldName: string) => (value: ChangeEvent<HTMLInputElement>) => void
  sizeSetting: string
}

export const WarehouseDemensions: FC<WarehouseDemensionsProps> = memo(
  ({ orderBox, volumeWeightCoefficient, setFormField, sizeSetting }) => {
    const { classes: styles } = useStyles()

    const isNormalLength =
      !Number(orderBox.lengthCmWarehouse) || maxBoxSizeFromOption(sizeSetting, orderBox.lengthCmWarehouse)

    const isNormalWidth =
      !Number(orderBox.widthCmWarehouse) || maxBoxSizeFromOption(sizeSetting, orderBox.widthCmWarehouse)

    const isNormalHeight =
      !Number(orderBox.heightCmWarehouse) || maxBoxSizeFromOption(sizeSetting, orderBox.heightCmWarehouse)

    return (
      <div className={styles.numberInputFieldsBlocksWrapper}>
        <div className={styles.numberInputFieldsWrapper}>
          <Field
            inputProps={{ maxLength: 6 }}
            error={isNormalLength}
            containerClasses={styles.numberInputField}
            labelClasses={styles.label}
            label={t(TranslationKey.Length) + ': '}
            value={orderBox.lengthCmWarehouse}
            onChange={setFormField('lengthCmWarehouse')}
          />

          <Field
            inputProps={{ maxLength: 6 }}
            error={isNormalWidth}
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
            error={isNormalHeight}
            labelClasses={styles.label}
            containerClasses={styles.numberInputField}
            label={t(TranslationKey.Height) + ': '}
            value={orderBox.heightCmWarehouse}
            onChange={setFormField('heightCmWarehouse')}
          />

          <Field
            inputProps={{ maxLength: 6 }}
            error={Number(orderBox.weighGrossKgWarehouse) === 0}
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
