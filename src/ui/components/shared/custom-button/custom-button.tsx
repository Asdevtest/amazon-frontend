import { Button, ButtonProps } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-button.style'

interface CustomButtonProps extends ButtonProps {
  isCell?: boolean
  wrapperClassName?: string
}

export const CustomButton: FC<CustomButtonProps> = memo(props => {
  const { isCell, icon, className, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell }, wrapperClassName)}>
      <Button {...restProps} icon={icon} className={cx({ [styles.iconButton]: !!icon }, className)} />
    </div>
  )
})
