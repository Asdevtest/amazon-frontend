import { memo, useState } from 'react'

import { Rating } from '@material-ui/lab'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { useStyles } from './request-proposal-accept-or-reject-result-form.style'

export const RequestProposalAcceptOrRejectResultForm = memo(
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
    const { classes: styles, cx } = useStyles()

    const [formFields, setFormFields] = useState({ review: '', rating: '' })
    const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)

    const onChangeField = fieldName => event => {
      setFormFields({
        ...formFields,
        [fieldName]: event.target.value,
      })
    }

    return (
      <Modal openModal={openModal} setOpenModal={() => setIsShowConfirmationModal(true)}>
        <div className={styles.root}>
          <p className={styles.modalTitle}>{title}</p>
          <div className={styles.ratingWrapper}>
            <Field
              label={rateLabel + '*'}
              inputComponent={
                <div className={styles.rating}>
                  <Rating
                    value={formFields.rating}
                    classes={{ icon: styles.icon }}
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
            className={styles.heightFieldAuto}
            onChange={onChangeField('review')}
          />

          <div className={styles.btnsWrapper}>
            <CustomButton
              {...(isReject ? { danger: true } : {})}
              disabled={!formFields.rating}
              type="primary"
              onClick={() => onSubmit(formFields)}
            >
              {isReject ? rejectButtonText : confirmButtonText}
            </CustomButton>
            <CustomButton onClick={() => setIsShowConfirmationModal(true)}>{cancelBtnText}</CustomButton>
          </div>

          {isShowConfirmationModal ? (
            <ConfirmationModal
              // @ts-ignore
              isWarning
              openModal={isShowConfirmationModal}
              setOpenModal={() => setIsShowConfirmationModal(prevState => !prevState)}
              title={t(TranslationKey.Attention)}
              message={t(TranslationKey['Are you sure you want to close this window?'])}
              successBtnText={t(TranslationKey.Yes)}
              cancelBtnText={t(TranslationKey.Close)}
              onClickSuccessBtn={() => {
                setIsShowConfirmationModal(false)
                onClose()
              }}
              onClickCancelBtn={() => setIsShowConfirmationModal(false)}
            />
          ) : null}
        </div>
      </Modal>
    )
  },
)
