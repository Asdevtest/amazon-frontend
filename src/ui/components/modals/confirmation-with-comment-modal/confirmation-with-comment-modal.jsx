import React, {useState, useEffect} from 'react'

import {Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Modal} from '@components/modal'

import {useClassNames} from './confirmation-with-comment-modal.style'

export const ConfirmWithCommentModal = ({
  openModal,
  setOpenModal,
  titleText,
  commentLabelText,
  okBtnText,
  cancelBtnText,
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
    onSubmit(comment)
    setSubmitIsClicked(!submitIsClicked)
  }

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
          labelClasses={classNames.commentLabelText}
          label={commentLabelText}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className={classNames.buttonsWrapper}>
          <Button
            disabled={submitIsClicked}
            color="primary"
            variant="contained"
            className={classNames.buttonOk}
            onClick={onClickSubmit}
          >
            {okBtnText}
          </Button>
          <Button
            disabled={submitIsClicked}
            color="primary"
            variant="contained"
            className={classNames.buttonCancel}
            onClick={setOpenModal}
          >
            {cancelBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
