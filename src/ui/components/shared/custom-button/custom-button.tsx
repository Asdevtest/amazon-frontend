import { Button, ButtonProps, Dropdown } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { FC, MouseEvent, memo } from 'react'

import { useStyles } from './custom-button.style'

interface CustomButtonProps extends ButtonProps {
  isCell?: boolean
  wrapperClassName?: string
  dropdown?: boolean
  menuItems?: ItemType[]
}

export const CustomButton: FC<CustomButtonProps> = memo(props => {
  const { isCell, icon, className, wrapperClassName, dropdown, children, menuItems, onClick, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClick?.(e)
  }

  const showDropdownButton = dropdown && !icon

  return (
    <div className={cx(styles.root, wrapperClassName)}>
      {showDropdownButton ? (
        <Dropdown.Button
          {...restProps}
          destroyPopupOnHide
          overlayClassName={styles.dropdown}
          className={styles.dropdownButton}
          menu={{ items: menuItems }}
          onClick={handleClick}
        >
          {children}
        </Dropdown.Button>
      ) : (
        <Button
          {...restProps}
          icon={icon}
          className={cx(styles.button, { [styles.iconButton]: !!icon }, className)}
          onClick={handleClick}
        >
          {children}
        </Button>
      )}
    </div>
  )
})
