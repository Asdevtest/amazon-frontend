import React from 'react'

import {Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Modal} from '@components/modal'

import {useClassNames} from './confirmation-modal.style'

export const ConfirmationModal = ({
  openModal,
  setOpenModal,
  title,
  message,
  successBtnText,
  cancelBtnText,
  onClickSuccessBtn,
  onClickCancelBtn,
}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph variant="h5">
          {title}
        </Typography>
        <Typography paragraph className={classNames.modalMessage}>
          {message}
        </Typography>
        <div className={classNames.buttonsWrapper}>
          <SuccessButton disableElevation variant="contained" onClick={onClickSuccessBtn}>
            {successBtnText}
          </SuccessButton>
          <Button className={classNames.cancelBtn} color="primary" onClick={onClickCancelBtn}>
            {cancelBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
