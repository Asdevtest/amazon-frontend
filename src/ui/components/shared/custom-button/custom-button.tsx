import { Button, ButtonProps, Dropdown } from 'antd'
import { FC, memo } from 'react'
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { useStyles } from './custom-button.style'

interface CustomButtonProps extends ButtonProps {
  isCell?: boolean
  wrapperClassName?: string
  dropdown?: boolean
  onClickEdit?: () => void
  onClickRemove?: () => void
}

export const CustomButton: FC<CustomButtonProps> = memo(props => {
  const {
    isCell,
    icon,
    className,
    wrapperClassName,
    dropdown,
    onClickEdit,
    onClickRemove,
    onClick,
    children,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    onClick?.(event)
  }

  const items = [
    {
      key: '1',
      label: <MdOutlineEdit size={16} />,
      onClick: onClickEdit,
    },
    {
      key: '2',
      label: <MdOutlineDelete size={16} />,
      onClick: onClickRemove,
    },
  ]

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell }, wrapperClassName)}>
      {dropdown ? (
        <Dropdown.Button
          {...restProps}
          icon={icon}
          className={cx(styles.button, { [styles.iconButton]: !!icon }, className)}
          menu={{ items }}
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
