/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Box, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {ViewCartsBlock, ViewCartsLine, ViewCartsTable} from '@constants/svg-icons'
import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button/button'
import {VacantRequestListCard} from '@components/cards/vacant-request-list-card'
import {VacantRequestShortCard} from '@components/cards/vacant-request-short-card'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'
import {ToggleBtnGroupFreelance} from '@components/toggle-btn-group/toggle-btn-group'
import {ToggleBtnFreelancer} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {
  getDistanceBetweenDatesInSeconds,
  sortObjectsArrayByFiledDateWithParseISO,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
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
      selectedTaskType,
      nameSearchValue,
      viewMode,
      sortMode,
      drawerOpen,

      rowCount,
      curPage,
      sortModel,
      filterModel,
      rowsPerPage,
      columnVisibilityModel,
      requestStatus,
      columnsModel,
      currentData,

      onTriggerSortMode,
      onTriggerDrawerOpen,
      onClickViewMore,
      onChangeViewMode,
      onChangeNameSearchValue,
      onClickTaskType,
      onChangeCurPage,
      onChangeSortingModel,
      onChangeFilterModel,
      onChangeRowsPerPage,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getSortedData = mode => {
      switch (mode) {
        case tableSortMode.DESK:
          return currentData.slice().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

        case tableSortMode.ASC:
          return currentData.slice().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
      }
    }

    const getRowClassName = params => {
      if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= 86400) {
        return classNames.redBorder
      } else if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= 172800) {
        return classNames.yellowBorder
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
                <div className={classNames.taskTypeWrapper}>
                  {Object.keys(freelanceRequestTypeByCode).map((taskType, taskIndex) => (
                    <Button
                      key={taskIndex}
                      variant="text"
                      disabled={taskType === selectedTaskType}
                      className={cx(classNames.button, {
                        [classNames.selectedBoxesBtn]: Number(taskType) === Number(selectedTaskType),
                      })}
                      onClick={() => onClickTaskType(taskType)}
                    >
                      {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
                    </Button>
                  ))}
                </div>

                <SearchInput
                  placeholder={t(TranslationKey['Search by Title, ASIN, ID'])}
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  onChange={onChangeNameSearchValue}
                />

                <div className={classNames.tablePanelSubWrapper}>
                  <div className={classNames.tablePanelViewWrapper}>
                    <ToggleBtnGroupFreelance exclusive value={viewMode} onChange={onChangeViewMode}>
                      <ToggleBtnFreelancer value={tableViewMode.TABLE} disabled={viewMode === tableViewMode.TABLE}>
                        <ViewCartsTable
                          className={cx(classNames.viewCart, {
                            [classNames.viewCartSelected]: viewMode === tableViewMode.TABLE,
                          })}
                        />
                      </ToggleBtnFreelancer>
                      <ToggleBtnFreelancer value={tableViewMode.BLOCKS} disabled={viewMode === tableViewMode.BLOCKS}>
                        <ViewCartsBlock
                          className={cx(classNames.viewCart, {
                            [classNames.viewCartSelected]: viewMode === tableViewMode.BLOCKS,
                          })}
                        />
                      </ToggleBtnFreelancer>
                      <ToggleBtnFreelancer value={tableViewMode.LIST} disabled={viewMode === tableViewMode.LIST}>
                        <ViewCartsLine
                          className={cx(classNames.viewCart, {
                            [classNames.viewCartSelected]: viewMode === tableViewMode.LIST,
                          })}
                        />
                      </ToggleBtnFreelancer>
                    </ToggleBtnGroupFreelance>
                  </div>

                  <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
                    <Typography className={classNames.tablePanelViewText}>
                      {t(TranslationKey['Sort by date'])}
                    </Typography>

                    {sortMode === tableSortMode.DESK ? (
                      <ArrowDropDownIcon color="primary" />
                    ) : (
                      <ArrowDropUpIcon color="primary" />
                    )}
                  </div>
                </div>
              </div>

              {getSortedData(sortMode)?.length && viewMode !== tableViewMode.TABLE ? (
                <Box
                  container
                  classes={{root: classNames.dashboardCardWrapper}}
                  display="grid"
                  gridTemplateColumns={
                    viewMode === tableViewMode.LIST
                      ? 'repeat(auto-fill, minmax(100%, 1fr))'
                      : viewMode === tableViewMode.BLOCKS
                      ? 'repeat(auto-fill, minmax(300px, 1fr))'
                      : 'repeat(auto-fill, 100%'
                  }
                  // gridGap="20px"
                  // gridGap="35px"
                  gap={'35px'}
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
              ) : getSortedData(sortMode)?.length && viewMode === tableViewMode.TABLE ? (
                <div className={classNames.dataGridWrapper}>
                  <MemoDataGrid
                    disableVirtualization
                    pagination
                    useResizeContainer
                    localeText={getLocalizationByLanguageTag()}
                    classes={{
                      row: classNames.row,
                      root: classNames.root,
                      footerContainer: classNames.footerContainer,
                      footerCell: classNames.footerCell,
                      toolbarContainer: classNames.toolbarContainer,

                      iconSeparator: classNames.iconSeparator,
                      columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                      columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                    }}
                    rowCount={rowCount}
                    sortModel={sortModel}
                    filterModel={filterModel}
                    page={curPage}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[15, 25, 50, 100]}
                    rows={getSortedData(sortMode)}
                    rowHeight={75}
                    components={{
                      Toolbar: DataGridCustomToolbar,
                      ColumnMenuIcon: FilterAltOutlinedIcon,
                      ColumnMenu: DataGridCustomColumnMenuComponent,
                    }}
                    columnVisibilityModel={columnVisibilityModel}
                    columns={columnsModel}
                    loading={requestStatus === loadingStatuses.isLoading}
                    getRowClassName={getRowClassName}
                    onPageChange={onChangeCurPage}
                    onSortModelChange={onChangeSortingModel}
                    onPageSizeChange={onChangeRowsPerPage}
                    onFilterModelChange={onChangeFilterModel}
                    // onStateChange={setFirstRowId}
                    onRowDoubleClick={e => onClickViewMore(e.row._id)}
                  />
                </div>
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
