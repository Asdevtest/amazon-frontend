import React from 'react'

import {Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {useClassNames} from './two-vertical-choices-modal.style'

export const TwoVerticalChoicesModal = ({
  openModal,
  setOpenModal,
  title,
  topBtnText,
  onClickTopBtn,
  bottomBtnText,
  onClickBottomBtn,
  tooltipFirstButton,
  tooltipSecondButton,
}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography variant="h5">{title}</Typography>

        <div className={classNames.resultButtonsWrapper}>
          <Button
            tooltipInfoContent={tooltipFirstButton}
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={onClickTopBtn}
          >
            {topBtnText}
          </Button>
          <Button tooltipInfoContent={tooltipSecondButton} color="primary" variant="text" onClick={onClickBottomBtn}>
            {bottomBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
