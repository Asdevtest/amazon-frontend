import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel, GridRowParams } from '@mui/x-data-grid-premium'

import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'

import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './vacant-requests-view.style'

import { VacantRequestsViewModel } from './vacant-requests-view.model'

export const VacantRequestsView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new VacantRequestsViewModel())

  const getRowClassName = (params: GridRowParams) => {
    if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
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
      </div>

      <CustomDataGrid
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        rowSelectionModel={viewModel.selectedRows}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={({ _id }: GridRowModel) => _id}
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
            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.columnsModel,
              onSortModelChange: viewModel.onChangeSortingModel,
            },
            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
            },
          },
        }}
        rowCount={viewModel.rowCount}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        getRowClassName={getRowClassName}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onRowClick={(e: GridRowParams) => viewModel.onOpenRequestDetailModal(e.row._id)}
      />

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
