import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {useClassNames} from './warning-info-modal.style'

export const WarningInfoModal = ({openModal, setOpenModal, title, btnText, onClickBtn, isWarning}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph variant="h5" className={clsx({[classNames.titleWarning]: isWarning})}>
          {title}
        </Typography>

        <Button disableElevation variant="contained" onClick={onClickBtn}>
          {btnText}
        </Button>
      </div>
    </Modal>
  )
}
