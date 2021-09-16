import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {SuccessButton} from '@components/buttons/success-button'
import {Modal} from '@components/modal'

import {useClassNames} from './confirmation-modal.style'

export const ConfirmationModal = ({
  openModal,
  setOpenModal,
  title,
  message,
  isWarning,
  successBtnText,
  cancelBtnText,
  onClickSuccessBtn,
  onClickCancelBtn,
}) => {
  const classNames = useClassNames()

  return (
    <Modal isWarning={isWarning} openModal={openModal} setOpenModal={setOpenModal}>
      <div className={clsx(classNames.modalMessageWrapper, {[classNames.warningModalMessageWrapper]: isWarning})}>
        <Typography paragraph variant="h5" className={clsx({[classNames.title]: isWarning})}>
          {title}
        </Typography>
        <Typography paragraph className={clsx(classNames.modalMessage, {[classNames.warningModalMessage]: isWarning})}>
          {message}
        </Typography>
        <div className={clsx(classNames.buttonsWrapper, {[classNames.warningButtonsWrapper]: isWarning})}>
          {isWarning ? (
            <ErrorButton disableElevation variant="contained" onClick={onClickSuccessBtn}>
              {successBtnText}
            </ErrorButton>
          ) : (
            <SuccessButton disableElevation variant="contained" onClick={onClickSuccessBtn}>
              {successBtnText}
            </SuccessButton>
          )}

          <Button className={classNames.cancelBtn} color="primary" onClick={onClickCancelBtn}>
            {cancelBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
