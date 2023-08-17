import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Typography } from '@mui/material'

import { routsPathes } from '@constants/navigation/routs-pathes'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { BUYER_MY_ORDERS_MODAL_HEAD_CELLS } from '@constants/table/table-head-cells'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { PaymentMethodsForm } from '@components/forms/payment-methods-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { EditOrderModal } from '@components/modals/edit-order-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { toFixedWithDollarSign, toFixedWithYuanSign } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './buyer-my-orders-view.style'

import { BuyerMyOrdersViewModel } from './buyer-my-orders-view.model'

const attentionStatuses = [
  OrderStatusByKey[OrderStatus.AT_PROCESS],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
]

export const BuyerMyOrdersViewRaw = props => {
  const [viewModel] = useState(() => new BuyerMyOrdersViewModel({ history: props.history, location: props.location }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
    viewModel.getDataGridState()
  }, [])

  const getRowClassName = params =>
    attentionStatuses.includes(params.row.originalData.status) &&
    props.history.location.pathname === routsPathes.BUYER_MY_ORDERS_ALL_ORDERS &&
    classNames.attentionRow

  const validOrderPayments =
    viewModel.currentOrder && viewModel.currentOrder?.orderSupplier?.paymentMethods?.length
      ? viewModel.currentOrder?.orderSupplier?.paymentMethods.filter(
          method => !viewModel.currentOrder?.payments.some(payment => payment.paymentMethod._id === method._id),
        )
      : viewModel.paymentMethods.filter(
          method => !viewModel.currentOrder?.payments.some(payment => payment.paymentMethod._id === method._id),
        )

  const payments = viewModel.currentOrder && [...viewModel.currentOrder.payments, ...validOrderPayments]

  const isNoPaidedOrders = viewModel.orderStatusDataBase.some(
    status =>
      Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
      Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
  )

  return (
    <React.Fragment>
      <div>
        <div
          className={cx(classNames.headerWrapper, {
            [classNames.headerWrapperCenter]:
              !viewModel.paymentAmount?.totalPriceInYuan &&
              !viewModel.paymentAmount?.totalPriceInUSD &&
              !viewModel.paymentAmount?.partialPaymentAmountRmb,
          })}
        >
          {(viewModel.paymentAmount?.totalPriceInYuan ||
            (isNoPaidedOrders && viewModel.paymentAmount?.totalPriceInUSD) ||
            viewModel.paymentAmount?.partialPaymentAmountRmb) > 0 && <div className={classNames.totalPriceWrapper} />}

          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
            onSubmit={viewModel.onSearchSubmit}
          />

          {(viewModel.paymentAmount?.totalPriceInYuan ||
            (isNoPaidedOrders && viewModel.paymentAmount?.totalPriceInUSD) ||
            viewModel.paymentAmount?.partialPaymentAmountRmb) > 0 && (
            <div className={classNames.totalPriceWrapper}>
              <Typography className={classNames.totalPriceText}>
                {isNoPaidedOrders ? t(TranslationKey.Sum) + ':' : t(TranslationKey['Payment to all suppliers']) + ':'}
              </Typography>
              <div className={classNames.totalPriceTextWrapper}>
                <Typography className={cx(classNames.totalPriceText, classNames.totalPrice)}>
                  {`${toFixedWithYuanSign(
                    isNoPaidedOrders
                      ? Number(viewModel.paymentAmount?.totalPriceInUSD) * Number(viewModel.yuanToDollarRate) +
                          viewModel.paymentAmount?.partialPaymentAmountRmb
                      : viewModel.paymentAmount?.totalPriceInYuan + viewModel.paymentAmount?.partialPaymentAmountRmb,
                    2,
                  )} ${t(TranslationKey.Or).toLocaleLowerCase()} ${toFixedWithDollarSign(
                    viewModel.paymentAmount?.totalPriceInUSD +
                      viewModel.paymentAmount?.partialPaymentAmountRmb / Number(viewModel.yuanToDollarRate),
                    2,
                  )}`}
                </Typography>
              </div>
            </div>
          )}
        </div>

        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            getRowClassName={getRowClassName}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            // rowHeight={100}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
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
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onSortModelChange={viewModel.onChangeSortingModel}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.onClickOrder(e.row.originalData._id)}
          />
        </div>
      </div>

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => {
          viewModel.setUpdateSupplierData(false)
          viewModel.onTriggerOpenModal('showOrderModal')
        }}
        dialogContextClassName={classNames.dialogContextClassName}
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
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')
        }}
      />

      <WarningInfoModal
        openModal={viewModel.showWarningNewBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningNewBoxesModal')}
        title={t(TranslationKey['Creating new boxes. Be careful!'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningNewBoxesModal')
        }}
      />

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
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
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showOrderPriceMismatchModal')
        }}
      />

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.showSuccessModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
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
          payments={payments}
          onClickSaveButton={state => viewModel.saveOrderPayment(viewModel.currentOrder, state)}
          onClickCancelButton={() => viewModel.onTriggerOpenModal('showPaymentMethodsModal')}
        />
      </Modal>

      {viewModel.savingOrderStatus === loadingStatuses.isLoading && (
        <CircularProgressWithLabel wrapperClassName={classNames.loadingCircle} />
      )}
    </React.Fragment>
  )
}

export const BuyerMyOrdersView = withStyles(observer(BuyerMyOrdersViewRaw), styles)
