import { memo, useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { RestoreRequestModal } from '@components/requests-and-request-proposals/restore-request-modal/'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'

import { getTomorrowDate } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './freelance-request-details-modal.styles'

export const FreelanceRequestDetailsModalControls = memo(props => {
  const {
    request,
    isAcceptedProposals,
    requestProposals,
    onClickSuggest,
    onClickOpenNewTab,
    onClickPublishBtn,
    onClickEditBtn,
    onClickCancelBtn,
    onToggleUploadedToListing,
    isRequestOwner,
    onRecoverRequest,
    onClickAbortBtn,
    onClickMarkAsCompletedBtn,
    onClickResultBtn,
  } = props
  const { classes: styles, cx } = useStyles()
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)

  const showMarkAsCompletedButtton =
    isAcceptedProposals &&
    request?.status !== RequestStatus.FORBID_NEW_PROPOSALS &&
    request?.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED
  const showChangeRequestTermsButton =
    request?.status === RequestStatus.IN_PROCESS ||
    request?.status === RequestStatus.EXPIRED ||
    request?.status === RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED
  const showAcceptingProposalsButton =
    request?.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED &&
    request?.status !== RequestStatus.EXPIRED &&
    request?.status !== RequestStatus.DRAFT
  const showMainActionsButton =
    request && (request?.status === RequestStatus.DRAFT || request?.status === RequestStatus.PUBLISHED)
  const showPublishButton = request?.status === RequestStatus.DRAFT

  return (
    <div className={styles.suggestDeal}>
      <div className={styles.controlsWrapper}>
        <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(request?._id)} />

        <Button disabled={!requestProposals} onClick={() => onClickResultBtn(request)}>
          {t(TranslationKey.Result)}
        </Button>
      </div>

      <div className={styles.controlsWrapper}>
        {showMarkAsCompletedButtton && (
          <Button success className={styles.publishBtn} onClick={() => onClickMarkAsCompletedBtn(request?._id)}>
            {t(TranslationKey['Mark as completed'])}
          </Button>
        )}

        {isRequestOwner && (
          <>
            <Button
              border
              className={styles.listingButton}
              onClick={() => onToggleUploadedToListing(request?._id, request?.uploadedToListing)}
            >
              <Checkbox color="primary" checked={request?.uploadedToListing} className={styles.listingCheckbox} />
              <Typography className={styles.listingText}>{t(TranslationKey['Uploaded by on listing'])}</Typography>
            </Button>

            {showMainActionsButton && (
              <>
                <Button
                  danger
                  tooltipInfoContent={t(TranslationKey['Delete the selected request'])}
                  className={styles.deleteBtn}
                  onClick={onClickCancelBtn}
                >
                  {t(TranslationKey.Delete)}
                </Button>

                <Button
                  tooltipInfoContent={t(TranslationKey['Allows you to change the selected request'])}
                  color="primary"
                  className={styles.editBtn}
                  onClick={onClickEditBtn}
                >
                  {t(TranslationKey.Edit)}
                </Button>

                {showPublishButton && (
                  <Button
                    success
                    tooltipInfoContent={t(TranslationKey['Publish the selected request on the exchange'])}
                    className={styles.publishBtn}
                    onClick={onClickPublishBtn}
                  >
                    {t(TranslationKey.Publish)}
                  </Button>
                )}
              </>
            )}

            {showChangeRequestTermsButton && (
              <>
                <Button className={styles.recoverBtn} onClick={() => setIsRestoreModalOpen(true)}>
                  {t(TranslationKey['Change request terms'])}
                </Button>

                <Modal openModal={isRestoreModalOpen} setOpenModal={() => setIsRestoreModalOpen(false)}>
                  <RestoreRequestModal
                    minDate={getTomorrowDate()}
                    currentDate={request?.timeoutAt}
                    currentRequestsCount={request?.maxAmountOfProposals}
                    handleCloseModal={() => setIsRestoreModalOpen(false)}
                    handleSubmit={onRecoverRequest}
                  />
                </Modal>
              </>
            )}

            {showAcceptingProposalsButton && (
              <Button
                tooltipInfoContent={
                  request?.status !== RequestStatus.FORBID_NEW_PROPOSALS &&
                  t(TranslationKey['Removes the visibility of the request on the exchange'])
                }
                color="primary"
                className={cx({
                  [styles.stopBtn]: request?.status !== RequestStatus.FORBID_NEW_PROPOSALS,
                })}
                onClick={request?.status !== RequestStatus.FORBID_NEW_PROPOSALS ? onClickAbortBtn : onClickPublishBtn}
              >
                {request?.status === RequestStatus.FORBID_NEW_PROPOSALS
                  ? t(TranslationKey['Resume accepting proposals'])
                  : t(TranslationKey['Stop accepting proposals'])}
              </Button>
            )}
          </>
        )}

        {onClickSuggest && <Button onClick={onClickSuggest}>{t(TranslationKey['Suggest a deal'])}</Button>}
      </div>
    </div>
  )
})
