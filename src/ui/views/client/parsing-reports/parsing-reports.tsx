import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { getSelectConfig } from './parsing-reports.config'
import { ParsingReportsModel } from './parsing-reports.model'

export const ParsingReports = observer(() => {
  const viewModel = useMemo(() => new ParsingReportsModel(), [])
  const selectConfig = useMemo(() => getSelectConfig(), [])

  return (
    <div className="viewWrapper">
      <CustomSelect options={selectConfig} value={viewModel.table} onChange={viewModel.onChangeActiveTable} />

      <div className="tableWrapper">
        <CustomDataGrid
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pinnedColumns={viewModel.pinnedColumns}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
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
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          // onRowDoubleClick={params => viewModel.getDataForIdeaModal(params.row)}
        />
      </div>
    </div>
  )
})
