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
import {Navbar} from '@components/navbar'

// import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
// import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
// import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {DealsOnReviewModel} from './deals-on-review-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW

@observer
export class DealsOnReviewView extends Component {
  viewModel = new DealsOnReviewModel({history: this.props.history})

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
      deals,
      // onTriggerSortMode,
      onTriggerDrawerOpen,
      onClickViewMore,
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
          <Appbar title={t(TranslationKey['Deals on review'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {deals.map((deal, index) => (
                <VacantDealsListCard
                  key={index}
                  dealsOnReview
                  item={deal}
                  onClickViewMore={onClickViewMore}
                  // onClickGetToWorkModal={onClickGetToWorkModal}
                />
              ))}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
