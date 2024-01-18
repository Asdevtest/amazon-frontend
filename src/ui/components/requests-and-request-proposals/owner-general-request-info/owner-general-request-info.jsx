import { useState } from 'react'

import { RequestStatus } from '@constants/requests/request-status'

import { RestoreRequestModal } from '@components/requests-and-request-proposals/restore-request-modal/restore-request-modal'
import { Modal } from '@components/shared/modal'

import { calcNumberMinusPercent } from '@utils/calculation'
import { getTomorrowDate } from '@utils/date-time'

import { useStyles } from './owner-general-request-info.style'

import { ActionButtons } from './components/action-buttons/action-buttons'
import { Announcement } from './components/announcement/announcement'
import { RequestInformation } from './components/request-information/request-information'
import { RequestTerms } from './components/request-terms/request-terms'

export const OwnerGeneralRequestInfo = props => {
  const { classes: styles } = useStyles()

  const {
    userInfo,
    request,
    requestProposals,
    requestAnnouncement,
    onClickPublishBtn,
    onClickEditBtn,
    onClickCancelBtn,
    onClickMarkAsCompletedBtn,
    onClickAbortBtn,
    onRecoverRequest,
    onToggleUploadedToListing,
  } = props

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  const requestIsNotDraftAndPublished =
    !request?.request.status === RequestStatus.DRAFT || request?.request.status === RequestStatus.PUBLISHED

  const isDisplayingMarkAsCompletedButton =
    (request?.request.createdBy?._id === userInfo?._id || request?.request.sub?._id === userInfo?._id) &&
    (request?.request.status === RequestStatus.EXPIRED ||
      request?.request.status === RequestStatus.IN_PROCESS ||
      request?.request.status === RequestStatus.FORBID_NEW_PROPOSALS) &&
    requestProposals.some(({ proposal }) => proposal.status === RequestStatus.ACCEPTED_BY_CLIENT)

  return (
    <div className={styles.root}>
      <RequestInformation
        priority={request?.request?.priority}
        maxAmountOfProposals={request?.request?.maxAmountOfProposals}
        requestProposals={requestProposals}
        title={request?.request?.title}
        asin={request?.request.asin}
        humanFriendlyId={request?.request.humanFriendlyId}
        sub={request?.request?.sub}
        createdBy={request?.request?.createdBy}
      />

      {request?.request && (
        <RequestTerms
          withoutConfirmation={request?.request?.withoutConfirmation}
          typeTask={request?.request?.typeTask}
          timeoutAt={request?.request?.timeoutAt}
          newProductPrice={newProductPrice}
          priceAmazon={request?.request?.priceAmazon}
          cashBackInPercent={request?.request?.cashBackInPercent}
          price={request?.request?.price}
          updatedAt={request?.request?.updatedAt}
          status={request?.request?.status}
        />
      )}

      <Announcement title={requestAnnouncement?.title} createdBy={requestAnnouncement?.createdBy} />

      <ActionButtons
        id={request.request._id}
        uploadedToListing={request?.request.uploadedToListing}
        isDisplayingMarkAsCompletedButton={isDisplayingMarkAsCompletedButton}
        status={request?.request?.status}
        requestIsNotDraftAndPublished={requestIsNotDraftAndPublished}
        setIsRestoreModalOpen={setIsRestoreModalOpen}
        onClickCancelBtn={onClickCancelBtn}
        onClickEditBtn={onClickEditBtn}
        onToggleUploadedToListing={onToggleUploadedToListing}
        onClickMarkAsCompletedBtn={onClickMarkAsCompletedBtn}
        onClickPublishBtn={onClickPublishBtn}
        onClickAbortBtn={onClickAbortBtn}
      />

      <Modal openModal={isRestoreModalOpen} setOpenModal={() => setIsRestoreModalOpen(false)}>
        <RestoreRequestModal
          minDate={getTomorrowDate()}
          currentRequestsCount={request.request.maxAmountOfProposals}
          handleCloseModal={() => setIsRestoreModalOpen(false)}
          handleSubmit={onRecoverRequest}
        />
      </Modal>
    </div>
  )
}
