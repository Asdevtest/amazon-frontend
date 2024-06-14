import type { CheckboxProps } from 'antd'
import { Checkbox } from 'antd'
import { FC, memo } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-checkbox.style'

interface CustomCheckboxProps extends CheckboxProps, IDefaultPropsExtensionAntdComponent {}

export const CustomCheckbox: FC<CustomCheckboxProps> = memo(props => {
  const { isCell, className, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx({ [styles.cell]: isCell }, wrapperClassName)}>
      <Checkbox {...restProps} className={className} />
    </div>
  )
})
