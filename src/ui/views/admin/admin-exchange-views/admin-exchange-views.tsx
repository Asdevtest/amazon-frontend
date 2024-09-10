import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { getSwitcherConfig } from './admin-exchange-views.config'
import { AdminExchangeViewModel } from './admin-exchange-views.model'

export const AdminExchangeViews = observer(() => {
  const viewModel = useMemo(() => new AdminExchangeViewModel(), [])

  return (
    <div className="viewWrapper">
      <CustomSelect
        size="large"
        options={getSwitcherConfig()}
        value={viewModel.activeCategory}
        onChange={viewModel.onChangeSubCategory}
      />

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
        getRowId={({ _id }: IProduct) => _id}
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
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onRowDoubleClick={(params: GridRowParams) => viewModel.onClickProductModal(params.row)}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      {viewModel.productCardModal && (
        <ProductCardModal
          history={viewModel.history}
          openModal={viewModel.productCardModal}
          setOpenModal={viewModel.onClickProductModal}
          updateDataHandler={viewModel.getCurrentData}
          onClickOpenNewTab={viewModel.onClickShowProduct}
        />
      )}
    </div>
  )
})
