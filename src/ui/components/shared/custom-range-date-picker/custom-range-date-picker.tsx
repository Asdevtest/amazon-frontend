import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-range-date-picker.style'

import { rangePresets } from './custom-range-date-picker.config'

const { RangePicker } = DatePicker

interface CustomRangeDatePickerProps extends RangePickerProps, IDefaultPropsExtensionAntdComponent {
  required?: boolean
}

export const CustomRangeDatePicker: FC<CustomRangeDatePickerProps> = memo(props => {
  const { isRow, isCell, label, required, className, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          <span>{required && '*'}</span>
        </p>
      ) : null}
      <RangePicker allowClear presets={rangePresets} {...restProps} className={cx(styles.datePicker, className)} />
    </div>
  )
})
