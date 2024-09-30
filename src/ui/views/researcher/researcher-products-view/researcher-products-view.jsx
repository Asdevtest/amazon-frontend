import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ResearcherAddProductForm } from '@components/forms/reasearcher-add-product-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { ResearcherProductsViewModel } from './researcher-products-view.model'

export const ResearcherProductsView = observer(() => {
  const viewModel = useMemo(() => new ResearcherProductsViewModel(), [])

  return (
    <>
      <ResearcherAddProductForm
        user={viewModel.userInfo}
        formFields={viewModel.formFields}
        errorMsg={viewModel.error}
        reasonErrorMsg={viewModel.reasonError}
        chekedCode={viewModel.chekedCode}
        actionStatus={viewModel.actionStatus}
        onChangeFormFields={viewModel.onChangeFormFields}
        onClickCheckAndAddProductBtn={viewModel.onClickCheckAndAddProductBtn}
      />

      <CustomDataGrid
        sortingMode="client"
        paginationMode="client"
        rowHeight={50}
        columns={viewModel.columnsModel}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        rows={viewModel.currentData}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        getRowId={({ _id }) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
            columsBtnSettings: {
              columnsModel: viewModel.columnsModel,
              columnVisibilityModel: viewModel.columnVisibilityModel,
              onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
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
        onRowDoubleClick={({ row }) => viewModel.onClickTableRow(row)}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />
    </>
  )
})
