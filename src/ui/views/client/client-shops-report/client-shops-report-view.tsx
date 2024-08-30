/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { BindStockGoodsToInventoryForm } from '@components/forms/bind-stock-goods-to-inventory-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ShopReportsTabsValues } from '@typings/enums/shop-report'

import { ClientShopsViewModel } from './client-shops-report-view.model'
import { ControllButtons } from './controll-buttons/controll-buttons'

export const ClientShopsReportView = observer(({ history }: { history: any }) => {
  const [viewModel] = useState(() => new ClientShopsViewModel(ShopReportsTabsValues.PPC_ORGANIC_BY_DAY, history))

  return (
    <div className="viewWrapper">
      <ControllButtons
        currentSearchValue={viewModel.currentSearchValue}
        currentTabKey={viewModel.tabValue}
        selectedRows={viewModel.selectedRows}
        onClickMoveGoodsToInventory={viewModel.moveGoodsToInventoryHandler}
        onClickBindStockGoodsToInventory={viewModel.bindStockGoodsToInventoryHandler}
        onClickDeleteBtn={viewModel.deleteReportHandler}
        onSearchSubmit={viewModel.onSearchSubmit}
        onChangeTab={viewModel.onChangeTab}
      />

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        pinnedColumns={viewModel.pinnedColumns}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        getRowHeight={() => 'auto'}
        slotProps={{
          columnMenu: viewModel.columnMenuSettings,
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
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
        density={viewModel.densityModel}
        rows={viewModel.currentData}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        rowSelectionModel={viewModel.selectedRows}
        getRowId={({ _id }: GridRowModel) => _id}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      <Modal
        openModal={viewModel.showBindStockGoodsToInventoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBindStockGoodsToInventoryModal')}
      >
        <BindStockGoodsToInventoryForm
          goodsToSelect={addIdDataConverter(
            viewModel.currentData?.filter((item: any) => viewModel.selectedRows?.includes(item?._id)),
          )}
          inventoryData={viewModel.inventoryProducts}
          updateInventoryData={viewModel.getProductsMy}
          onSubmit={viewModel.submitBindStockGoodsHandler}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectShopsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
      >
        <SelectShopsModal
          // @ts-ignore
          title={t(TranslationKey['Choose a store for integration'])}
          shops={viewModel.shopsData}
          onClickSuccessBtn={viewModel.bindReportInventoryHandler}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showSelectShopsModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings?.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings?.onSubmit}
          onClickCancelBtn={viewModel.confirmModalSettings?.onCancel}
        />
      ) : null}
    </div>
  )
})
