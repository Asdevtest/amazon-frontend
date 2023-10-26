import { cx } from '@emotion/css'
import { useEffect } from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { useClassNames } from './warning-info-modal.style'

export const WarningInfoModal = ({ openModal, setOpenModal, title, btnText, onClickBtn, isWarning }) => {
  const { classes: classNames } = useClassNames()

  useEffect(() => {
    const listener = event => {
      if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onClickBtn()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [openModal])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography variant="h6" className={cx(classNames.title, { [classNames.titleWarning]: isWarning })}>
          {title}
        </Typography>

        <Button success disableElevation variant="contained" className={classNames.button} onClick={onClickBtn}>
          {btnText}
        </Button>
      </div>
    </Modal>
  )
}
