import React, {useEffect, useState} from 'react'

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

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  useEffect(() => {
    if (openModal) {
      setSubmitIsClicked(false)
    }
  }, [openModal])

  const onSubmit = () => {
    onClickSuccessBtn()
    setSubmitIsClicked(!submitIsClicked)
  }

  return (
    <Modal isWarning={isWarning} openModal={openModal} setOpenModal={setOpenModal}>
      <div className={clsx(classNames.modalMessageWrapper, {[classNames.warningModalMessageWrapper]: isWarning})}>
        <div className={classNames.titleWrapper}>
          <Typography paragraph variant="h5" className={clsx({[classNames.title]: isWarning})}>
            {title}
          </Typography>
        </div>

        <Typography paragraph className={clsx(classNames.modalMessage, {[classNames.warningModalMessage]: isWarning})}>
          {message}
        </Typography>
        <div className={clsx(classNames.buttonsWrapper, {[classNames.warningButtonsWrapper]: isWarning})}>
          {isWarning ? (
            <ErrorButton
              disableElevation
              className={classNames.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {successBtnText}
            </ErrorButton>
          ) : (
            <SuccessButton
              disableElevation
              className={classNames.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {successBtnText}
            </SuccessButton>
          )}

          <Button
            disabled={submitIsClicked}
            className={classNames.cancelBtn}
            variant={isWarning && 'text'}
            color="primary"
            onClick={onClickCancelBtn}
          >
            {cancelBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
