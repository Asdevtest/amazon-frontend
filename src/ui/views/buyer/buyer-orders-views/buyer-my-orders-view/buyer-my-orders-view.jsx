import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxViewForm } from '@components/forms/box-view-form'
import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './buyer-my-orders-view.style'

import { attentionStatuses } from './buyer-my-orders-view.constants'
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
          yuanToDollarRate={viewModel.yuanToDollarRate}
        />
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          useResizeContainer
          localeText={getLocalizationByLanguageTag()}
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
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
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
        dialogClassName={styles.dialogClassName}
      >
        <EditOrderModal
          platformSettings={viewModel.platformSettings}
          paymentMethods={viewModel.paymentMethods}
          imagesForLoad={viewModel.imagesForLoad}
          hsCodeData={viewModel.hsCodeData}
          userInfo={viewModel.userInfo}
          updateSupplierData={viewModel.updateSupplierData}
          pathnameNotPaid={viewModel.pathnameNotPaid}
          yuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          photosToLoad={viewModel.photosToLoad}
          requestStatus={viewModel.requestStatus}
          boxes={viewModel.curBoxesOfOrder}
          order={viewModel.selectedOrder}
          modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          setPhotosToLoad={viewModel.setPhotosToLoad}
          setCurrentOpenedBox={viewModel.setCurrentOpenedBox}
          setUpdateSupplierData={viewModel.setUpdateSupplierData}
          onChangeImagesForLoad={viewModel.onChangeImagesForLoad}
          onClickUpdataSupplierData={viewModel.onClickUpdataSupplierData}
          onClickSaveWithoutUpdateSupData={viewModel.onClickSaveWithoutUpdateSupData}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
          onSaveOrderItem={viewModel.onSaveOrderItem}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
          onClickSaveSupplierBtn={viewModel.onClickSaveSupplierBtn}
        />
      </Modal>

      <ConfirmationModal
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

      <WarningInfoModal
        openModal={viewModel.showNoDimensionsErrorModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')}
        title={t(TranslationKey['The fields must be filled in to create the box!'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')}
      />

      <WarningInfoModal
        openModal={viewModel.showWarningNewBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningNewBoxesModal')}
        title={t(TranslationKey['Creating new boxes. Be careful!'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningNewBoxesModal')}
      />

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
      />

      <WarningInfoModal
        openModal={viewModel.showOrderPriceMismatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderPriceMismatchModal')}
        title={t(
          TranslationKey[
            'The "Paid" status will become available after the client confirms the change of the cost of the order. The current status will not be changed! Boxes will not be created'
          ],
        )}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => viewModel.onTriggerOpenModal('showOrderPriceMismatchModal')}
      />

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.showSuccessModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessModal')}
      />

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showPaymentMethodsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
      >
        <PaymentMethodsForm
          readOnly={Number(viewModel.currentOrder?.status) !== Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])}
          orderPayments={viewModel.currentOrder?.payments}
          allPayments={viewModel.paymentMethods}
          onClickSaveButton={state => viewModel.saveOrderPayment(viewModel.currentOrder, state)}
          onClickCancelButton={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

      {viewModel.requestStatus === loadingStatuses.IS_LOADING && (
        <CircularProgressWithLabel wrapperClassName={styles.loadingCircle} />
      )}
    </>
  )
})
