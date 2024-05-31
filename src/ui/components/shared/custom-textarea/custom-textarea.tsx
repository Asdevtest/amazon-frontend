import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-textarea.style'

const { TextArea } = Input

interface CustomTextareaProps extends TextAreaProps {
  row?: boolean
  cell?: boolean
  label?: string
  resize?: boolean
  placeholder?: string
  className?: string
  labelClassName?: string
  wrapperClassName?: string
}

export const CustomTextarea: FC<CustomTextareaProps> = memo(props => {
  const { row, cell, label, resize, placeholder, className, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: cell, [styles.row]: row }, wrapperClassName)}>
      {label && <p className={cx(styles.label, labelClassName)}>{t(TranslationKey[label as TranslationKey])}</p>}
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
