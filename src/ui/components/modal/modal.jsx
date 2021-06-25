import React from 'react'

import {Dialog, DialogContent} from '@material-ui/core'
import clsx from 'clsx'

import {useClassNames} from './modal.style'

export const Modal = props => {
  const classNames = useClassNames()
  return (
    <Dialog
      maxWidth={false}
      open={props.openModal}
      scroll="body"
      onClose={() => {
        props.setOpenModal(false)
      }}
    >
      <DialogContent className={clsx(classNames.dialogPadding, props.dialogContextClassName)}>
        {props.children}
      </DialogContent>
    </Dialog>
  )
}
