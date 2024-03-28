import { FC, PropsWithChildren, memo } from 'react'

import { GridColumnMenuContainer, GridColumnMenuProps, GridPinnedColumns } from '@mui/x-data-grid-premium'

import { ControlColumnMenu } from '../controll-column-menu'

interface ICustomMenuContainerProps extends PropsWithChildren, GridColumnMenuProps {
  pinnedColumns: GridPinnedColumns
  onClickPinButton: (pinnedColumns: GridPinnedColumns) => void
}

export const CustomMenuContainer: FC<ICustomMenuContainerProps> = memo(({ children, ...props }) => {
  const { hideMenu, colDef, open, pinnedColumns, onClickPinButton } = props

  console.log('pinnedColumns :>> ', pinnedColumns)

  return (
    <GridColumnMenuContainer hideMenu={hideMenu} colDef={colDef} open={open}>
      {pinnedColumns ? (
        <ControlColumnMenu
          field={colDef.field}
          pinnedColumns={pinnedColumns}
          onClickCloseMenu={hideMenu}
          onClickPinButton={onClickPinButton}
        />
      ) : null}
      {children}
    </GridColumnMenuContainer>
  )
})
