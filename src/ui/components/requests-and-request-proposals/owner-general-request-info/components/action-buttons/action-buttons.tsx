import { FC, memo } from 'react'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './action-buttons.style'

interface ActionButtonsProps {
  id: string
  uploadedToListing: boolean
  isDisplayingMarkAsCompletedButton: boolean
  status: string
  requestIsNotDraftAndPublished: boolean
  disableMarkAsCompletedButton: boolean
  onToggleUploadedToListing: (id: string, uploadedToListing: boolean) => void
  onClickMarkAsCompletedBtn: () => void
  onClickCancelBtn: () => void
  onClickEditBtn: () => void
  onClickPublishBtn: () => void
  setIsRestoreModalOpen: (isRestoreModalOpen: boolean) => void
  onClickAbortBtn: () => void
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const {
    id,
    uploadedToListing,
    isDisplayingMarkAsCompletedButton,
    disableMarkAsCompletedButton,
    status,
    requestIsNotDraftAndPublished,
    onToggleUploadedToListing,
    onClickMarkAsCompletedBtn,
    onClickCancelBtn,
    onClickEditBtn,
    onClickPublishBtn,
    setIsRestoreModalOpen,
    onClickAbortBtn,
  } = props

  return (
    <div className={styles.btnsBlockWrapper}>
      <CustomButton onClick={() => onToggleUploadedToListing(id, uploadedToListing)}>
        <Checkbox color="primary" checked={uploadedToListing} className={styles.listingCheckbox} />
        <p className={styles.listingText}>{t(TranslationKey['Uploaded by on listing'])}</p>
      </CustomButton>
      {isDisplayingMarkAsCompletedButton && (
        <CustomButton
          // fullWidth
          disabled={disableMarkAsCompletedButton}
          type="primary"
          onClick={onClickMarkAsCompletedBtn}
        >
          {t(TranslationKey['Mark as completed'])}
        </CustomButton>
      )}
      {status === RequestStatus.DRAFT && (
        <div className={styles.btnsWrapper}>
          <div className={styles.btnsRow}>
            <CustomButton
              // fullWidth
              danger
              type="primary"
              title={t(TranslationKey['Delete the selected request'])}
              onClick={onClickCancelBtn}
            >
              {t(TranslationKey.Delete)}
            </CustomButton>

            <CustomButton
              // fullWidth
              title={t(TranslationKey['Allows you to change the selected request'])}
              onClick={onClickEditBtn}
            >
              {t(TranslationKey.Edit)}
            </CustomButton>
          </div>
          <CustomButton
            // fullWidth
            type="primary"
            title={t(TranslationKey['Publish the selected request on the exchange'])}
            onClick={onClickPublishBtn}
          >
            {t(TranslationKey.Publish)}
          </CustomButton>
        </div>
      )}
      {status !== RequestStatus.DRAFT && (
        <>
          {requestIsNotDraftAndPublished || status === RequestStatus.PUBLISHED ? (
            <div className={styles.btnsWrapper}>
              <div className={styles.btnsRow}>
                {requestIsNotDraftAndPublished && (
                  <CustomButton
                    // fullWidth
                    danger
                    type="primary"
                    title={t(TranslationKey['Delete the selected request'])}
                    onClick={onClickCancelBtn}
                  >
                    {t(TranslationKey.Delete)}
                  </CustomButton>
                )}

                {status === RequestStatus.PUBLISHED && (
                  <CustomButton
                    // fullWidth
                    title={t(TranslationKey['Allows you to change the selected request'])}
                    onClick={onClickEditBtn}
                  >
                    {t(TranslationKey.Edit)}
                  </CustomButton>
                )}
              </div>
            </div>
          ) : null}

          {(status === RequestStatus.IN_PROCESS ||
            status === RequestStatus.EXPIRED ||
            status === RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED) && (
            <CustomButton
              // fullWidth
              onClick={() => setIsRestoreModalOpen(true)}
            >
              {t(TranslationKey['Change request terms'])}
            </CustomButton>
          )}

          {status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED /* && status !== RequestStatus.EXPIRED */ && (
            <div className={cx(styles.btnsRow, styles.btnsRowIsLast)}>
              <CustomButton
                title={
                  status !== RequestStatus.FORBID_NEW_PROPOSALS
                    ? t(TranslationKey['Removes the visibility of the request on the exchange'])
                    : ''
                }
                className={cx({
                  [styles.stopBtn]: status !== RequestStatus.FORBID_NEW_PROPOSALS,
                })}
                onClick={status !== RequestStatus.FORBID_NEW_PROPOSALS ? onClickAbortBtn : onClickPublishBtn}
              >
                {status === RequestStatus.FORBID_NEW_PROPOSALS
                  ? t(TranslationKey['Resume accepting proposals'])
                  : t(TranslationKey['Stop accepting proposals'])}
              </CustomButton>
            </div>
          )}
        </>
      )}
    </div>
  )
})
