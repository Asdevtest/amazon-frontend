import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddSupplierModal } from '@components/modals/add-supplier-modal'
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

export const SuppliersView: FC = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new SuppliersViewModel(), [])

  const options = useMemo(() => getRadioButtonOptions(), [])

  const onCloseAddSupplierModal = useCallback(() => {
    viewModel.onTriggerOpenModal('showAddSupplierModal', false)
  }, [])

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomRadioButton
          size="large"
          options={options}
          value={viewModel.currentTable}
          onChange={viewModel.onChangeRadioButtonOption}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title, ID"
          onSearch={viewModel.onSearchSubmit}
        />

        <div className={styles.headerButtons}>
          <CustomButton size="large" type="primary" onClick={() => console.log('Add product')}>
            {t(TranslationKey['Add product'])}
          </CustomButton>

          <CustomButton size="large" type="primary" onClick={viewModel?.onClickCreateSupplier}>
            {t(TranslationKey['Create a supplier'])}
          </CustomButton>
        </div>
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
      />

      {viewModel.showAddSupplierModal ? (
        <AddSupplierModal openModal={viewModel.showAddSupplierModal} setOpenModal={onCloseAddSupplierModal} />
      ) : null}
    </div>
  )
})
