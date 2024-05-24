import { ElementType, FC, ReactNode, memo } from 'react'
import { SelectPicker, SelectPickerProps } from 'rsuite'

import { useStyles } from './custom-select-picker.style'

interface CustomSelectPickerProps extends Omit<SelectPickerProps<string>, 'caretAs' | 'label' | 'loading'> {
  caretAs?: ElementType
  loading?: boolean
  label?: ReactNode
  wrapperClassName?: string
  selectClassName?: string
}

export const CustomSelectPicker: FC<CustomSelectPickerProps> = memo(props => {
  const { caretAs, label, loading, wrapperClassName, selectClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, wrapperClassName)}>
      <SelectPicker
        {...restProps}
        caretAs={caretAs}
        label={label}
        loading={loading}
        className={cx(styles.select, selectClassName)}
      />
    </div>
  )
})
