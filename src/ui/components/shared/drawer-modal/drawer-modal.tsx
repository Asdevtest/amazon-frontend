import { FC, PropsWithChildren } from 'react'

import Drawer from '@mui/material/Drawer'

import { PositionModalType } from '@typings/positions'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: VoidFunction
  position?: PositionModalType
}

export const DrawerModal: FC<Props> = ({ position = 'left', open, onClose, children }) => {
  const { isTabletResolution } = useCreateBreakpointResolutions()

  return (
    <>
      {isTabletResolution ? (
        <Drawer anchor={position} open={open} onClose={onClose}>
          {children}
        </Drawer>
      ) : (
        children
      )}
    </>
  )
}
