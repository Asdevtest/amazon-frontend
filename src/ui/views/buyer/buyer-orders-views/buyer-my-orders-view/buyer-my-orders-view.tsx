import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './buyer-my-orders-view.style'

import { attentionStatuses, paymentMethodsReadOnlyStatuses } from './buyer-my-orders-view.constants'
import { BuyerMyOrdersViewModel } from './buyer-my-orders-view.model'
import { PaymentAllSuppliers } from './payment-all-suppliers/payment-all-suppliers'

export const BuyerMyOrdersView = observer(({ history }) => {
  
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new BuyerMyOrdersViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params =>
    attentionStatuses.includes(params.row.originalData.status) &&
    history.location.pathname === routsPathes.BUYER_MY_ORDERS_ALL_ORDERS &&
    styles.attentionRow

  const isNoPaidedOrders = viewModel.orderStatusDataBase.some(
    status =>
      Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
      Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
  )

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.searchInput} />

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
          onSubmit={viewModel.onSearchSubmit}
        />

        <PaymentAllSuppliers
          paymentAmount={viewModel.paymentAmount}
          isNoPaidedOrders={isNoPaidedOrders}
          yuanToDollarRate={viewModel.platformSettings?.yuanToDollarRate}
        />
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          getRowClassName={getRowClassName}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: { ...viewModel.columnMenuSettings, orderStatusData: viewModel.orderStatusData },

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
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onRowDoubleClick={e => viewModel.onClickOrder(e.row.originalData._id)}
        />
      </div>

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => {
          viewModel.setUpdateSupplierData(false)
          viewModel.onTriggerOpenModal('showOrderModal')
        }}
      >
        <EditOrderModal
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
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal
        missClickModalOn
        openModal={viewModel.showPaymentMethodsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
      >
        <PaymentMethodsForm
          readOnly={paymentMethodsReadOnlyStatuses.includes(viewModel.currentOrder?.status)}
          orderPayments={viewModel.currentOrder?.payments}
          allPayments={viewModel.paymentMethods}
          onClickSaveButton={state => viewModel.saveOrderPayment(viewModel.currentOrder, state)}
          onClickCancelButton={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
        />
      </Modal>

      {viewModel.requestStatus === loadingStatus.IS_LOADING && <CircularProgressWithLabel />}
    </>
  )
})
