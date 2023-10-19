import { cx } from '@emotion/css'
import { ClassNamesArg } from '@emotion/react'
import React, { FC, useEffect, useState } from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Dialog, DialogContent } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { useClassNames } from './modal.style'

interface ModalProps {
  openModal: boolean
  isWarning?: boolean
  noPadding?: boolean
  missClickModalOn?: boolean
  children: React.ReactNode
  dialogContextClassName?: ClassNamesArg
  setOpenModal: (openModal?: boolean) => void
  fullWidth?: boolean
  maxWidth?: number
}

export const Modal: FC<ModalProps> = props => {
  const { classes: classNames } = useClassNames()

  const {
    openModal,
    isWarning,
    setOpenModal,
    dialogContextClassName,
    children,
    missClickModalOn,
    noPadding,
    fullWidth,
    maxWidth,
  } = props

  const [showMissclickModal, setShowMissclickModal] = useState(false)

  useEffect(() => {
    if (!openModal) {
      setShowMissclickModal(false)
    }
    if (window.getSelection) {
      const selection = window.getSelection()
      selection?.removeAllRanges()
    } else {
      const selection = document.getSelection()
      selection?.removeAllRanges()
    }
  }, [openModal])

  return (
    <Dialog
      maxWidth={false}
      classes={{
        paperScrollBody: cx(classNames.dialogContent, {
          [classNames.warningPaper]: isWarning,
        }),
      }}
      fullWidth={fullWidth}
      open={openModal}
      scroll={'body'}
      sx={
        fullWidth
          ? {
              '& .MuiDialog-paper': {
                maxWidth: `${maxWidth ?? 1300}px`,
              },
            }
          : {}
      }
      onClose={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
        (event.detail !== 0 || event.button === 27) &&
        (missClickModalOn ? setShowMissclickModal(!showMissclickModal) : setOpenModal(false))
      }
    >
      <CloseRoundedIcon className={classNames.closeIcon} fontSize="large" onClick={() => setOpenModal()} />

      <DialogContent
        className={cx(
          classNames.dialogPadding,
          { [classNames.warningDialogPadding]: isWarning, [classNames.noPadding]: noPadding },
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
