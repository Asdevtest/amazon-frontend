import { cx } from '@emotion/css'
import type { CheckboxProps } from 'antd'
import { Checkbox } from 'antd'
import { FC, memo } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import classes from './CustomCheckbox.module.scss'

interface CustomCheckboxProps extends CheckboxProps, IDefaultPropsExtensionAntdComponent {}

export const CustomCheckbox: FC<CustomCheckboxProps> = memo(props => {
  const { isCell, className, wrapperClassName, ...restProps } = props

  return (
    <div className={cx({ [classes.cell]: isCell }, wrapperClassName)}>
      <Checkbox {...restProps} className={cx(classes.checkbox, className)} />
    </div>
  )
})
