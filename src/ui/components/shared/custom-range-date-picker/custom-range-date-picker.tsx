import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-range-date-picker.style'

import { rangePresets } from './custom-range-date-picker.config'

const { RangePicker } = DatePicker

interface CustomRangeDatePickerProps extends RangePickerProps {
  row?: boolean
  cell?: boolean
  label?: string
  className?: string
  labelClassName?: string
  wrapperClassName?: string
}

export const CustomRangeDatePicker: FC<CustomRangeDatePickerProps> = memo(props => {
  const { row, cell, label, className, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: cell, [styles.row]: row }, wrapperClassName)}>
      {label && <p className={cx(styles.label, labelClassName)}>{t(TranslationKey[label as TranslationKey])}</p>}
      <RangePicker presets={rangePresets} {...restProps} className={cx(styles.datePicker, className)} />
    </div>
  )
})
