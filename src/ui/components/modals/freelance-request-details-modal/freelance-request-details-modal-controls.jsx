import { cx } from '@emotion/css'
import { useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { useFreelanceRequestDetailsModalStyles } from '@components/modals/freelance-request-details-modal/freelance-request-details-modal.styles'
import { RestoreRequestModal } from '@components/requests-and-request-proposals/restore-request-modal/restore-request-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'

import { t } from '@utils/translations'

export const FreelanceRequestDetailsModalControls = props => {
  const {
    request,
    onClickSuggest,
    onClickOpenNewTab,
    onClickPublishBtn,
    onClickEditBtn,
    onClickCancelBtn,
    onToggleUploadedToListing,
    isRequestOwner,
    onRecoverRequest,
    onClickAbortBtn,
  } = props
  const { classes: styles } = useFreelanceRequestDetailsModalStyles()
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)

  return (
    <div className={styles.suggestDeal}>
      <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(request?._id)} />

      <div className={styles.controlsWrapper}>
        {isRequestOwner && (
          <>
            <Button
              border
              className={styles.listingButton}
              onClick={() => onToggleUploadedToListing(request._id, request.uploadedToListing)}
            >
              <Checkbox color="primary" checked={request.uploadedToListing} className={styles.listingCheckbox} />
              <Typography className={cx(styles.listingText)}>{t(TranslationKey['Uploaded by on listing'])}</Typography>
            </Button>
            {request && (request?.status === RequestStatus.DRAFT || request?.status === RequestStatus.PUBLISHED) && (
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

                {request?.status === RequestStatus.DRAFT && (
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

            {(request?.status === RequestStatus.IN_PROCESS ||
              request?.status === RequestStatus.EXPIRED ||
              request?.status === RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED) && (
              <>
                <Button className={styles.recoverBtn} onClick={() => setIsRestoreModalOpen(true)}>
                  {t(TranslationKey['Change request terms'])}
                </Button>

                <Modal openModal={isRestoreModalOpen} setOpenModal={() => setIsRestoreModalOpen(false)}>
                  <RestoreRequestModal
                    currentDate={request?.timeoutAt}
                    currentRequestsCount={request.maxAmountOfProposals}
                    handleCloseModal={() => setIsRestoreModalOpen(false)}
                    handleSubmit={onRecoverRequest}
                  />
                </Modal>
              </>
            )}

            {request?.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED &&
              request?.status !== RequestStatus.EXPIRED &&
              request?.status !== RequestStatus.DRAFT && (
                <Button
                  tooltipInfoContent={
                    request?.status !== RequestStatus.FORBID_NEW_PROPOSALS &&
                    t(TranslationKey['Removes the visibility of the request on the exchange'])
                  }
                  color="primary"
                  className={cx({
                    [styles.stopBtn]: request?.status !== RequestStatus.FORBID_NEW_PROPOSALS,
                  })}
                  onClick={request?.status !== 'FORBID_NEW_PROPOSALS' ? onClickAbortBtn : onClickPublishBtn}
                >
                  {request?.status === RequestStatus.FORBID_NEW_PROPOSALS
                    ? t(TranslationKey['Resume accepting proposals'])
                    : t(TranslationKey['Stop accepting proposals'])}
                </Button>
              )}
          </>
        )}
        {onClickSuggest ? <Button onClick={onClickSuggest}>{t(TranslationKey['Suggest a deal'])}</Button> : <div />}
      </div>
    </div>
  )
}
