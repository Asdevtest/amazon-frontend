import { cx } from '@emotion/css'
import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { useClassNames } from './confirmation-modal.style'

export const ConfirmationModal = props => {
  const {
    openModal,
    setOpenModal,
    title,
    message,
    smallMessage,
    isWarning,
    successBtnText,
    cancelBtnText,
    onClickSuccessBtn,
    onClickCancelBtn,
    commentConvertToArray,
    withComment,
    asCommentModalDefault = false,
    commentTitleText,
    commentLabelText,
    commentSuccessBtnText,
    commentCancelBtnText,
  } = props

  const { classes: classNames } = useClassNames()

  const [comment, setComment] = useState('')

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const [isShowComment, setIsShowComment] = useState(asCommentModalDefault)

  useEffect(() => {
    if (openModal) {
      setSubmitIsClicked(false)
    }
  }, [openModal])

  const onSubmit = () => {
    if (withComment && !isShowComment) {
      setIsShowComment(true)
      return
    }

    if (withComment) {
      commentConvertToArray ? onClickSuccessBtn(comment.split('\n')) : onClickSuccessBtn(comment)
      setComment('')
      setSubmitIsClicked(!submitIsClicked)
    } else {
      onClickSuccessBtn()
      setSubmitIsClicked(!submitIsClicked)
    }
  }

  const handleClose = () => {
    onClickCancelBtn()
    setComment('')
  }

  useEffect(() => {
    const listener = event => {
      if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        event.preventDefault()
        onSubmit()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div
        className={cx({
          [classNames.warningModalMessageWrapper]: isWarning,
          [classNames.commentMessageWrapper]: isShowComment,
          [classNames.modalMessageWrapper]: !isShowComment,
        })}
      >
        {!isShowComment && (
          <>
            <div className={classNames.titleWrapper}>
              <Typography variant="h5" className={cx(classNames.title, { [classNames.warningTitle]: isWarning })}>
                {title}
              </Typography>
            </div>

            <Typography
              paragraph
              className={cx(classNames.modalMessage, { [classNames.warningModalMessage]: isWarning })}
            >
              {message}
            </Typography>

            <Typography
              paragraph
              className={cx(classNames.modalSmallMessage, { [classNames.warningModalMessage]: isWarning })}
            >
              {smallMessage}
            </Typography>
          </>
        )}

        {isShowComment && (
          <>
            <Typography variant="h5" className={classNames.commentTitle}>
              {commentTitleText || title}
            </Typography>
            <Field
              multiline
              className={classNames.heightFieldAuto}
              minRows={7}
              maxRows={7}
              inputProps={{ maxLength: 35000 }}
              // placeholder={t(TranslationKey.Reason)}
              labelClasses={classNames.commentLabelText}
              label={commentLabelText}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </>
        )}

        <div
          className={cx({
            [classNames.warningButtonsWrapper]: isWarning && !isShowComment,
            [classNames.commentButtonsWrapper]: isShowComment,
            [classNames.buttonsWrapper]: !isShowComment,
          })}
        >
          {isWarning ? (
            <Button
              danger
              disableElevation
              className={classNames.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {isShowComment ? commentSuccessBtnText || successBtnText : successBtnText}
            </Button>
          ) : (
            <Button
              success
              disableElevation
              className={classNames.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {isShowComment ? commentSuccessBtnText || successBtnText : successBtnText}
            </Button>
          )}

          <Button
            disabled={submitIsClicked}
            className={classNames.cancelButton}
            variant={'text'}
            onClick={() => handleClose()}
          >
            {isShowComment ? commentCancelBtnText || cancelBtnText : cancelBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
