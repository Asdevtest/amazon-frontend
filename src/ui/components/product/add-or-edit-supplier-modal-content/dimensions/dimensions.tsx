import { ChangeEvent, FC, memo } from 'react'

import { getDimensionsSizesType, getWeightSizesType } from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useStyles } from './dimensions.style'

import { switcherSettings } from './switcher-settings'

interface DimensionsProps {
  title: string
  onlyRead: boolean
  sizeMode: string
  height: string
  width: string
  length: string
  grossWeigh: string
  optionalWeight: string
  optionalWeightTitle: string
  onChangeSizeMode: (condition: string) => void
  onChangeHeight: (value: ChangeEvent<HTMLInputElement>) => void
  onChangeWidth: (value: ChangeEvent<HTMLInputElement>) => void
  onChangeLength: (value: ChangeEvent<HTMLInputElement>) => void
  onChangeWeighGross: (value: ChangeEvent<HTMLInputElement>) => void
  weighUnit?: boolean
  errorHeight?: boolean
  errorWidth?: boolean
  errorLength?: boolean
}

export const Dimensions: FC<DimensionsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    title,
    onlyRead,
    sizeMode,
    height,
    width,
    length,
    grossWeigh,
    optionalWeight,
    optionalWeightTitle,
    onChangeSizeMode,
    onChangeHeight,
    onChangeWidth,
    onChangeLength,
    onChangeWeighGross,
    weighUnit,
    errorHeight = false,
    errorWidth = false,
    errorLength = false,
  } = props

  const linearUnits = getDimensionsSizesType(sizeMode)
  const weightUnits = getWeightSizesType(sizeMode)

  return (
    <div className={styles.sizesWrapper}>
      <div className={styles.dimensionsWrapper}>
        <div className={styles.sizesSubWrapper}>
          <p className={styles.standartText}>{title}</p>

          <CustomRadioButton
            size="small"
            options={switcherSettings}
            value={sizeMode}
            onChange={e => onChangeSizeMode(e.target.value)}
          />
        </div>

        <div className={styles.sizesBottomWrapper}>
          <Field
            disabled={onlyRead}
            error={errorHeight}
            label={`${t(TranslationKey.Height)}, ${linearUnits}`}
            inputProps={{ maxLength: 6 }}
            containerClasses={styles.sizeContainer}
            labelClasses={cx(styles.rateLabel)}
            inputClasses={styles.sizeInput}
            value={height}
            onChange={onChangeHeight}
          />

          <Field
            disabled={onlyRead}
            error={errorWidth}
            label={`${t(TranslationKey.Width)}, ${linearUnits}`}
            inputProps={{ maxLength: 6 }}
            containerClasses={styles.sizeContainer}
            labelClasses={cx(styles.rateLabel)}
            inputClasses={styles.sizeInput}
            value={width}
            onChange={onChangeWidth}
          />

          <Field
            disabled={onlyRead}
            error={errorLength}
            label={`${t(TranslationKey.Length)}, ${linearUnits}`}
            inputProps={{ maxLength: 6 }}
            containerClasses={styles.sizeContainer}
            labelClasses={cx(styles.rateLabel)}
            inputClasses={styles.sizeInput}
            value={length}
            onChange={onChangeLength}
          />
        </div>
      </div>

      <div className={styles.sizesRightWrapper}>
        <Field
          disabled
          label={weighUnit ? `${optionalWeightTitle}, ${weightUnits}` : optionalWeightTitle}
          inputProps={{ maxLength: 10 }}
          containerClasses={styles.shortContainer}
          labelClasses={styles.normalLabel}
          value={optionalWeight}
        />

        <Field
          disabled={onlyRead}
          label={weighUnit ? `${t(TranslationKey.Weight)}, ${weightUnits}` : t(TranslationKey['Weight, kg'])}
          inputProps={{ maxLength: 10 }}
          containerClasses={styles.shortContainer}
          labelClasses={styles.normalLabel}
          value={grossWeigh}
          onChange={onChangeWeighGross}
        />
      </div>
    </div>
  )
})
