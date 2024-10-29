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
            fullWidth
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
                <CustomButton
                  fullWidth
                  danger
                  type="primary"
                  title={t(TranslationKey['Delete the selected request'])}
                  onClick={onClickCancelBtn}
                >
                  {t(TranslationKey.Delete)}
                </CustomButton>

                <CustomButton
                  fullWidth
                  title={t(TranslationKey['Allows you to change the selected request'])}
                  onClick={onClickEditBtn}
                >
                  {t(TranslationKey.Edit)}
                </CustomButton>

                {showPublishButton && (
                  <CustomButton
                    block
                    type="primary"
                    size="large"
                    title={t(TranslationKey['Publish the selected request on the exchange'])}
                    onClick={onClickPublishBtn}
                  >
                    {t(TranslationKey.Publish)}
                  </CustomButton>
                )}
              </>
            )}

            {showChangeRequestTermsButton && (
              <>
                <CustomButton fullWidth onClick={() => setIsRestoreModalOpen(true)}>
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
                fullWidth
                tooltipInfoContent={
                  request?.status !== RequestStatus.FORBID_NEW_PROPOSALS &&
                  t(TranslationKey['Removes the visibility of the request on the exchange'])
                }
                className={cx({
                  [styles.stopBtn]: request?.status !== RequestStatus.FORBID_NEW_PROPOSALS,
                })}
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
          <CustomButton fullWidth onClick={onClickSuggest}>
            {t(TranslationKey['Suggest a deal'])}
          </CustomButton>
        )}
      </div>
    </div>
  )
})
