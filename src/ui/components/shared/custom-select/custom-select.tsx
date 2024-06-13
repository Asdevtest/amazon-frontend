import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-select.style'

interface CustomSelectProps extends Omit<SelectProps, 'options'>, IDefaultPropsExtensionAntdComponent {
  placeholder?: string
  required?: boolean
  options: BaseOptionType[]
}

export const CustomSelect: FC<CustomSelectProps> = memo(props => {
  const { isRow, isCell, label, required, placeholder, className, labelClassName, wrapperClassName, ...restProps } =
    props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>{'*'}</span> : null}
        </p>
      ) : null}
      <Select
        {...restProps}
        className={cx(styles.select, className)}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
      />
    </div>
  )
})
