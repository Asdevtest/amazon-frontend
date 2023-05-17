import React, {Component} from 'react'

import {observer} from 'mobx-react'

// import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {DealDetailsCard} from '@components/cards/deal-details-card'
// import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
// import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
// import {Field} from '@components/field'
import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

// import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
// import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
// import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {VacantDealsDetailsViewModel} from './vacant-deals-details-view.model'

@observer
export class VacantDealsDetailsView extends Component {
  viewModel = new VacantDealsDetailsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      requestId,
      requester,
      showConfirmModal,
      requestProposals,
      curProposalId,
      onTriggerOpenModal,
      onClickGetToWorkModal,
      onClickGetToWork,
    } = this.viewModel
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <DealDetailsCard
            dealsOnReview
            proposalId={curProposalId}
            requestProposals={requestProposals}
            requester={requester}
            onClickGetToWorkModal={onClickGetToWorkModal}
          />
        </MainContent>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Taking the deal check to work?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => onClickGetToWork(curProposalId, requestId)}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}
