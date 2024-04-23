import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'

import { useStyles } from './warehouse-dimensions.style'

interface WarehouseDimensionsProps {
  length: number
  width: number
  height: number
  weight: number
  volumeWeight: number
  finalWeight: number
  sizeSetting: Dimensions
  setFormField: (fieldName: string) => (value: ChangeEvent<HTMLInputElement>) => void
}

export const WarehouseDimensions: FC<WarehouseDimensionsProps> = memo(props => {
  const { length, width, height, weight, volumeWeight, finalWeight, setFormField, sizeSetting } = props

  const { classes: styles } = useStyles()

  const isNormalLength = !Number(length) || maxBoxSizeFromOption(sizeSetting, length)
  const isNormalWidth = !Number(width) || maxBoxSizeFromOption(sizeSetting, width)
  const isNormalHeight = !Number(height) || maxBoxSizeFromOption(sizeSetting, height)

  return (
    <div className={styles.numberInputFieldsBlocksWrapper}>
      <div className={styles.numberInputFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 6 }}
          error={isNormalLength}
          containerClasses={styles.numberInputField}
          labelClasses={styles.label}
          label={t(TranslationKey.Length) + ': '}
          value={length}
          onChange={setFormField('lengthCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={isNormalWidth}
          containerClasses={styles.numberInputField}
          labelClasses={styles.label}
          label={t(TranslationKey.Width) + ': '}
          value={width}
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
          value={height}
          onChange={setFormField('heightCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(weight) === 0}
          containerClasses={styles.numberInputField}
          labelClasses={styles.label}
          label={t(TranslationKey.Weight) + ': '}
          value={weight}
          onChange={setFormField('weighGrossKgWarehouse')}
        />
      </div>
      <div className={styles.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={styles.numberInputField}
          label={t(TranslationKey['Volume weight']) + ': '}
          labelClasses={styles.label}
          value={volumeWeight}
        />

        <Field
          disabled
          containerClasses={styles.numberInputField}
          label={t(TranslationKey['Final weight']) + ': '}
          labelClasses={styles.label}
          value={finalWeight}
        />
      </div>
    </div>
  )
})
