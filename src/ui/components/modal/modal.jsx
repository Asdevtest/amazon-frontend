import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

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
        paperScrollBody: clsx(classNames.dialogContent, {[classNames.warningPaper]: props.isWarning}),
      }}
      open={props.openModal}
      scroll="body"
      onClose={event => {
        ;(event.detail !== 0 || event.code === 'Escape') && props.setOpenModal(false) // event.detail!==0 чтобы модалка не закрывалась при клике на внешний скролл
      }}
    >
      <CloseRoundedIcon className={classNames.closeIcon} fontSize="large" onClick={() => props.setOpenModal()} />

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
