import { Input, InputProps } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-input.style'

const { Password } = Input

interface CustomInputProps extends InputProps, IDefaultPropsExtensionAntdComponent {
  password?: boolean
  fullWidth?: boolean
}

export const CustomInput: FC<CustomInputProps> = memo(props => {
  const {
    password,
    isRow,
    isCell,
    label,
    required,
    placeholder,
    className,
    labelClassName,
    wrapperClassName,
    fullWidth,
    maxLength = 255,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()
  const placeholderText = placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined
  const Component = password ? Password : Input

  return (
    <div
      className={cx(
        styles.root,
        { [styles.cell]: isCell, [styles.row]: isRow, [styles.input]: fullWidth },
        wrapperClassName,
      )}
    >
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>*</span> : null}
        </p>
      ) : null}
      <Component
        {...restProps}
        title={placeholderText}
        className={cx(styles.input, className)}
        placeholder={placeholderText}
        maxLength={maxLength}
      />
    </div>
  )
})
