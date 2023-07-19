/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Box, Typography } from '@mui/material'

import React, { Component, useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantRequestListCard } from '@components/cards/vacant-request-list-card'
import { VacantRequestShortCard } from '@components/cards/vacant-request-short-card'
import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button/button'
import { ToggleBtnGroupFreelance } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtnFreelancer } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { SearchInput } from '@components/shared/search-input'
import { ViewCartsBlock, ViewCartsLine, ViewCartsTable } from '@components/shared/svg-icons'

import { checkIsFreelancer } from '@utils/checks'
import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import {
  getDistanceBetweenDatesInSeconds,
  sortObjectsArrayByFiledDateWithParseISO,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { VacantRequestsViewModel } from './vacant-requests-view.model'
import { styles } from './vacant-requests-view.style'

export const VacantRequestsViewRaw = props => {
  const [viewModel] = useState(() => new VacantRequestsViewModel({ history: props.history, location: props.location }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const whiteList =
    !!viewModel.userInfo && checkIsFreelancer(viewModel.userRole)
      ? [
          String(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]),
          ...(viewModel.userInfo?.allowedSpec?.map(spec => spec && String(spec)) || []),
        ]
      : Object.keys(freelanceRequestTypeByCode)

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

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.tablePanelWrapper}>
          <div className={classNames.taskTypeWrapper}>
            {Object.keys({
              ...getObjectFilteredByKeyArrayWhiteList(freelanceRequestTypeByCode, whiteList),
              // freelanceRequestTypeByCode
            }).map((taskType, taskIndex) => (
              <Button
                key={taskIndex}
                variant="text"
                disabled={taskType === viewModel.selectedTaskType}
                className={cx(classNames.button, {
                  [classNames.selectedBoxesBtn]: Number(taskType) === Number(viewModel.selectedTaskType),
                })}
                onClick={() => viewModel.onClickTaskType(taskType)}
              >
                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
              </Button>
            ))}
          </div>

          <SearchInput
            placeholder={t(TranslationKey['Search by Title, ASIN, ID'])}
            inputClasses={classNames.searchInput}
            value={viewModel.nameSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div className={classNames.tablePanelSubWrapper}>
            <div className={classNames.tablePanelViewWrapper}>
              <ToggleBtnGroupFreelance exclusive value={viewModel.viewMode} onChange={viewModel.onChangeViewMode}>
                <ToggleBtnFreelancer value={tableViewMode.TABLE} disabled={viewModel.viewMode === tableViewMode.TABLE}>
                  <ViewCartsTable
                    className={cx(classNames.viewCart, {
                      [classNames.viewCartSelected]: viewModel.viewMode === tableViewMode.TABLE,
                    })}
                  />
                </ToggleBtnFreelancer>
                <ToggleBtnFreelancer
                  value={tableViewMode.BLOCKS}
                  disabled={viewModel.viewMode === tableViewMode.BLOCKS}
                >
                  <ViewCartsBlock
                    className={cx(classNames.viewCart, {
                      [classNames.viewCartSelected]: viewModel.viewMode === tableViewMode.BLOCKS,
                    })}
                  />
                </ToggleBtnFreelancer>
                <ToggleBtnFreelancer value={tableViewMode.LIST} disabled={viewModel.viewMode === tableViewMode.LIST}>
                  <ViewCartsLine
                    className={cx(classNames.viewCart, {
                      [classNames.viewCartSelected]: viewModel.viewMode === tableViewMode.LIST,
                    })}
                  />
                </ToggleBtnFreelancer>
              </ToggleBtnGroupFreelance>
            </div>

            {viewModel.viewMode !== tableViewMode.TABLE && (
              <div className={classNames.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
                <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

                {viewModel.sortMode === tableSortMode.DESK ? (
                  <ArrowDropDownIcon color="primary" />
                ) : (
                  <ArrowDropUpIcon color="primary" />
                )}
              </div>
            )}
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

                iconSeparator: classNames.iconSeparator,
                columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
              }}
              sortingMode="server"
              paginationMode="server"
              rowCount={viewModel.rowCount}
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              paginationModel={viewModel.paginationModel}
              pageSizeOptions={[15, 25, 50, 100]}
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
      </MainContent>
    </React.Fragment>
  )
}

export const VacantRequestsView = withStyles(observer(VacantRequestsViewRaw), styles)
