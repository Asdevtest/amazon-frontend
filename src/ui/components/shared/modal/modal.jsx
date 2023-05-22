import { cx } from '@emotion/css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Dialog, DialogContent } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { useClassNames } from './modal.style'

export const Modal = ({ openModal, isWarning, setOpenModal, dialogContextClassName, children, missClickModalOn }) => {
  const { classes: classNames } = useClassNames()

  const [showMissclickModal, setShowMissclickModal] = useState(false)

  useEffect(() => {
    if (!openModal) {
      setShowMissclickModal(false)
    }
    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    } else {
      document.selection.empty()
    }
  }, [openModal])

  return (
    <Dialog
      maxWidth={false}
      classes={{
        paperScrollBody: cx(classNames.dialogContent, { [classNames.warningPaper]: isWarning }),
      }}
      open={openModal}
      scroll={'body'}
      onClose={
        event =>
          (event.detail !== 0 || event.code === 'Escape') &&
          (missClickModalOn ? setShowMissclickModal(!showMissclickModal) : setOpenModal(false)) // event.detail!==0 чтобы модалка не закрывалась при клике на внешний скролл
      }
    >
      <CloseRoundedIcon className={classNames.closeIcon} fontSize="large" onClick={() => setOpenModal()} />

      <DialogContent
        className={cx(
          classNames.dialogPadding,
          { [classNames.warningDialogPadding]: isWarning },
          dialogContextClassName,
        )}
      >
        {children}
      </DialogContent>

      <ConfirmationModal
        openModal={showMissclickModal}
        setOpenModal={() => setShowMissclickModal(!showMissclickModal)}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Window will be closed'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => setOpenModal()}
        onClickCancelBtn={() => setShowMissclickModal(!showMissclickModal)}
      />
    </Dialog>
  )
}
