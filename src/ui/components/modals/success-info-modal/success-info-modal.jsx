import React, { useEffect } from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { useClassNames } from './success-info-modal.style'

export const SuccessInfoModal = ({ openModal, setOpenModal, title, successBtnText, onClickSuccessBtn }) => {
  const { classes: classNames } = useClassNames()

  useEffect(() => {
    const listener = event => {
      if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onClickSuccessBtn()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph className={classNames.title}>
          {title}
        </Typography>

        <Button
          success
          disableElevation
          disabled={!openModal}
          variant="contained"
          className={classNames.button}
          onClick={onClickSuccessBtn}
        >
          {successBtnText}
        </Button>
      </div>
    </Modal>
  )
}
