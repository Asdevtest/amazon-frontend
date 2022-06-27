import React from 'react'

import {Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {useClassNames} from './success-info-modal.style'

export const SuccessInfoModal = ({openModal, setOpenModal, title, successBtnText, onClickSuccessBtn}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph className={classNames.title}>
          {title}
        </Typography>

        <Button success disableElevation variant="contained" className={classNames.button} onClick={onClickSuccessBtn}>
          {successBtnText}
        </Button>
      </div>
    </Modal>
  )
}
