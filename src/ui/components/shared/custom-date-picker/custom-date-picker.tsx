import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-date-picker.style'

interface CustomDatePickerProps extends DatePickerProps, IDefaultPropsExtensionAntdComponent {}

export const CustomDatePicker: FC<CustomDatePickerProps> = memo(props => {
  const { isRow, isCell, label, required, className, labelClassName, wrapperClassName, fullWidth, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`

  return (
    <div
      className={cx(
        styles.root,
        { [styles.cell]: isCell, [styles.row]: isRow, [styles.fullWidth]: fullWidth },
        wrapperClassName,
      )}
    >
      {label ? <p className={cx(styles.label, labelClassName)}>{labelText}</p> : null}
      <DatePicker allowClear showNow={false} {...restProps} className={className} />
    </div>
  )
})
