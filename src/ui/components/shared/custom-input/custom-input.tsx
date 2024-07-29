import { Input, InputProps } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-input.style'

interface CustomInputProps extends InputProps, IDefaultPropsExtensionAntdComponent {}

export const CustomInput: FC<CustomInputProps> = memo(props => {
  const { isRow, isCell, label, required, placeholder, className, labelClassName, wrapperClassName, ...restProps } =
    props

  const { classes: styles, cx } = useStyles()
  const placeholderText = placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>*</span> : null}
        </p>
      ) : null}
      <Input
        {...restProps}
        title={placeholderText}
        className={cx(styles.input, className)}
        placeholder={placeholderText}
      />
    </div>
  )
})
