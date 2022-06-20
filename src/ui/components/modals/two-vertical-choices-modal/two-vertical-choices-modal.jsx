import React from 'react'

import {Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {t} from '@utils/translations'

import {useClassNames} from './two-vertical-choices-modal.style'

export const TwoVerticalChoicesModal = ({
  openModal,
  setOpenModal,
  title,
  topBtnText,
  onClickTopBtn,
  bottomBtnText,
  onClickBottomBtn,
}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography variant="h5">{title}</Typography>

        <div className={classNames.resultButtonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Go to the order and open the "Edit order" window'])}
            color="primary"
            variant="contained"
            onClick={onClickTopBtn}
          >
            {topBtnText}
          </Button>
          <Button
            tooltipInfoContent={t(TranslationKey['Stay in "Free Orders"'])}
            color="primary"
            variant="text"
            onClick={onClickBottomBtn}
          >
            {bottomBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
