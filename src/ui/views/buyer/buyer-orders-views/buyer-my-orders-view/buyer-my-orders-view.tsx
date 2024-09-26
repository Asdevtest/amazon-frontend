/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowClassNameParams } from '@mui/x-data-grid-premium'

import { routsPathes } from '@constants/navigation/routs-pathes'
import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'

import { useStyles } from './buyer-my-orders-view.style'

import { attentionStatuses, paymentMethodsReadOnlyStatuses } from './buyer-my-orders-view.constants'
import { BuyerMyOrdersViewModel } from './buyer-my-orders-view.model'
import { PaymentAllSuppliers } from './payment-all-suppliers/payment-all-suppliers'

export const BuyerMyOrdersView = observer(({ history }: any) => {
  const { classes: styles } = useStyles()

  const pathname = history.location.pathname

  const [viewModel] = useState(() => new BuyerMyOrdersViewModel({ pathname }))

  const getRowClassName = (params: GridRowClassNameParams) =>
    // @ts-ignore
    attentionStatuses.includes(params.row.status) &&
    history.location.pathname === routsPathes.BUYER_MY_ORDERS_ALL_ORDERS &&
    styles.attentionRow

  return (
    <div className="viewWrapper">
      <div className={styles.headerWrapper}>
        <CustomInputSearch
          enterButton
          allowClear
          wrapperClassName={styles.searchInput}
          size="large"
          placeholder="Search by SKU, ASIN, Title, Order, item"
          onSearch={viewModel.onSearchSubmit}
        />

        <PaymentAllSuppliers
          // @ts-ignore
          paymentAmount={viewModel.paymentAmount}
          isNoPaidedOrders={pathname === routsPathes.BUYER_MY_ORDERS_NOT_PAID}
          // @ts-ignore
          yuanToDollarRate={viewModel.platformSettings?.yuanToDollarRate}
        />
      </div>

      <CustomDataGrid
        getRowClassName={getRowClassName}
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
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onRowDoubleClick={(e: GridRowClassNameParams) => viewModel.onClickOrder(e.row._id)}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => {
          viewModel.setUpdateSupplierData(false)
          viewModel.onTriggerOpenModal('showOrderModal')
        }}
      >
        <EditOrderModal
          // @ts-ignore
          platformSettings={viewModel.platformSettings}
          paymentMethods={viewModel.paymentMethods}
          userInfo={viewModel.userInfo}
          updateSupplierData={viewModel.updateSupplierData}
          requestStatus={viewModel.requestStatus}
          order={viewModel.selectedOrder}
          hsCodeData={viewModel.hsCodeData}
          modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          setUpdateSupplierData={viewModel.setUpdateSupplierData}
          onClickUpdataSupplierData={viewModel.onClickUpdataSupplierData}
          onClickSaveWithoutUpdateSupData={viewModel.onClickSaveWithoutUpdateSupData}
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

      <Modal
        missClickModalOn
        openModal={viewModel.showPaymentMethodsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
      >
        <PaymentMethodsForm
          // @ts-ignore
          readOnly={paymentMethodsReadOnlyStatuses.includes(viewModel.currentOrder?.status)}
          // @ts-ignore
          orderPayments={viewModel.currentOrder?.payments}
          allPayments={viewModel.paymentMethods}
          // @ts-ignore
          onClickSaveButton={state => viewModel.saveOrderPayment(viewModel.currentOrder, state)}
          onClickCancelButton={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
        />
      </Modal>
    </div>
  )
})
