import { Input } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-input-search.style'

const { Search } = Input

interface CustomInputSearchProps extends SearchProps, IDefaultPropsExtensionAntdComponent {
  required?: boolean
  placeholder?: string
}

export const CustomInputSearch: FC<CustomInputSearchProps> = memo(props => {
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
      <Search
        {...restProps}
        title={placeholderText}
        className={cx(styles.input, className)}
        placeholder={placeholderText}
      />
    </div>
  )
})
