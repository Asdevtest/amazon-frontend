import React from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { useClassNames } from './two-vertical-choices-modal.style'

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
  tooltipThirdButton,
  thirdBtnText,
  onClickThirdBtn,
}) => {
  const { classes: classNames } = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography variant="h5" className={classNames.title}>
          {title}
        </Typography>

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
          <Button
            tooltipInfoContent={tooltipSecondButton}
            color="primary"
            variant="text"
            className={classNames.bottomBtnText}
            onClick={onClickBottomBtn}
          >
            {bottomBtnText}
          </Button>
          {onClickThirdBtn && thirdBtnText && (
            <Button
              tooltipInfoContent={tooltipThirdButton}
              color="primary"
              variant="text"
              className={classNames.bottomBtnText}
              onClick={onClickThirdBtn}
            >
              {thirdBtnText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
