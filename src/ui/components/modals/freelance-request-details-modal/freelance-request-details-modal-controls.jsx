import { memo, useState } from 'react'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { RestoreRequestModal } from '@components/requests-and-request-proposals/restore-request-modal/'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'

import { getTomorrowDate } from '@utils/date-time'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './freelance-request-details-modal.style'

export const FreelanceRequestDetailsModalControls = memo(props => {
  const {
    request,
    userInfo,
    isAcceptedProposals,
    onClickSuggest,
    onClickOpenNewTab,
    onClickPublishBtn,
    onClickEditBtn,
    onClickCancelBtn,
    isRequestOwner,
    onRecoverRequest,
    onClickAbortBtn,
    onClickMarkAsCompletedBtn,
  } = props
  const { classes: styles, cx } = useStyles()
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)

  const showMarkAsCompletedButtton =
    isAcceptedProposals && request?.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED

  const showChangeRequestTermsButton =
    request?.status === RequestStatus.IN_PROCESS ||
    request?.status === RequestStatus.EXPIRED ||
    request?.status === RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED

  const showAcceptingProposalsButton =
    request?.status !== RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED &&
    // request?.status !== RequestStatus.EXPIRED &&
    request?.status !== RequestStatus.DRAFT

  const showMainActionsButton =
    request && (request?.status === RequestStatus.DRAFT || request?.status === RequestStatus.PUBLISHED)

  const showPublishButton = request?.status === RequestStatus.DRAFT

  const disableMarkAsCompletedButton = request?.createdBy?._id !== userInfo?._id && request?.sub?._id !== userInfo?._id

  return (
    <div className={styles.suggestDeal}>
      <div className={styles.controlsWrapper}>
        <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(request?._id)} />
      </div>

      <div className={styles.controlsWrapper}>
        {showMarkAsCompletedButtton && (
          <CustomButton
            block
            type="primary"
            disabled={disableMarkAsCompletedButton}
            onClick={() => onClickMarkAsCompletedBtn(request?._id)}
          >
            {t(TranslationKey['Mark as completed'])}
          </CustomButton>
        )}

        {isRequestOwner && (
          <>
            {showMainActionsButton && (
              <>
                <CustomButton block danger type="primary" onClick={onClickCancelBtn}>
                  {t(TranslationKey.Delete)}
                </CustomButton>

                <CustomButton block onClick={onClickEditBtn}>
                  {t(TranslationKey.Edit)}
                </CustomButton>

                {showPublishButton && (
                  <CustomButton block type="primary" onClick={onClickPublishBtn}>
                    {t(TranslationKey.Publish)}
                  </CustomButton>
                )}
              </>
            )}

            {showChangeRequestTermsButton && (
              <>
                <CustomButton block onClick={() => setIsRestoreModalOpen(true)}>
                  {t(TranslationKey['Change request terms'])}
                </CustomButton>

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
              <CustomButton
                block
                onClick={request?.status !== RequestStatus.FORBID_NEW_PROPOSALS ? onClickAbortBtn : onClickPublishBtn}
              >
                {request?.status === RequestStatus.FORBID_NEW_PROPOSALS
                  ? t(TranslationKey['Resume accepting proposals'])
                  : t(TranslationKey['Stop accepting proposals'])}
              </CustomButton>
            )}
          </>
        )}

        {onClickSuggest && (
          <CustomButton block onClick={onClickSuggest}>
            {t(TranslationKey['Suggest a deal'])}
          </CustomButton>
        )}
      </div>
    </div>
  )
})
