import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Box, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'
import {ToggleBtnGroupFreelance} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtnFreelancer} from '@components/toggle-btn-group/toggle-btn/toggle-btn'
import {ViewCartsLine} from '@components/view-carts-icons/view-carts-line/view-carts-line'
import {ViewCarts} from '@components/view-carts-icons/view-carts/view-carts'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {VacantRequestsViewModel} from './vacant-requests-view.model'
import {styles} from './vacant-requests-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS

@observer
class VacantRequestsViewRaw extends Component {
  viewModel = new VacantRequestsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      nameSearchValue,
      viewMode,
      getCurrentData,
      sortMode,
      drawerOpen,
      onTriggerSortMode,
      onTriggerDrawerOpen,
      onClickViewMore,
      onChangeViewMode,
      onChangeNameSearchValue,
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
          <Appbar title={t(TranslationKey['Vacant requests'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelViewWrapper}>
                  <ToggleBtnGroupFreelance exclusive value={viewMode} onChange={onChangeViewMode}>
                    <ToggleBtnFreelancer value={tableViewMode.BLOCKS} disabled={viewMode === tableViewMode.BLOCKS}>
                      <ViewCarts fill={viewMode === tableViewMode.BLOCKS ? 'url(#ViewCartsGradient)' : '#C4C4C4'} />
                    </ToggleBtnFreelancer>
                    <ToggleBtnFreelancer value={tableViewMode.LIST} disabled={viewMode === tableViewMode.LIST}>
                      <ViewCartsLine
                        fill={viewMode === tableViewMode.LIST ? 'url(#ViewCartsLineGradient)' : '#C4C4C4'}
                      />
                    </ToggleBtnFreelancer>
                  </ToggleBtnGroupFreelance>
                </div>

                <SearchInput
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  onChange={onChangeNameSearchValue}
                />

                <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
                  <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

                  {sortMode === tableSortMode.DESK ? (
                    <ArrowDropDownIcon color="primary" />
                  ) : (
                    <ArrowDropUpIcon color="primary" />
                  )}
                </div>
              </div>

              {getSortedData(sortMode)?.length ? (
                <Box
                  container
                  classes={{root: classNames.dashboardCardWrapper}}
                  display="grid"
                  gridTemplateColumns={
                    viewMode === tableViewMode.LIST
                      ? 'repeat(auto-fill, minmax(100%, 1fr))'
                      : 'repeat(auto-fill, minmax(330px, 1fr))'
                  }
                  gridGap="20px"
                >
                  {getSortedData(sortMode)?.map((item, index) =>
                    viewMode === tableViewMode.LIST ? (
                      <VacantRequestListCard
                        key={item._id}
                        isFirst={index === 0}
                        item={item}
                        onClickViewMore={onClickViewMore}
                      />
                    ) : (
                      <VacantRequestShortCard
                        key={item._id}
                        isFirst={index === 0}
                        item={item}
                        onClickViewMore={onClickViewMore}
                      />
                    ),
                  )}
                </Box>
              ) : (
                <div className={classNames.emptyTableWrapper}>
                  <img src="/assets/icons/empty-table.svg" />
                  <Typography variant="h5" className={classNames.emptyTableText}>
                    {t(TranslationKey['No vacant applications yet'])}
                  </Typography>
                </div>
              )}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const VacantRequestsView = withStyles(VacantRequestsViewRaw, styles)
