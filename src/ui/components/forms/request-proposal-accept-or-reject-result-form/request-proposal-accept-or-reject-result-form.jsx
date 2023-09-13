import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { Rating } from '@material-ui/lab'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useClassNames } from './request-proposal-accept-or-reject-result-form.style'

export const RequestProposalAcceptOrRejectResultForm = observer(
  ({
    isReject,
    isSupervisor,
    title,
    rateLabel,
    reviewLabel,
    onSubmit,
    onClose,
    confirmButtonText,
    cancelBtnText,
    rejectButtonText,
    openModal,
  }) => {
    const [formFields, setFormFields] = useState({ review: '', rating: '' })
    const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)
    const { classes: classNames } = useClassNames()

    const onChangeField = fieldName => event => {
      setFormFields({
        ...formFields,
        [fieldName]: event.target.value,
      })
    }

    return (
      <Modal openModal={openModal} setOpenModal={() => setIsShowConfirmationModal(true)}>
        <div className={classNames.root}>
          <Typography className={classNames.modalTitle}>{title}</Typography>
          <div className={classNames.ratingWrapper}>
            <Field
              label={rateLabel + '*'}
              inputComponent={
                <div className={classNames.rating}>
                  <Rating
                    value={formFields.rating}
                    classes={{ icon: classNames.icon }}
                    size="large"
                    onChange={onChangeField('rating')}
                  />
                </div>
              }
            />
          </div>

          <Field
            multiline
            inputProps={{ maxLength: 125 }}
            label={reviewLabel}
            minRows={6}
            maxRows={6}
            value={formFields.reason}
            className={classNames.heightFieldAuto}
            onChange={onChangeField('review')}
          />

          <div className={classNames.btnsWrapper}>
            <Button
              disabled={!formFields.rating}
              success={!isReject}
              danger={isReject}
              color="primary"
              className={cx(classNames.btnSubmit, { [classNames.btnLargeSubmit]: isSupervisor })}
              onClick={() => onSubmit(formFields)}
            >
              {isReject ? rejectButtonText : confirmButtonText}
            </Button>
            <Button
              variant="text"
              className={cx(classNames.btnSubmit, classNames.cancelSubmit)}
              onClick={() => setIsShowConfirmationModal(true)}
            >
              {cancelBtnText}
            </Button>
          </div>

          <ConfirmationModal
            isWarning
            openModal={isShowConfirmationModal}
            setOpenModal={() => setIsShowConfirmationModal(prevState => !prevState)}
            title={t(TranslationKey.Attention)}
            message={t(TranslationKey['Are you sure you want to close this window?'])}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.Cancel)}
            onClickSuccessBtn={() => {
              setIsShowConfirmationModal(false)
              onClose()
            }}
            onClickCancelBtn={() => setIsShowConfirmationModal(false)}
          />
        </div>
      </Modal>
    )
  },
)
