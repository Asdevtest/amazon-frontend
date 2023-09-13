import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { DealDetailsCard } from '@components/cards/deal-details-card'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { RequestProposalResultToCorrectForm } from '@components/forms/request-proposal-result-to-correct-form'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { VacantDealsDetailsViewModel } from './deals-on-review-details-view.model'

export const DealsOnReviewDetailsView = observer(props => {
  const [viewModel] = useState(
    () =>
      new VacantDealsDetailsViewModel({
        history: props.history,
        location: props.location,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <DealDetailsCard
          request={viewModel.request}
          requestProposals={viewModel.requestProposals}
          proposalId={viewModel.curProposalId}
          onClickConfirmDealModal={viewModel.onClickConfirmDealModal}
          onClickRejectDealModal={viewModel.onClickRejectDealModal}
          onClickReworkDealModal={viewModel.onClickReworkDealModal}
        />
      </div>

      {viewModel.showConfirmModal && (
        <RequestProposalAcceptOrRejectResultForm
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
      )}

      {viewModel.showRejectModal && (
        <RequestProposalAcceptOrRejectResultForm
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
      )}

      <Modal openModal={viewModel.showReworkModal} setOpenModal={() => viewModel.onTriggerOpenModal('showReworkModal')}>
        <RequestProposalResultToCorrectForm onPressSubmitForm={viewModel.onClickReworkDeal} />
      </Modal>
    </React.Fragment>
  )
})
