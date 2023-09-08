import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Box, Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantRequestListCard } from '@components/cards/vacant-request-list-card'
import { VacantRequestShortCard } from '@components/cards/vacant-request-short-card'
import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { CustomPageSwitcher } from '@components/shared/custom-page-switcher'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import {
  getDistanceBetweenDatesInSeconds,
  sortObjectsArrayByFiledDateWithParseISO,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
import { t } from '@utils/translations'

import { styles } from './vacant-requests-view.style'

import { VacantRequestsViewModel } from './vacant-requests-view.model'

export const VacantRequestsViewRaw = props => {
  const [viewModel] = useState(() => new VacantRequestsViewModel({ history: props.history, location: props.location }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getSortedData = mode => {
    switch (mode) {
      case tableSortMode.DESK:
        return viewModel.currentData.slice().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

      case tableSortMode.ASC:
        return viewModel.currentData.slice().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
    }
  }

  const dataToRender = getSortedData(viewModel.sortMode)

  const getRowClassName = params => {
    if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= 86400) {
      return [classNames.deadlineBorder, classNames.redBorder]
    } else if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= 172800) {
      return [classNames.deadlineBorder, classNames.yellowBorder]
    }
  }

  const pageSizeOptions = [15, 25, 50, 100]

  return (
    <React.Fragment>
      <div>
        <div className={classNames.tablePanelWrapper}>
          <FreelanceTypeTaskSelect
            selectedTaskType={viewModel.selectedTaskType}
            onClickTaskType={viewModel.onClickTaskType}
          />

          <SearchInput
            placeholder={t(TranslationKey['Search by Title, ASIN, ID'])}
            inputClasses={classNames.searchInput}
            value={viewModel.nameSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div className={classNames.tablePanelSubWrapper}>
            {viewModel.viewMode !== tableViewMode.TABLE && (
              <>
                <CustomPageSwitcher
                  rowCount={viewModel.rowCount}
                  paginationModel={viewModel.paginationModel}
                  pageSizeOptions={pageSizeOptions}
                  onChangePaginationModelChange={viewModel.onChangePaginationModelChange}
                />

                <div className={classNames.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
                  <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['By date'])}</Typography>

                  {viewModel.sortMode === tableSortMode.DESK ? (
                    <ArrowDropDownIcon color="primary" />
                  ) : (
                    <ArrowDropUpIcon color="primary" />
                  )}
                </div>
              </>
            )}

            <ViewCardsSelect
              withTabelView
              viewMode={viewModel.viewMode}
              onChangeViewMode={viewModel.onChangeViewMode}
            />
          </div>
        </div>

        {viewModel.viewMode !== tableViewMode.TABLE ? (
          <Box
            container
            classes={{ root: classNames.dashboardCardWrapper }}
            display="grid"
            gridTemplateColumns={
              viewModel.viewMode === tableViewMode.LIST
                ? 'repeat(auto-fill, minmax(100%, 1fr))'
                : viewModel.viewMode === tableViewMode.BLOCKS
                ? 'repeat(auto-fill, minmax(297px, 1fr))'
                : 'repeat(auto-fill, 100%'
            }
            gap={'35px'}
          >
            {dataToRender?.map((item, index) =>
              viewModel.viewMode === tableViewMode.LIST ? (
                <VacantRequestListCard
                  key={item._id}
                  isFirst={index === 0}
                  item={item}
                  onClickViewMore={viewModel.onClickViewMore}
                />
              ) : (
                <VacantRequestShortCard
                  key={item._id}
                  isFirst={index === 0}
                  item={item}
                  onClickViewMore={viewModel.onClickViewMore}
                />
              ),
            )}
          </Box>
        ) : viewModel.viewMode === tableViewMode.TABLE ? (
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
              sortingMode="server"
              paginationMode="server"
              rowCount={viewModel.rowCount}
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              paginationModel={viewModel.paginationModel}
              pageSizeOptions={pageSizeOptions}
              rows={viewModel.currentData}
              rowHeight={75}
              slots={{
                toolbar: DataGridCustomToolbar,
                columnMenuIcon: FilterAltOutlinedIcon,
                columnMenu: DataGridCustomColumnMenuComponent,
              }}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
                columnMenu: viewModel.columnMenuSettings,

                toolbar: {
                  resetFiltersBtnSettings: {
                    onClickResetFilters: viewModel.onClickResetFilters,
                    isSomeFilterOn: viewModel.onClickResetFilters,
                  },
                  columsBtnSettings: {
                    columnsModel: viewModel.columnsModel,
                    columnVisibilityModel: viewModel.columnVisibilityModel,
                    onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                  },
                },
              }}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatuses.isLoading}
              getRowClassName={getRowClassName}
              onSortModelChange={viewModel.onChangeSortingModel}
              onFilterModelChange={viewModel.onChangeFilterModel}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
              onPaginationModelChange={viewModel.onChangePaginationModelChange}
              onRowDoubleClick={e => viewModel.onClickViewMore(e.row._id)}
            />
          </div>
        ) : (
          !viewModel.currentData?.length &&
          loadingStatuses.success && (
            <div className={classNames.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={classNames.emptyTableText}>
                {t(TranslationKey['No vacant applications yet'])}
              </Typography>
            </div>
          )
        )}
      </div>
    </React.Fragment>
  )
}

export const VacantRequestsView = withStyles(observer(VacantRequestsViewRaw), styles)
