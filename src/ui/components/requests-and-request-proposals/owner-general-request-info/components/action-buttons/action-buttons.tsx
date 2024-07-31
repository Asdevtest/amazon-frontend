import { FC, memo } from 'react'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

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
      <Button variant={ButtonVariant.OUTLINED} onClick={() => onToggleUploadedToListing(id, uploadedToListing)}>
        <Checkbox color="primary" checked={uploadedToListing} className={styles.listingCheckbox} />
        <p className={styles.listingText}>{t(TranslationKey['Uploaded by on listing'])}</p>
      </Button>
      {isDisplayingMarkAsCompletedButton && (
        <Button
          fullWidth
          disabled={disableMarkAsCompletedButton}
          styleType={ButtonStyle.SUCCESS}
          onClick={onClickMarkAsCompletedBtn}
        >
          {t(TranslationKey['Mark as completed'])}
        </Button>
      )}
      {status === RequestStatus.DRAFT && (
        <div className={styles.btnsWrapper}>
          <div className={styles.btnsRow}>
            <Button
              fullWidth
              styleType={ButtonStyle.DANGER}
              title={t(TranslationKey['Delete the selected request'])}
              onClick={onClickCancelBtn}
            >
              {t(TranslationKey.Delete)}
            </Button>

            <Button
              fullWidth
              title={t(TranslationKey['Allows you to change the selected request'])}
              onClick={onClickEditBtn}
            >
              {t(TranslationKey.Edit)}
            </Button>
          </div>
          <Button
            fullWidth
            styleType={ButtonStyle.SUCCESS}
            title={t(TranslationKey['Publish the selected request on the exchange'])}
            onClick={onClickPublishBtn}
          >
            {t(TranslationKey.Publish)}
          </Button>
        </div>
      )}
      {status !== RequestStatus.DRAFT && (
        <>
          {requestIsNotDraftAndPublished || status === RequestStatus.PUBLISHED ? (
            <div className={styles.btnsWrapper}>
              <div className={styles.btnsRow}>
                {requestIsNotDraftAndPublished && (
                  <Button
                    fullWidth
                    styleType={ButtonStyle.DANGER}
                    title={t(TranslationKey['Delete the selected request'])}
                    onClick={onClickCancelBtn}
                  >
                    {t(TranslationKey.Delete)}
                  </Button>
                )}

                {status === RequestStatus.PUBLISHED && (
                  <Button
                    fullWidth
                    title={t(TranslationKey['Allows you to change the selected request'])}
                    onClick={onClickEditBtn}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                )}
              </div>
            </div>
          ) : null}

          {(status === RequestStatus.IN_PROCESS ||
            status === RequestStatus.EXPIRED ||
            status === RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED) && (
            <Button fullWidth onClick={() => setIsRestoreModalOpen(true)}>
              {t(TranslationKey['Change request terms'])}
            </Button>
          )}

          {status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED /* && status !== RequestStatus.EXPIRED */ && (
            <div className={cx(styles.btnsRow, styles.btnsRowIsLast)}>
              <Button
                fullWidth
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
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
})
