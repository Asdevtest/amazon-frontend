import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import React, {useEffect, useState} from 'react'

import {Dialog, DialogContent} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {t} from '@utils/translations'

import {useClassNames} from './modal.style'

export const Modal = props => {
  const classNames = useClassNames()

  const [showMissclickModal, setShowMissclickModal] = useState(false)

  useEffect(() => {
    if (!props.openModal) {
      setShowMissclickModal(false)
    }
  }, [props.openModal])

  return (
    <Dialog
      maxWidth={false}
      classes={{
        paperScrollBody: clsx(classNames.dialogContent, {[classNames.warningPaper]: props.isWarning}),
      }}
      open={props.openModal}
      scroll="body"
      onClose={
        event => (event.detail !== 0 || event.code === 'Escape') && setShowMissclickModal(!showMissclickModal) // event.detail!==0 чтобы модалка не закрывалась при клике на внешний скролл
      }
    >
      <CloseRoundedIcon className={classNames.closeIcon} fontSize="large" onClick={() => props.setOpenModal()} />

      <DialogContent
        className={clsx(
          classNames.dialogPadding,
          {[classNames.warningDialogPadding]: props.isWarning},
          props.dialogContextClassName,
        )}
      >
        {props.children}
      </DialogContent>

      <ConfirmationModal
        openModal={showMissclickModal}
        setOpenModal={() => setShowMissclickModal(!showMissclickModal)}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Data will not be saved!'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => props.setOpenModal()}
        onClickCancelBtn={() => setShowMissclickModal(!showMissclickModal)}
      />
    </Dialog>
  )
}
