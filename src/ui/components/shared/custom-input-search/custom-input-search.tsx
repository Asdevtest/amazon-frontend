import type { SearchProps } from 'antd/es/input/Search'
import Search from 'antd/es/input/Search'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-input-search.style'

interface CustomInputSearchProps extends SearchProps, IDefaultPropsExtensionAntdComponent {}

export const CustomInputSearch: FC<CustomInputSearchProps> = memo(props => {
  const {
    isRow,
    isCell,
    label,
    required,
    placeholder,
    className,
    labelClassName,
    wrapperClassName,
    fullWidth,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  const placeholderText = placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined
  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`

  return (
    <div
      className={cx(
        styles.root,
        { [styles.cell]: isCell, [styles.row]: isRow, [styles.fullWidth]: fullWidth },
        wrapperClassName,
      )}
    >
      {label ? <p className={cx(styles.label, labelClassName)}>{labelText}</p> : null}
      <Search
        {...restProps}
        title={placeholderText}
        className={cx(styles.fullWidth, className)}
        placeholder={placeholderText}
      />
    </div>
  )
})
