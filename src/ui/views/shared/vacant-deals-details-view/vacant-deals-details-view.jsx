import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
// import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DealDetailsCard} from '@components/cards/deal-details-card'
// import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
// import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
// import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

// import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
// import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
// import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {VacantDealsDetailsViewModel} from './vacant-deals-details-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_VACANT_DEALS

@observer
export class VacantDealsDetailsView extends Component {
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
      proposalId,
      requestId,
      drawerOpen,
      requester,
      showConfirmModal,
      requestProposals,
      // onTriggerSortMode,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickGetToWorkModal,
      onClickGetToWork,
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
                dealsOnReview
                item={requestProposals[0]}
                requester={requester}
                onClickGetToWorkModal={onClickGetToWorkModal}
              />
            </MainContent>
          </Appbar>

          <ConfirmationModal
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={t(TranslationKey['Taking the deal check to work?'])}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={() => onClickGetToWork(proposalId, requestId)}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />
        </Main>
      </React.Fragment>
    )
  }
}
