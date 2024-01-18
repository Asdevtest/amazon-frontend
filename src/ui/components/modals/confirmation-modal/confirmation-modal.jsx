import { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { useStyles } from './confirmation-modal.style'

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

  const { classes: styles, cx } = useStyles()

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
    setIsShowComment(false)
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
          [styles.warningModalMessageWrapper]: isWarning,
          [styles.commentMessageWrapper]: isShowComment,
          [styles.modalMessageWrapper]: !isShowComment,
        })}
      >
        {!isShowComment && (
          <>
            <div className={styles.titleWrapper}>
              <Typography variant="h5" className={cx(styles.title, { [styles.warningTitle]: isWarning })}>
                {title}
              </Typography>
            </div>

            <Typography paragraph className={cx(styles.modalMessage, { [styles.warningModalMessage]: isWarning })}>
              {message}
            </Typography>

            <Typography paragraph className={cx(styles.modalSmallMessage, { [styles.warningModalMessage]: isWarning })}>
              {smallMessage}
            </Typography>
          </>
        )}

        {isShowComment && (
          <>
            <Typography variant="h5" className={styles.commentTitle}>
              {commentTitleText || title}
            </Typography>
            <Field
              multiline
              className={styles.heightFieldAuto}
              minRows={7}
              maxRows={7}
              inputProps={{ maxLength: 35000 }}
              // placeholder={t(TranslationKey.Reason)}
              labelClasses={styles.commentLabelText}
              label={commentLabelText}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </>
        )}

        <div
          className={cx({
            [styles.warningButtonsWrapper]: isWarning && !isShowComment,
            [styles.commentButtonsWrapper]: isShowComment,
            [styles.buttonsWrapper]: !isShowComment,
          })}
        >
          {isWarning ? (
            <Button
              danger
              disableElevation
              className={styles.button}
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
              className={styles.button}
              disabled={submitIsClicked}
              variant="contained"
              onClick={onSubmit}
            >
              {isShowComment ? commentSuccessBtnText || successBtnText : successBtnText}
            </Button>
          )}

          <Button
            disabled={submitIsClicked}
            className={styles.cancelButton}
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
