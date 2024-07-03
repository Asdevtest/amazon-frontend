import { cx } from '@emotion/css'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import classes from './CustomTextarea.module.scss'

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

  return (
    <div className={cx(classes.root, { [classes.cell]: isCell, [classes.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(classes.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>{'*'}</span> : null}
        </p>
      ) : null}
      <TextArea
        {...restProps}
        className={cx(classes.textarea, className)}
        style={{ resize: resize ? 'vertical' : 'none' }}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
        onKeyDown={event => event.stopPropagation()}
      />
    </div>
  )
})
