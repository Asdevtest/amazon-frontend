import React, {useState, useEffect} from 'react'

import {Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Modal} from '@components/modal'

import {useClassNames} from './confirmation-with-comment-modal.style'

export const ConfirmWithCommentModal = ({
  isWarning,
  openModal,
  setOpenModal,
  titleText,
  commentLabelText,
  okBtnText,
  cancelBtnText,
  commentConvertToArray,
  onSubmit,
}) => {
  const classNames = useClassNames()

  const [comment, setComment] = useState('')

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  useEffect(() => {
    if (openModal) {
      setSubmitIsClicked(false)
    }
  }, [openModal])

  const onClickSubmit = () => {
    commentConvertToArray ? onSubmit(comment.split('\n')) : onSubmit(comment)
    setComment('')
    setSubmitIsClicked(!submitIsClicked)
  }

  const onClose = () => {
    setComment('')
    setOpenModal()
  }

  useEffect(() => {
    const listener = event => {
      if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onClickSubmit()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography variant="h5" className={classNames.modalMessageTitle}>
          {titleText}
        </Typography>
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={7}
          rowsMax={7}
          inputProps={{maxLength: 35000}}
          // placeholder={t(TranslationKey.Reason)}
          labelClasses={classNames.commentLabelText}
          label={commentLabelText}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className={classNames.buttonsWrapper}>
          {isWarning ? (
            <Button
              danger
              disabled={submitIsClicked}
              variant="contained"
              className={classNames.buttonOk}
              onClick={onClickSubmit}
            >
              {okBtnText}
            </Button>
          ) : (
            <Button
              success
              disabled={submitIsClicked}
              variant="contained"
              className={classNames.buttonOk}
              onClick={onClickSubmit}
            >
              {okBtnText}
            </Button>
          )}

          <Button
            disabled={submitIsClicked}
            color="primary"
            variant="contained"
            className={classNames.buttonCancel}
            onClick={onClose}
          >
            {cancelBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
