import { AutoComplete, AutoCompleteProps } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-autocomplete.style'

interface CustomAutoCompleteProps extends AutoCompleteProps, IDefaultPropsExtensionAntdComponent {}

export const CustomAutoComplete: FC<CustomAutoCompleteProps> = memo(props => {
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
    options = [],
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()
  const placeholderText = placeholder
    ? `${t(TranslationKey[placeholder as TranslationKey])}${required ? '*' : ''}`
    : undefined
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
      <AutoComplete {...restProps} options={options} placeholder={placeholderText} />
    </div>
  )
})
