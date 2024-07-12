import { Input, InputProps } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-input.styles'

interface CustomInputProps extends InputProps, IDefaultPropsExtensionAntdComponent {}

export const CustomInput: FC<CustomInputProps> = memo(props => {
  const { label, placeholder, required, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>{'*'}</span> : null}
        </p>
      ) : null}
      <Input
        {...restProps}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
        onKeyDown={event => event.stopPropagation()}
      />
    </div>
  )
})
