import { useEffect } from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { ButtonStyle } from '@typings/enums/button-style'

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
          styleType={ButtonStyle.SUCCESS}
          disabled={!openModal}
          className={styles.button}
          onClick={onClickSuccessBtn}
        >
          {successBtnText}
        </Button>
      </div>
    </Modal>
  )
}
