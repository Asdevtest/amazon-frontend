import { FC, PropsWithChildren } from 'react'

import Dialog from '@mui/material/Dialog'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: VoidFunction
}

export const DialogModal: FC<Props> = ({ open, onClose, children }) => {
  const isMobileResolution = window.innerWidth < 768

  return (
    <>
      {isMobileResolution ? (
        <Dialog open={open} onClose={onClose}>
          {children}
        </Dialog>
      ) : (
        children
      )}
    </>
  )
}
