import React from 'react'

import {Typography} from '@material-ui/core'

import {SuccessButton} from '@components/buttons/success-button'
import {Modal} from '@components/modal'

import {useClassNames} from './success-info-modal.style'

export const SuccessInfoModal = ({openModal, setOpenModal, title, successBtnText, onClickSuccessBtn}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph variant="h5">
          {title}
        </Typography>

        <SuccessButton disableElevation variant="contained" onClick={onClickSuccessBtn}>
          {successBtnText}
        </SuccessButton>
      </div>
    </Modal>
  )
}
