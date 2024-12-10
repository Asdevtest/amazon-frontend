import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomSelect } from '@components/shared/selects/custom-select'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './admin-orders-views.style'

import { getSwitcherConfig } from './admin-orders-views.config'
import { AdminOrdersAllViewModel } from './admin-orders-views.model'

export const AdminOrdersViews = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new AdminOrdersAllViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomSelect
          size="large"
          options={getSwitcherConfig()}
          value={viewModel.activeCategory}
          onChange={viewModel.onChangeActiveCategory}
        />
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title, ID"
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

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
              handleDownloadPreset: viewModel.handleDownloadPreset,
              handleLoadPreset: viewModel.handleLoadPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onRowDoubleClick={(params: GridRowParams) => viewModel.onClickTableRow(params.row)}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />
    </div>
  )
})
