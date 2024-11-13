import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-textarea.style'

interface CustomTextareaProps extends TextAreaProps, IDefaultPropsExtensionAntdComponent {
  resize?: boolean
  placeholder?: string
}

export const CustomTextarea: FC<CustomTextareaProps> = memo(props => {
  const {
    isRow,
    isCell,
    label,
    resize,
    rows = 3,
    required,
    readOnly,
    placeholder,
    className,
    labelClassName,
    wrapperClassName,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  const placeholderText = placeholder
    ? `${t(TranslationKey[placeholder as TranslationKey])}${required ? '*' : ''}`
    : undefined
  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? <p className={cx(styles.label, labelClassName)}>{labelText}</p> : null}
      <Input.TextArea
        {...restProps}
        rows={rows}
        readOnly={readOnly}
        autoSize={readOnly && { maxRows: rows, minRows: 1 }}
        className={cx(className, { [styles.readOnly]: readOnly })}
        style={{ resize: resize ? 'vertical' : 'none' }}
        placeholder={placeholderText}
        onKeyDown={event => event.stopPropagation()}
      />
    </div>
  )
})
