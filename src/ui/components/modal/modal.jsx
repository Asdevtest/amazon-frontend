import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import React, {useEffect, useState} from 'react'

import {Dialog, DialogContent} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {t} from '@utils/translations'

import {useClassNames} from './modal.style'

export const Modal = ({openModal, isWarning, setOpenModal, dialogContextClassName, children, missClickModalOn}) => {
  const classNames = useClassNames()

  const [showMissclickModal, setShowMissclickModal] = useState(false)

  useEffect(() => {
    if (!openModal) {
      setShowMissclickModal(false)
    }
  }, [openModal])

  return (
    <Dialog
      maxWidth={false}
      classes={{
        paperScrollBody: clsx(classNames.dialogContent, {[classNames.warningPaper]: isWarning}),
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
        className={clsx(
          classNames.dialogPadding,
          {[classNames.warningDialogPadding]: isWarning},
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
