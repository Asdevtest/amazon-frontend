import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-select.style'

export interface CustomSelectProps extends SelectProps, IDefaultPropsExtensionAntdComponent {}

export const CustomSelect: FC<CustomSelectProps> = memo(props => {
  const { isRow, isCell, label, required, placeholder, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`
  const placeholderText = placeholder ? t(TranslationKey[placeholder as TranslationKey]) : ''

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? <p className={cx(styles.label, labelClassName)}>{labelText}</p> : null}
      <Select {...restProps} placeholder={placeholderText} />
    </div>
  )
})
