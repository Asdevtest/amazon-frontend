import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {DealDetailsCard} from '@components/cards/deal-details-card'
import {RequestProposalAcceptOrRejectResultForm} from '@components/forms/request-proposal-accept-or-reject-result-form'
import {RequestProposalResultToCorrectForm} from '@components/forms/request-proposal-result-to-correct-form'
import {MainContent} from '@components/layout/main-content'
import {Modal} from '@components/shared/modal'

import {t} from '@utils/translations'

import {VacantDealsDetailsViewModel} from './deals-on-review-details-view.model'

@observer
export class DealsOnReviewDetailsView extends Component {
  viewModel = new VacantDealsDetailsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showConfirmModal,
      showRejectModal,
      showReworkModal,
      request,
      requestProposals,
      curProposalId,
      // requestId,
      onTriggerOpenModal,
      onClickConfirmDealModal,
      onClickRejectDealModal,
      onClickConfirmDeal,
      onClickRejectDeal,
      onClickReworkDeal,
      onClickReworkDealModal,
    } = this.viewModel
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <DealDetailsCard
            request={request}
            requestProposals={requestProposals}
            proposalId={curProposalId}
            onClickConfirmDealModal={onClickConfirmDealModal}
            onClickRejectDealModal={onClickRejectDealModal}
            onClickReworkDealModal={onClickReworkDealModal}
          />
        </MainContent>

        <Modal openModal={showConfirmModal} setOpenModal={() => onTriggerOpenModal('showConfirmModal')}>
          <RequestProposalAcceptOrRejectResultForm
            isSupervisor
            title={t(TranslationKey['Confirm acceptance of the work result'])}
            rateLabel={t(TranslationKey['Rate the performer'])}
            reviewLabel={t(TranslationKey["Review of the performer's work"])}
            confirmButtonText={t(TranslationKey['Accept the deal'])}
            cancelBtnText={t(TranslationKey.Cancel)}
            onSubmit={onClickConfirmDeal}
            onClose={() => onTriggerOpenModal('showConfirmModal')}
          />
        </Modal>

        <Modal openModal={showRejectModal} setOpenModal={() => onTriggerOpenModal('showRejectModal')}>
          <RequestProposalAcceptOrRejectResultForm
            isReject
            isSupervisor
            title={t(TranslationKey['Reject the deal'])}
            rateLabel={t(TranslationKey['Rate the performer'])}
            reviewLabel={t(TranslationKey['Reason for cancelling the deal'])}
            rejectButtonText={t(TranslationKey['Reject the deal'])}
            cancelBtnText={t(TranslationKey.Cancel)}
            onSubmit={onClickRejectDeal}
            onClose={() => onTriggerOpenModal('showRejectModal')}
          />
        </Modal>

        <Modal openModal={showReworkModal} setOpenModal={() => onTriggerOpenModal('showReworkModal')}>
          <RequestProposalResultToCorrectForm onPressSubmitForm={onClickReworkDeal} />
        </Modal>
      </React.Fragment>
    )
  }
}
