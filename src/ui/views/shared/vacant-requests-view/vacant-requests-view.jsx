import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantRequestListCard } from '@components/cards/vacant-request-list-card'
import { VacantRequestShortCard } from '@components/cards/vacant-request-short-card'
import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomPageSwitcher } from '@components/shared/custom-page-switcher'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './vacant-requests-view.style'

import { VacantRequestsViewModel } from './vacant-requests-view.model'

export const VacantRequestsView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new VacantRequestsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => {
    if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= 86400) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= 172800) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }
  const isListPosition = viewModel.viewMode === tableViewMode.LIST

  return (
    <React.Fragment>
      <div>
        <div className={styles.tablePanelWrapper}>
          <FreelanceTypeTaskSelect
            selectedTaskType={viewModel.selectedTaskType}
            onClickTaskType={viewModel.onClickTaskType}
          />

          <SearchInput
            placeholder={t(TranslationKey['Search by Title, ASIN, ID'])}
            inputClasses={styles.searchInput}
            value={viewModel.nameSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />

          <div className={styles.tablePanelSubWrapper}>
            {viewModel.viewMode !== tableViewMode.TABLE && (
              <>
                <CustomPageSwitcher
                  rowCount={viewModel.rowCount}
                  paginationModel={viewModel.paginationModel}
                  pageSizeOptions={viewModel.pageSizeOptions}
                  onChangePaginationModelChange={viewModel.onChangePaginationModelChange}
                />

                <div className={styles.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
                  <p className={styles.tablePanelViewText}>{t(TranslationKey['By date'])}</p>

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
          <div className={cx(styles.dashboardCardWrapper, { [styles.dashboardCardWrapperList]: isListPosition })}>
            {viewModel.currentData?.map((item, index) =>
              viewModel.viewMode === tableViewMode.LIST ? (
                <VacantRequestListCard
                  key={item._id}
                  isFirst={index === 0}
                  item={item}
                  onClickViewMore={viewModel.onClickViewMore}
                  onDoubleClick={viewModel.handleOpenRequestDetailModal}
                />
              ) : (
                <VacantRequestShortCard
                  key={item._id}
                  isFirst={index === 0}
                  item={item}
                  onClickViewMore={viewModel.onClickViewMore}
                  onDoubleClick={viewModel.handleOpenRequestDetailModal}
                />
              ),
            )}
          </div>
        ) : viewModel.viewMode === tableViewMode.TABLE ? (
          <div className={styles.dataGridWrapper}>
            <CustomDataGrid
              useResizeContainer
              localeText={getLocalizationByLanguageTag()}
              rowCount={viewModel.rowCount}
              sortModel={viewModel.sortModel}
              filterModel={viewModel.filterModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              paginationModel={viewModel.paginationModel}
              rows={viewModel.currentData}
              rowHeight={75}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
                columnMenu: viewModel.columnMenuSettings,

                toolbar: {
                  resetFiltersBtnSettings: {
                    onClickResetFilters: viewModel.onClickResetFilters,
                    isSomeFilterOn: viewModel.isSomeFilterOn,
                  },
                  columsBtnSettings: {
                    columnsModel: viewModel.columnsModel,
                    columnVisibilityModel: viewModel.columnVisibilityModel,
                    onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                  },
                },
              }}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
              getRowClassName={getRowClassName}
              onSortModelChange={viewModel.onChangeSortingModel}
              onFilterModelChange={viewModel.onChangeFilterModel}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
              onPaginationModelChange={viewModel.onChangePaginationModelChange}
              onRowClick={e => viewModel.handleOpenRequestDetailModal(e.row._id)}
            />
          </div>
        ) : (
          !viewModel.currentData?.length &&
          loadingStatuses.SUCCESS && (
            <div className={styles.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <p className={styles.emptyTableText}>{t(TranslationKey['No vacant applications yet'])}</p>
            </div>
          )
        )}
      </div>

      <FreelanceRequestDetailsModal
        isOpenModal={viewModel.showRequestDetailModal}
        request={viewModel.currentRequestDetails?.request}
        details={viewModel.currentRequestDetails?.details}
        handleOpenModal={() => viewModel.onTriggerOpenModal('showRequestDetailModal')}
        onClickSuggest={viewModel.onClickSuggest}
        onClickOpenNewTab={viewModel.onClickOpenInNewTab}
      />
    </React.Fragment>
  )
})
