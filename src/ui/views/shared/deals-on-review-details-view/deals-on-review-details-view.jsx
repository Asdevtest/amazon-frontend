import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
// import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DealDetailsCard} from '@components/cards/deal-details-card'
import {RequestProposalResultToCorrectForm} from '@components/forms/request-proposal-result-to-correct-form'
// import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
// import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
// import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {Navbar} from '@components/navbar'

// import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
// import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
// import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {VacantDealsDetailsViewModel} from './deals-on-review-details-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW

@observer
export class DealsOnReviewDetailsView extends Component {
  viewModel = new VacantDealsDetailsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      // nameSearchValue,
      // viewMode,
      // getCurrentData,
      // sortMode,

      drawerOpen,

      proposalId,
      showConfirmModal,
      showRejectModal,
      showReworkModal,
      requestProposals,
      // onTriggerSortMode,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickConfirmDealModal,
      onClickRejectDealModal,
      onClickConfirmDeal,
      onClickRejectDeal,
      onClickReworkDeal,
      onClickReworkDealModal,
      // onClickViewMore,
      // onChangeViewMode,
      // onChangeNameSearchValue,
    } = this.viewModel
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Vacant deals'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <DealDetailsCard
                item={requestProposals[0]}
                onClickConfirmDealModal={onClickConfirmDealModal}
                onClickRejectDealModal={onClickRejectDealModal}
                onClickReworkDealModal={onClickReworkDealModal}
              />
            </MainContent>
          </Appbar>

          <ConfirmWithCommentModal
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            titleText={t(TranslationKey['Accept the deal'])}
            commentLabelText={t(TranslationKey['Cover letter'])}
            okBtnText={t(TranslationKey['Accept the deal'])}
            cancelBtnText={t(TranslationKey.Cancel)}
            onSubmit={() => onClickConfirmDeal(proposalId)}
          />
          <ConfirmWithCommentModal
            isWarning
            openModal={showRejectModal}
            setOpenModal={() => onTriggerOpenModal('showRejectModal')}
            titleText={t(TranslationKey['Reject the deal'])}
            commentLabelText={t(TranslationKey['Cover letter'])}
            okBtnText={t(TranslationKey['Reject the deal'])}
            cancelBtnText={t(TranslationKey.Cancel)}
            onSubmit={() => onClickRejectDeal(proposalId)}
          />

          <Modal openModal={showReworkModal} setOpenModal={() => onTriggerOpenModal('showReworkModal')}>
            <RequestProposalResultToCorrectForm onPressSubmitForm={() => onClickReworkDeal(proposalId)} />
          </Modal>
        </Main>
      </React.Fragment>
    )
  }
}
