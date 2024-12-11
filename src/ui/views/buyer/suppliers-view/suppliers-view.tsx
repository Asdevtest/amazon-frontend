import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddSupplierCardModal } from '@components/modals/add-supplier-card-modal'
import { AddSupplierModal } from '@components/modals/add-supplier-modal'
import { BindSupplierCardToProductModal } from '@components/modals/bind-supplier-card-to-product-modal'
import { SupplierModal } from '@components/modals/supplier-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './suppliers-view.style'

import { getRadioButtonOptions } from './helpers/get-radio-button-options'
import { SuppliersViewModel } from './suppliers-view.model'
import { TableView } from './suppliers-view.type'

export const SuppliersView: FC = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new SuppliersViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomRadioButton
          size="large"
          options={getRadioButtonOptions()}
          value={viewModel.currentTable}
          onChange={viewModel.onChangeRadioButtonOption}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="ID, Title"
          onSearch={viewModel.onSearchSubmit}
        />

        {viewModel.currentTable === TableView.SUPLLIERS ? (
          <CustomButton size="large" type="primary" onClick={viewModel?.onClickCreateSupplier}>
            {t(TranslationKey['Create a supplier'])}
          </CustomButton>
        ) : (
          <div className={styles.headerButtons}>
            <CustomButton block size="large" onClick={viewModel?.onTriggerArchive}>
              {t(TranslationKey[viewModel?.isSupplierCardsActive ? 'Actual cards' : 'Open archive'])}
            </CustomButton>

            <CustomButton size="large" type="primary" onClick={viewModel?.onClickAddSupplierProduct}>
              {t(TranslationKey['Add a new card'])}
            </CustomButton>
          </div>
        )}
      </div>

      <CustomDataGrid
        disableRowSelectionOnClick
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
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onRowDoubleClick={(params: GridRowParams) => viewModel.onOpenSupplierModal(params.row)}
      />

      {viewModel.showAddSupplierModal ? (
        <AddSupplierModal
          supplierId={viewModel.supplierIdToEdit}
          openModal={viewModel.showAddSupplierModal}
          setOpenModal={viewModel.onCloseAddSupplierModal}
          updateHandler={() => viewModel.getCurrentData()}
        />
      ) : null}

      {viewModel.showAddSupplierProductModal ? (
        <AddSupplierCardModal
          supplierCardId={viewModel.supplierCardIdToEdit}
          handleUpdate={() => viewModel.getCurrentData()}
          openModal={viewModel.showAddSupplierProductModal}
          setOpenModal={viewModel.onCloseAddSupplierProductModal}
        />
      ) : null}

      {viewModel.showSupplierModal ? (
        <SupplierModal
          openModal={viewModel.showSupplierModal}
          setOpenModal={viewModel.onCloseSupplierModal}
          supplierId={viewModel.supplierIdToShow}
        />
      ) : null}

      {viewModel.showBindSupplierCardToProductModal ? (
        <BindSupplierCardToProductModal
          supplierId={viewModel.supplierIdToEdit}
          supplierCardId={viewModel.supplierCardIdToEdit}
          openModal={viewModel.showBindSupplierCardToProductModal}
          setOpenModal={viewModel.onCloseBindProductModal}
        />
      ) : null}
    </div>
  )
})
