import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'
import TableRowsIcon from '@mui/icons-material/TableRows'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import React, {Component} from 'react'

import {Box, InputAdornment, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {VacantRequestsViewModel} from './vacant-requests-view.model'
import {styles} from './vacant-requests-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS

@observer
class VacantRequestsViewRaw extends Component {
  viewModel = new VacantRequestsViewModel({history: this.props.history})

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
          <Appbar
            title={t(TranslationKey['Vacant requests'])}
            notificationCount={2}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelViewWrapper}>
                  <ToggleButtonGroup exclusive value={viewMode} onChange={onChangeViewMode}>
                    <ToggleButton value={tableViewMode.LIST}>
                      <TableRowsIcon color="primary" />
                    </ToggleButton>
                    <ToggleButton value={tableViewMode.BLOCKS}>
                      <ViewModuleIcon color="primary" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <div>
                  <Field
                    containerClasses={classNames.searchContainer}
                    inputClasses={classNames.searchInput}
                    value={nameSearchValue}
                    endAdornment={
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    }
                    onChange={onChangeNameSearchValue}
                  />
                </div>

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
                  {getSortedData(sortMode)?.map(item =>
                    viewMode === tableViewMode.LIST ? (
                      <VacantRequestListCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
                    ) : (
                      <VacantRequestShortCard key={item._id} item={item} onClickViewMore={onClickViewMore} />
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

export const VacantRequestsView = withStyles(styles)(VacantRequestsViewRaw)
