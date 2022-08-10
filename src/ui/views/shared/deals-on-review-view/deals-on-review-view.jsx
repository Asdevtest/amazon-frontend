import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {VacantDealsListCard} from '@components/cards/vacant-deals-list-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {DealsOnReviewModel} from './deals-on-review-view.model'
import {styles} from './deals-on-review-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW

@observer
class DealsOnReviewViewRaw extends Component {
  viewModel = new DealsOnReviewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      // deals,
      onTriggerDrawerOpen,
      getCurrentData,
      onTriggerSortMode,
      sortMode,
      viewMode,
      onClickViewMore,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getSortedData = mode => {
      switch (mode) {
        case tableSortMode.DESK:
          return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

        case tableSortMode.ASC:
          return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
      }
    }

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
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
                  <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

                  {sortMode === tableSortMode.DESK ? (
                    <ArrowDropDownIcon color="primary" />
                  ) : (
                    <ArrowDropUpIcon color="primary" />
                  )}
                </div>
              </div>

              <div className={classNames.dealsOnReviewWrapper}>
                {getSortedData(sortMode).length ? (
                  getSortedData(sortMode).map((deal, index) =>
                    viewMode === tableViewMode.LIST ? (
                      <VacantDealsListCard
                        key={index}
                        showDetails
                        item={deal}
                        onClickViewMore={onClickViewMore}
                        // onClickGetToWorkModal={onClickGetToWorkModal}
                      />
                    ) : null,
                  )
                ) : (
                  <div className={classNames.emptyTableWrapper}>
                    <img src="/assets/icons/empty-table.svg" />
                    <Typography variant="h5" className={classNames.emptyTableText}>
                      {t(TranslationKey['No deals yet'])}
                    </Typography>
                  </div>
                )}
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const DealsOnReviewView = withStyles(styles)(DealsOnReviewViewRaw)
