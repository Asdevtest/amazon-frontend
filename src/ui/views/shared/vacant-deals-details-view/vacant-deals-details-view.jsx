import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { DealDetailsCard } from '@components/cards/deal-details-card'
import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { VacantDealsDetailsViewModel } from './vacant-deals-details-view.model'

export const VacantDealsDetailsView = observer(props => {
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
    <>
      <div>
        <DealDetailsCard
          dealsOnReview
          proposalId={viewModel.curProposalId}
          requestProposals={viewModel.requestProposals}
          requester={viewModel.requester}
          onClickGetToWorkModal={viewModel.onClickGetToWorkModal}
        />
      </div>

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Taking the deal check to work?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => viewModel.onClickGetToWork(viewModel.curProposalId, viewModel.requestId)}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </>
  )
})
