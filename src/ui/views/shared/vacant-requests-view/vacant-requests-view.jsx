import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { VacantRequestListCard } from '@components/cards/vacant-request-list-card'
import { VacantRequestShortCard } from '@components/cards/vacant-request-short-card'
import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomPageSwitcher } from '@components/shared/custom-page-switcher'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './vacant-requests-view.style'

import { VacantRequestsViewModel } from './vacant-requests-view.model'

export const VacantRequestsView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new VacantRequestsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params => {
    if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }
  const isListPosition = viewModel.viewMode === tableViewMode.LIST

  return (
    <div className="viewWrapper">
      <div className={styles.tablePanelWrapper}>
        <FreelanceTypeTaskSelect
          specs={viewModel.userInfo?.allowedSpec}
          selectedSpec={viewModel.specOption}
          onChangeSpec={viewModel.onChangeSpec}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Title, ASIN, SKU, ID"
          onSearch={viewModel.onSearchSubmit}
        />

        <ViewCardsSelect withTabelView viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />
      </div>

      <div className={styles.tablePanelSubWrapper}>
        {viewModel.viewMode !== tableViewMode.TABLE && (
          <>
            <CustomPageSwitcher
              rowCount={viewModel.rowCount}
              paginationModel={viewModel.paginationModel}
              pageSizeOptions={viewModel.pageSizeOptions}
              onPaginationModelChange={viewModel.onPaginationModelChange}
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
        <CustomDataGrid
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
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          getRowClassName={getRowClassName}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowClick={e => viewModel.handleOpenRequestDetailModal(e.row._id)}
        />
      ) : (
        !viewModel.currentData?.length &&
        loadingStatus.SUCCESS && (
          <div className={styles.emptyTableWrapper}>
            <img src="/assets/icons/empty-table.svg" />
            <p className={styles.emptyTableText}>{t(TranslationKey['No vacant applications yet'])}</p>
          </div>
        )
      )}

      {viewModel.showRequestDetailModal ? (
        <FreelanceRequestDetailsModal
          // @ts-ignore
          openModal={viewModel.showRequestDetailModal}
          request={viewModel.currentRequestDetails?.request}
          details={viewModel.currentRequestDetails?.details}
          handleOpenModal={() => viewModel.onTriggerOpenModal('showRequestDetailModal')}
          onClickSuggest={viewModel.onClickSuggest}
          onClickOpenNewTab={viewModel.onClickOpenInNewTab}
        />
      ) : null}
    </div>
  )
})
