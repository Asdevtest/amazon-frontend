import { FC, PropsWithChildren } from 'react'

import Drawer from '@mui/material/Drawer'

import { isTabletResolution } from '@constants/configs/sizes-settings'

type PositionType = 'left' | 'top' | 'right' | 'bottom' | undefined

interface Props extends PropsWithChildren {
  position: PositionType
  open: boolean
  onClose: VoidFunction
}

export const DrawerModal: FC<Props> = ({ position, open, onClose, children }) => (
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
