import { cx } from '@emotion/css'
import { Button, ButtonProps } from 'antd'
import { FC, memo } from 'react'

import classes from './CustomButton.module.scss'

interface CustomButtonProps extends ButtonProps {
  isCell?: boolean
  wrapperClassName?: string
}

export const CustomButton: FC<CustomButtonProps> = memo(props => {
  const { isCell, icon, className, wrapperClassName, ...restProps } = props

  return (
    <div className={cx(classes.root, { [classes.cell]: isCell }, wrapperClassName)}>
      <Button {...restProps} icon={icon} className={cx(classes.button, { [classes.iconButton]: !!icon }, className)} />
    </div>
  )
})
