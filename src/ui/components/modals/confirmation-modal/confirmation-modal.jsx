import React, {useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Button} from '@components/buttons/button'
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

  useEffect(() => {
    const listener = event => {
      if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onSubmit()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Modal isWarning={isWarning} openModal={openModal} setOpenModal={setOpenModal}>
      <div className={clsx(classNames.modalMessageWrapper, {[classNames.warningModalMessageWrapper]: isWarning})}>
        <div className={classNames.titleWrapper}>
          <Typography variant="h5" className={clsx(classNames.title, {[classNames.warningTitle]: isWarning})}>
            {title}
          </Typography>
        </div>

        <Typography paragraph className={clsx(classNames.modalMessage, {[classNames.warningModalMessage]: isWarning})}>
          {message}
        </Typography>
        <div className={clsx(classNames.buttonsWrapper, {[classNames.warningButtonsWrapper]: isWarning})}>
          {isWarning ? (
            <Button
              danger
              disableElevation
              className={classNames.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {successBtnText}
            </Button>
          ) : (
            <Button
              success
              disableElevation
              className={classNames.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {successBtnText}
            </Button>
          )}

          <Button
            disabled={submitIsClicked}
            className={classNames.cancelButton}
            variant={'text'}
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
