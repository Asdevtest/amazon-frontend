import React, {useState} from 'react'

import {Typography} from '@material-ui/core'

import {loadingStatuses} from '@constants/loading-statuses'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Modal} from '@components/modal'

import {useClassNames} from './confirmation-with-comment-modal.style'

export const ConfirmWithCommentModal = ({
  requestStatus,
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

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Typography variant="h5">{titleText}</Typography>
      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
        label={commentLabelText}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <div className={classNames.buttonsWrapper}>
        <Button
          disabled={requestStatus === loadingStatuses.isLoading}
          color="primary"
          variant="contained"
          className={classNames.button}
          onClick={() => onSubmit(comment)}
        >
          {okBtnText}
        </Button>
        <Button color="primary" variant="contained" className={classNames.button} onClick={setOpenModal}>
          {cancelBtnText}
        </Button>
      </div>
    </Modal>
  )
}
