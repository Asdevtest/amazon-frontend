import React from 'react'

import {Dialog, DialogContent} from '@material-ui/core'

import {useClassNames} from './modal.style'

export const Modal = props => {
  const classNames = useClassNames()
  return (
    <Dialog
      maxWidth={false}
      onClose={() => {
        props.setOpenModal(false)
      }}
      open={props.openModal}
      scroll={'body'}
    >
      <DialogContent className={classNames.dialogPadding}>{props.children}</DialogContent>
    </Dialog>
  )
}
