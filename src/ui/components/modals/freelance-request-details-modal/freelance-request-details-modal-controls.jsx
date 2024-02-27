import { memo, useState } from 'react'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { RestoreRequestModal } from '@components/requests-and-request-proposals/restore-request-modal/'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'

import { getTomorrowDate } from '@utils/date-time'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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

  const disableMarkAsCompletedButton = request?.createdBy?._id !== userInfo?._id

  return (
    <div className={styles.suggestDeal}>
      <div className={styles.controlsWrapper}>
        <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(request?._id)} />
      </div>

      <div className={styles.controlsWrapper}>
        {showMarkAsCompletedButtton && (
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={disableMarkAsCompletedButton}
            className={styles.publishBtn}
            onClick={() => onClickMarkAsCompletedBtn(request?._id)}
          >
            {t(TranslationKey['Mark as completed'])}
          </Button>
        )}

        {isRequestOwner && (
          <>
            {showMainActionsButton && (
              <>
                <Button
                  styleType={ButtonStyle.DANGER}
                  tooltipInfoContent={t(TranslationKey['Delete the selected request'])}
                  className={styles.deleteBtn}
                  onClick={onClickCancelBtn}
                >
                  {t(TranslationKey.Delete)}
                </Button>

                <Button
                  tooltipInfoContent={t(TranslationKey['Allows you to change the selected request'])}
                  className={styles.editBtn}
                  onClick={onClickEditBtn}
                >
                  {t(TranslationKey.Edit)}
                </Button>

                {showPublishButton && (
                  <Button
                    styleType={ButtonStyle.SUCCESS}
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
