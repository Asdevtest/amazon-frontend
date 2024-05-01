import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'

import { IFormattedDimensions } from '@hooks/dimensions/use-change-dimensions'

import { useStyles } from './warehouse-dimensions.style'

interface WarehouseDimensionsProps {
  dimensions: IFormattedDimensions
  sizeSetting: Dimensions
  onChangeDimensions: (fieldName: string) => (value: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const WarehouseDimensions: FC<WarehouseDimensionsProps> = memo(props => {
  const { dimensions, sizeSetting, onChangeDimensions, disabled } = props

  const { classes: styles } = useStyles()

  const isNormalLength = maxBoxSizeFromOption(sizeSetting, Number(dimensions.length))
  const isNormalWidth = maxBoxSizeFromOption(sizeSetting, Number(dimensions.width))
  const isNormalHeight = maxBoxSizeFromOption(sizeSetting, Number(dimensions.height))

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <Field
          disabled={disabled}
          inputProps={{ maxLength: 6 }}
          error={isNormalLength}
          containerClasses={styles.fieldContainer}
          labelClasses={styles.label}
          label={t(TranslationKey.Length) + ': '}
          value={dimensions.length}
          onChange={onChangeDimensions('length')}
        />

        <Field
          disabled={disabled}
          inputProps={{ maxLength: 6 }}
          error={isNormalWidth}
          containerClasses={styles.fieldContainer}
          labelClasses={styles.label}
          label={t(TranslationKey.Width) + ': '}
          value={dimensions.width}
          onChange={onChangeDimensions('width')}
        />
      </div>
      <div className={styles.flexContainer}>
        <Field
          disabled={disabled}
          inputProps={{ maxLength: 6 }}
          error={isNormalHeight}
          labelClasses={styles.label}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey.Height) + ': '}
          value={dimensions.height}
          onChange={onChangeDimensions('height')}
        />

        <Field
          disabled={disabled}
          inputProps={{ maxLength: 6 }}
          error={Number(dimensions.weight) === 0}
          containerClasses={styles.fieldContainer}
          labelClasses={styles.label}
          label={t(TranslationKey.Weight) + ': '}
          value={dimensions.weight}
          onChange={onChangeDimensions('weight')}
        />
      </div>
      <div className={styles.flexContainer}>
        <Field
          disabled
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Volume weight']) + ': '}
          labelClasses={styles.label}
          value={dimensions.volumeWeight}
        />

        <Field
          disabled
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Final weight']) + ': '}
          labelClasses={styles.label}
          value={dimensions.finalWeight}
        />
      </div>
    </div>
  )
})
