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
import {tableViewMode, tableSortMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {SourceFilesViewModel} from './source-files-view.model'
import {styles} from './source-files-view.style.js'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_SOURCE_FILES

@observer
class SourceFilesViewRaw extends Component {
  viewModel = new SourceFilesViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      nameSearchValue,
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
      onChangeNameSearchValue,
      onSelectionModel,
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
                <div className={classNames.tablePanelSubWrapper} />

                <SearchInput
                  placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}, ${t(
                    TranslationKey.ASIN,
                  )}`}
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  onChange={onChangeNameSearchValue}
                />

                <div className={classNames.tablePanelSubWrapper}>
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
                  onPageChange={onChangeCurPage}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onFilterModelChange={onChangeFilterModel}
                  // onStateChange={setFirstRowId}
                  // onRowDoubleClick={e => onClickViewMore(e.row._id)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const SourceFilesView = withStyles(SourceFilesViewRaw, styles)
