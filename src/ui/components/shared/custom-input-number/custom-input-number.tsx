import type { InputNumberProps } from 'antd'
import { InputNumber } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-input-number.style'

interface CustomInputNumberProps extends InputNumberProps, IDefaultPropsExtensionAntdComponent {
  required?: boolean
  placeholder?: string
}

export const CustomInputNumber: FC<CustomInputNumberProps> = memo(props => {
  const { isRow, isCell, label, required, placeholder, className, labelClassName, wrapperClassName, ...restProps } =
    props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>*</span> : null}
        </p>
      ) : null}
      <InputNumber
        {...restProps}
        min={0}
        decimalSeparator=","
        controls={false}
        className={cx(styles.input, className)}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
      />
    </div>
  )
})
