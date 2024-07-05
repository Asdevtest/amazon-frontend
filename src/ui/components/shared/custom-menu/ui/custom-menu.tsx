import { Menu, MenuProps } from 'antd'
import { FC, memo } from 'react'

interface CustomMenuProps extends MenuProps {
  className?: string
}

export const CustomMenu: FC<CustomMenuProps> = memo(({ ...restProps }) => {
  return <Menu {...restProps} />
})
