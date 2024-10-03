import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowClassNameParams, GridRowParams } from '@mui/x-data-grid-premium'

import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './buyer-my-products-view.style'

import { attentionStatuses } from './buyer-my-products-view.constants'
import { BuyerMyProductsViewModel } from './buyer-my-products-view.model'

export const BuyerMyProductsView = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new BuyerMyProductsViewModel(), [])

  const ideasSheldStyle = (params: GridRowClassNameParams) =>
    (!params.row.ideasOnCheck && !!params.row.ideasVerified && styles.ideaRowGreen) ||
    (!!params.row.ideasOnCheck && styles.ideaRowYellow)

  const getRowClassName = (params: GridRowClassNameParams) =>
    cx(ideasSheldStyle(params), {
      [styles.attentionRow]: attentionStatuses.includes(params.row.statusForAttention),
      [styles.attentionRowShort]: (!params.row.ideasOnCheck && !!params.row.ideasVerified) || !!params.row.ideasOnCheck,
    })

  return (
    <div className="viewWrapper">
      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by SKU, ASIN, Title"
        onSearch={viewModel.onSearchSubmit}
      />

      <CustomDataGrid
        disableRowSelectionOnClick
        getRowClassName={getRowClassName}
        pinnedColumns={viewModel.pinnedColumns}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={(row: IProduct) => row._id}
        rowSelectionModel={viewModel.selectedRows}
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

            tagSearchSettings: {
              tagList: viewModel.columnMenuSettings?.tags?.filterData,
              activeTags: viewModel.columnMenuSettings?.tags?.currentFilterData,
              isLoading: viewModel.columnMenuSettings?.filterRequestStatus === loadingStatus.IS_LOADING,
              getTags: () => viewModel.columnMenuSettings?.onClickFilterBtn('tags', DataGridFilterTables.PRODUCTS),
              setActiveProductsTag: viewModel.setActiveProductsTag,
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
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onRowDoubleClick={(params: GridRowParams) => viewModel.onClickProductModal(params.row)}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      {viewModel.productCardModal && (
        <ProductCardModal
          // @ts-ignore
          role={viewModel.userInfo.role}
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
