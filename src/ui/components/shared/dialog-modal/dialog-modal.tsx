import { FC, PropsWithChildren } from 'react'

import Dialog from '@mui/material/Dialog'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: () => void
}

export const DialogModal: FC<Props> = ({ open, onClose, children }) => {
  const { isTabletResolution } = useCreateBreakpointResolutions()

  return (
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
}
