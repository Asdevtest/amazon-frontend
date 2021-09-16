import React from 'react'

import {Dialog, DialogContent} from '@material-ui/core'
import clsx from 'clsx'

import {useClassNames} from './modal.style'

export const Modal = props => {
  const classNames = useClassNames()
  return (
    <Dialog
      maxWidth={false}
      classes={{
        paperScrollBody: clsx({[classNames.warningPaper]: props.isWarning}),
      }}
      open={props.openModal}
      scroll="body"
      onClose={() => {
        props.setOpenModal(false)
      }}
    >
      <DialogContent
        className={clsx(
          classNames.dialogPadding,
          {[classNames.warningDialogPadding]: props.isWarning},
          props.dialogContextClassName,
        )}
      >
        {props.children}
      </DialogContent>
    </Dialog>
  )
}
