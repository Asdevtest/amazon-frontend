import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowParams } from '@mui/x-data-grid-premium'

import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'

import { BuyerMyOrdersViewModel } from './buyer-pending-orders-view.model'

export const BuyerPendingOrdersView = observer(() => {
  const [viewModel] = useState(() => new BuyerMyOrdersViewModel())

  return (
    <div className="viewWrapper">
      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by SKU, ASIN, Title, Order, item"
        onSearch={viewModel.onSearchSubmit}
      />

      <CustomDataGrid
        pinnedColumns={viewModel.pinnedColumns}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={(row: IOrder) => row._id}
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
            },
          },
        }}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowDoubleClick={(params: GridRowParams) => viewModel.onClickOrder(params.row._id)}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <EditOrderModal
          // @ts-ignore
          isPendingOrder
          platformSettings={viewModel.platformSettings}
          paymentMethods={viewModel.paymentMethods}
          userInfo={viewModel.userInfo}
          requestStatus={viewModel.requestStatus}
          order={viewModel.selectedOrder}
          hsCodeData={viewModel.hsCodeData}
          modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
          onSaveOrderItem={viewModel.onSaveOrderItem}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={viewModel.confirmModalSettings.title}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
