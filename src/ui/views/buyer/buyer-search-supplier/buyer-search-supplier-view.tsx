import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { BuyerSearchSupplierBySupervisorModel } from './buyer-search-supplier-view.model'

export const BuyerSearchSupplierBySupervisorView = observer(() => {
  const viewModel = useMemo(() => new BuyerSearchSupplierBySupervisorModel(), [])

  return (
    <div className="viewWrapper">
      <CustomButton
        size="large"
        type="primary"
        disabled={viewModel.selectedRows.length === 0}
        title={t(TranslationKey['Assign several supplier search tasks to a Buyer'])}
        onClick={viewModel.onPickupSomeItems}
      >
        {t(TranslationKey['Take on the work of the selected'])}
      </CustomButton>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        sortingMode="client"
        paginationMode="client"
        getRowHeight={() => 'auto'}
        getRowId={(row: IProduct) => row._id}
        pinnedColumns={viewModel.pinnedColumns}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        rowSelectionModel={viewModel.selectedRows}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
            resetFiltersBtnSettings: {
              isSomeFilterOn: viewModel.isSomeFilterOn,
              onClickResetFilters: viewModel.onClickResetFilters,
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
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />
    </div>
  )
})
