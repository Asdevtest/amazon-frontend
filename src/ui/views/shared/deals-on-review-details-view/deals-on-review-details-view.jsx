import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { DealDetailsCard } from '@components/cards/deal-details-card'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { RequestProposalResultToCorrectForm } from '@components/forms/request-proposal-result-to-correct-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { VacantDealsDetailsViewModel } from './deals-on-review-details-view.model'

export const DealsOnReviewDetailsView = observer(({ history }) => {
  const [viewModel] = useState(() => new VacantDealsDetailsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <DealDetailsCard
        request={viewModel.request}
        requestProposals={viewModel.requestProposals}
        proposalId={viewModel.curProposalId}
        onClickConfirmDealModal={viewModel.onClickConfirmDealModal}
        onClickRejectDealModal={viewModel.onClickRejectDealModal}
        onSubmitSendInForRework={viewModel.onSubmitSendInForRework}
      />

      {viewModel.showConfirmModal ? (
        <RequestProposalAcceptOrRejectResultForm
          // @ts-ignore
          isSupervisor
          openModal={viewModel.showConfirmModal}
          title={t(TranslationKey['Confirm acceptance of the work result'])}
          rateLabel={t(TranslationKey['Rate the performer'])}
          reviewLabel={t(TranslationKey["Review of the performer's work"])}
          confirmButtonText={t(TranslationKey['Accept the deal'])}
          cancelBtnText={t(TranslationKey.Cancel)}
          onSubmit={viewModel.onClickConfirmDeal}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showRejectModal ? (
        <RequestProposalAcceptOrRejectResultForm
          // @ts-ignore
          isReject
          isSupervisor
          title={t(TranslationKey['Reject the deal'])}
          rateLabel={t(TranslationKey['Rate the performer'])}
          reviewLabel={t(TranslationKey['Reason for cancelling the deal'])}
          rejectButtonText={t(TranslationKey['Reject the deal'])}
          cancelBtnText={t(TranslationKey.Cancel)}
          openModal={viewModel.showRejectModal}
          onSubmit={viewModel.onClickRejectDeal}
          onClose={() => viewModel.onTriggerOpenModal('showRejectModal')}
        />
      ) : null}

      <Modal openModal={viewModel.showReworkModal} setOpenModal={() => viewModel.onTriggerOpenModal('showReworkModal')}>
        <RequestProposalResultToCorrectForm onPressSubmitForm={viewModel.onClickReworkDeal} />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </>
  )
})
