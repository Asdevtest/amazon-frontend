import { FC, PropsWithChildren } from 'react'

import Dialog from '@mui/material/Dialog'

import { isTabletResolution } from '@constants/configs/sizes-settings'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: VoidFunction
}

export const DialogModal: FC<Props> = ({ open, onClose, children }) => (
  <>
    {isTabletResolution ? (
      <Dialog open={open} onClose={onClose}>
        {children}
      </Dialog>
    ) : (
      children
    )}
  </>
)
