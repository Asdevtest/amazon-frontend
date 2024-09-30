import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridExceljsProcessInput, GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReportModal } from '@components/modals/report-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { Header } from './header'
import { editExcelReport } from './helpers/edit-excel-report'
import { Info } from './info'
import { ReportsViewProps } from './reports-view-copy.types'
import { ReportsViewModel } from './reports-view.model'

export const ReportsView: FC<ReportsViewProps> = observer(props => {
  const { productId, subView = false } = props

  const viewModel = useMemo(() => new ReportsViewModel({ productId, subView }), [])

  const exceljsPostProcess = (excelParams: GridExceljsProcessInput) =>
    editExcelReport(excelParams, viewModel?.columnsModel, viewModel?.currentData)

  return (
    <>
      {!subView ? <Info product={viewModel.product} activeLaunches={viewModel.activeLaunches} /> : null}

      <Header
        subView={subView}
        requestStatus={viewModel.requestStatus}
        onSearchSubmit={viewModel.onSearchSubmit}
        onChangeRangeDate={viewModel.onChangeRangeDate}
        onToggleReportModalEditMode={viewModel.onToggleReportModalEditMode}
      />

      <CustomDataGrid
        rows={viewModel.currentData}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        columns={viewModel.columnsModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        paginationModel={viewModel.paginationModel}
        rowSelectionModel={viewModel.selectedRows}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        getRowHeight={() => 'auto'}
        columnHeaderHeight={40}
        getRowId={({ _id }: GridRowModel) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: viewModel.columnMenuSettings,
          toolbar: {
            excelOptions: { exceljsPostProcess },

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
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      <Modal missClickModalOn openModal={viewModel.showReportModal} setOpenModal={viewModel.onToggleReportModal}>
        <ReportModal
          subView={subView}
          reportId={viewModel.reportId}
          defaultProduct={viewModel.product}
          onClose={viewModel.onToggleReportModal}
          onUpdateTableData={viewModel.getCurrentData}
        />
      </Modal>
    </>
  )
})
