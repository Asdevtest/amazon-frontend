import { ChangeEvent, FC, KeyboardEvent, memo, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'

import { IDimensions } from '@hooks/dimensions/use-change-dimensions'

import { useStyles } from './warehouse-dimensions.style'

import { exceptThisSymbols } from './warehouse-dimensions.constants'

interface WarehouseDimensionsProps {
  dimensions: IDimensions
  sizeSetting: Dimensions
  onChangeDimensions: (fieldName: string) => (value: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const WarehouseDimensions: FC<WarehouseDimensionsProps> = memo(props => {
  const { dimensions, sizeSetting, onChangeDimensions, disabled } = props

  const { classes: styles } = useStyles()

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => exceptThisSymbols.includes(e.key) && e.preventDefault()

  const isNormalLength = useMemo(
    () =>
      maxBoxSizeFromOption(sizeSetting, Number(dimensions.lengthCmWarehouse)) ||
      Number(dimensions.lengthCmWarehouse) === 0,
    [dimensions.lengthCmWarehouse],
  )
  const isNormalWidth = useMemo(
    () =>
      maxBoxSizeFromOption(sizeSetting, Number(dimensions.widthCmWarehouse)) ||
      Number(dimensions.widthCmWarehouse) === 0,
    [dimensions.widthCmWarehouse],
  )
  const isNormalHeight = useMemo(
    () =>
      maxBoxSizeFromOption(sizeSetting, Number(dimensions.heightCmWarehouse)) ||
      Number(dimensions.heightCmWarehouse) === 0,
    [dimensions.heightCmWarehouse],
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <Field
          disabled={disabled}
          error={isNormalLength}
          containerClasses={styles.fieldContainer}
          labelClasses={styles.label}
          label={t(TranslationKey.Length) + ': '}
          value={String(dimensions.lengthCmWarehouse)}
          onChange={onChangeDimensions('lengthCmWarehouse')}
          onKeyDown={handleKeyDown}
        />

        <Field
          disabled={disabled}
          error={isNormalWidth}
          containerClasses={styles.fieldContainer}
          labelClasses={styles.label}
          label={t(TranslationKey.Width) + ': '}
          value={String(dimensions.widthCmWarehouse)}
          onChange={onChangeDimensions('widthCmWarehouse')}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.flexContainer}>
        <Field
          disabled={disabled}
          error={isNormalHeight}
          labelClasses={styles.label}
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey.Height) + ': '}
          value={String(dimensions.heightCmWarehouse)}
          onChange={onChangeDimensions('heightCmWarehouse')}
          onKeyDown={handleKeyDown}
        />

        <Field
          disabled={disabled}
          error={Number(dimensions.weighGrossKgWarehouse) === 0}
          containerClasses={styles.fieldContainer}
          labelClasses={styles.label}
          label={t(TranslationKey.Weight) + ': '}
          value={String(dimensions.weighGrossKgWarehouse)}
          onChange={onChangeDimensions('weighGrossKgWarehouse')}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.flexContainer}>
        <Field
          disabled
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Volume weight']) + ': '}
          labelClasses={styles.label}
          value={String(dimensions.volumeWeight)}
        />

        <Field
          disabled
          containerClasses={styles.fieldContainer}
          label={t(TranslationKey['Final weight']) + ': '}
          labelClasses={styles.label}
          value={String(dimensions.finalWeight)}
        />
      </div>
    </div>
  )
})
