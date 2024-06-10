import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-textarea.style'

const { TextArea } = Input

interface CustomTextareaProps extends TextAreaProps, IDefaultPropsExtensionAntdComponent {
  resize?: boolean
  required?: boolean
  placeholder?: string
}

export const CustomTextarea: FC<CustomTextareaProps> = memo(props => {
  const {
    isRow,
    isCell,
    label,
    resize,
    required,
    placeholder,
    className,
    labelClassName,
    wrapperClassName,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          <span>{required && '*'}</span>
        </p>
      ) : null}
      <TextArea
        {...restProps}
        className={cx(styles.textarea, className)}
        style={{ resize: resize ? 'vertical' : 'none' }}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
        onKeyDown={event => event.stopPropagation()}
      />
    </div>
  )
})
