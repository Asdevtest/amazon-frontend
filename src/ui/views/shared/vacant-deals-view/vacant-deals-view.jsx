import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
// import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {VacantDealsListCard} from '@components/cards/vacant-deals-list-card'
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

import {VacantDealsViewModel} from './vacant-deals-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_VACANT_DEALS

@observer
export class VacantDealsView extends Component {
  viewModel = new VacantDealsViewModel({history: this.props.history})

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
      showConfirmModal,
      deals,
      // onTriggerSortMode,
      onTriggerDrawerOpen,
      onClickViewMore,
      onTriggerOpenModal,
      onClickGetToWorkModal,
      // onChangeViewMode,
      // onChangeNameSearchValue,
    } = this.viewModel
    // const {classes: classNames} = this.props

    // const getSortedData = mode => {
    //   switch (mode) {
    //     case tableSortMode.DESK:
    //       return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

    //     case tableSortMode.ASC:
    //       return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
    //   }
    // }
    console.log(deals)
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
              {deals.map((deal, index) => (
                <VacantDealsListCard
                  key={index}
                  item={deal}
                  onClickViewMore={onClickViewMore}
                  onClickGetToWorkModal={onClickGetToWorkModal}
                />
              ))}
            </MainContent>
          </Appbar>
        </Main>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Taking the deal check to work?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          // onClickSuccessBtn={onSubmitDeleteProposal}
          // onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}
