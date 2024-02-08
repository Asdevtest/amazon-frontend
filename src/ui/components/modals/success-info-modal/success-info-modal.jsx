import { useEffect } from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { useStyles } from './success-info-modal.style'

export const SuccessInfoModal = ({ openModal, setOpenModal, title, successBtnText, onClickSuccessBtn }) => {
  const { classes: styles } = useStyles()

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
      <div className={styles.modalMessageWrapper}>
        <Typography paragraph className={styles.title}>
          {title}
        </Typography>

        <Button
          success
          disableElevation
          disabled={!openModal}
          variant="contained"
          className={styles.button}
          onClick={onClickSuccessBtn}
        >
          {successBtnText}
        </Button>
      </div>
    </Modal>
  )
}
