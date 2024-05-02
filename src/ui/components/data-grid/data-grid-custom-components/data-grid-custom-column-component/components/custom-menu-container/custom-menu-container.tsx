import { FC, PropsWithChildren, memo } from 'react'

import { GridColumnMenuContainer, GridColumnMenuProps } from '@mui/x-data-grid-premium'

import { ControlColumnMenu } from '../controll-column-menu'

interface ICustomMenuContainerProps extends PropsWithChildren, GridColumnMenuProps {
  pinnedColumns: boolean
}

export const CustomMenuContainer: FC<ICustomMenuContainerProps> = memo(({ children, ...props }) => {
  const { hideMenu, colDef, open } = props

  return (
    <GridColumnMenuContainer hideMenu={hideMenu} colDef={colDef} open={open}>
      <ControlColumnMenu field={colDef.field} onClickCloseMenu={hideMenu} />
      {children}
    </GridColumnMenuContainer>
  )
})
