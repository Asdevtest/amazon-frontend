import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {routsPathes} from '@constants/navigation/routs-pathes'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/statuses/order-status'
import {BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomColumnMenuComponent} from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {PaymentMethodsForm} from '@components/forms/payment-methods-form'
import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {EditOrderModal} from '@components/modals/edit-order-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'
import {SearchInput} from '@components/shared/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {toFixedWithDollarSign, toFixedWithYuanSign} from '@utils/text'
import {t} from '@utils/translations'

import {BuyerMyOrdersViewModel} from './buyer-my-orders-view.model'
import {styles} from './buyer-my-orders-view.style'

const attentionStatuses = [
  OrderStatusByKey[OrderStatus.AT_PROCESS],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
]

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      isSomeFilterOn,
      columnMenuSettings,
      pathnameNotPaid,
      yuanToDollarRate,
      orderStatusData,
      warningInfoModalSettings,
      updateSupplierData,
      confirmModalSettings,
      onClickUpdataSupplierData,
      onClickSaveWithoutUpdateSupData,
      setUpdateSupplierData,
      userInfo,
      rowCount,
      showSuccessModalText,
      volumeWeightCoefficient,
      photosToLoad,
      requestStatus,
      currentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      columnVisibilityModel,

      paymentAmount,

      curBoxesOfOrder,
      curPage,
      rowsPerPage,
      selectedOrder,
      showOrderModal,
      showSuccessModal,
      showNoDimensionsErrorModal,
      showWarningNewBoxesModal,
      showOrderPriceMismatchModal,
      showPaymentMethodsModal,
      showWarningInfoModal,
      showConfirmModal,
      showEditHSCodeModal,
      hsCodeData,

      showProgress,
      progressValue,
      imagesForLoad,
      paymentMethods,
      currentOrder,
      orderStatusDataBase,

      onClickHsCode,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrder,
      onSubmitSaveOrder,
      onTriggerOpenModal,
      onClickSaveSupplierBtn,

      setDataGridState,
      onColumnVisibilityModelChange,
      onChangeSortingModel,
      onChangeFilterModel,
      // onSubmitCancelOrder,
      onSaveOrderItem,
      saveOrderPayment,

      onSearchSubmit,
      onSubmitChangeBoxFields,
      onClickSaveHsCode,

      changeColumnsModel,
      onChangeImagesForLoad,
      onClickResetFilters,
      setPhotosToLoad,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      attentionStatuses.includes(params.row.originalData.status) &&
      this.props.history.location.pathname === routsPathes.BUYER_MY_ORDERS_ALL_ORDERS &&
      classNames.attentionRow

    const validOrderPayments =
      currentOrder && currentOrder?.orderSupplier?.paymentMethods?.length
        ? currentOrder?.orderSupplier?.paymentMethods.filter(
            method => !currentOrder?.payments.some(payment => payment.paymentMethod._id === method._id),
          )
        : paymentMethods.filter(
            method => !currentOrder?.payments.some(payment => payment.paymentMethod._id === method._id),
          )

    const payments = currentOrder && [...currentOrder.payments, ...validOrderPayments]

    const isNoPaidedOrders = orderStatusDataBase.some(
      status =>
        Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
        Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
    )

    return (
      <React.Fragment>
        <MainContent>
          <div
            className={cx(classNames.headerWrapper, {
              [classNames.headerWrapperCenter]: !paymentAmount?.totalPriceInYuan,
            })}
          >
            {paymentAmount?.totalPriceInYuan > 0 && <div className={classNames.totalPriceWrapper} />}

            <SearchInput
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
              onSubmit={onSearchSubmit}
            />

            {paymentAmount?.totalPriceInYuan > 0 && (
              <div className={classNames.totalPriceWrapper}>
                <Typography className={classNames.totalPriceText}>
                  {isNoPaidedOrders ? t(TranslationKey.Sum) + ':' : t(TranslationKey['Payment to all suppliers']) + ':'}
                </Typography>
                <div className={classNames.totalPriceTextWrapper}>
                  <Typography className={cx(classNames.totalPriceText, classNames.totalPrice)}>
                    {`${toFixedWithYuanSign(
                      isNoPaidedOrders
                        ? paymentAmount?.totalPriceInUSD * yuanToDollarRate
                        : paymentAmount?.totalPriceInYuan,
                      2,
                    )} ${t(TranslationKey.Or).toLocaleLowerCase()} ${toFixedWithDollarSign(
                      paymentAmount?.totalPriceInUSD,
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
              rowCount={rowCount}
              sortModel={sortModel}
              filterModel={filterModel}
              page={curPage}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={currentData}
              // rowHeight={100}
              getRowHeight={() => 'auto'}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
                ColumnMenu: DataGridCustomColumnMenuComponent,
              }}
              componentsProps={{
                columnMenu: {...columnMenuSettings, orderStatusData},
                toolbar: {
                  resetFiltersBtnSettings: {onClickResetFilters, isSomeFilterOn},
                  columsBtnSettings: {columnsModel, changeColumnsModel},
                },
              }}
              columnVisibilityModel={columnVisibilityModel}
              density={densityModel}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onPageChange={onChangeCurPage}
              onFilterModelChange={onChangeFilterModel}
              onColumnVisibilityModelChange={onColumnVisibilityModelChange}
              onStateChange={setDataGridState}
              onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
            />
          </div>
        </MainContent>

        <Modal
          missClickModalOn
          openModal={showOrderModal}
          setOpenModal={() => {
            setUpdateSupplierData(false)
            onTriggerOpenModal('showOrderModal')
          }}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <EditOrderModal
            paymentMethods={paymentMethods}
            imagesForLoad={imagesForLoad}
            hsCodeData={hsCodeData}
            userInfo={userInfo}
            updateSupplierData={updateSupplierData}
            pathnameNotPaid={pathnameNotPaid}
            yuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            photosToLoad={photosToLoad}
            requestStatus={requestStatus}
            boxes={curBoxesOfOrder}
            order={selectedOrder}
            modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
            showProgress={showProgress}
            progressValue={progressValue}
            setPhotosToLoad={setPhotosToLoad}
            setUpdateSupplierData={setUpdateSupplierData}
            onChangeImagesForLoad={onChangeImagesForLoad}
            onClickUpdataSupplierData={onClickUpdataSupplierData}
            onClickSaveWithoutUpdateSupData={onClickSaveWithoutUpdateSupData}
            onTriggerOpenModal={onTriggerOpenModal}
            onSubmitSaveOrder={onSubmitSaveOrder}
            onSaveOrderItem={onSaveOrderItem}
            onSubmitChangeBoxFields={onSubmitChangeBoxFields}
            onClickHsCode={onClickHsCode}
            onClickSaveSupplierBtn={onClickSaveSupplierBtn}
          />
        </Modal>

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={confirmModalSettings.title}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <WarningInfoModal
          openModal={showNoDimensionsErrorModal}
          setOpenModal={() => onTriggerOpenModal('showNoDimensionsErrorModal')}
          title={t(TranslationKey['The fields must be filled in to create the box!'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showNoDimensionsErrorModal')
          }}
        />

        <WarningInfoModal
          openModal={showWarningNewBoxesModal}
          setOpenModal={() => onTriggerOpenModal('showWarningNewBoxesModal')}
          title={t(TranslationKey['Creating new boxes. Be careful!'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningNewBoxesModal')
          }}
        />

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningInfoModal}
          setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningInfoModal')
          }}
        />

        <WarningInfoModal
          openModal={showOrderPriceMismatchModal}
          setOpenModal={() => onTriggerOpenModal('showOrderPriceMismatchModal')}
          title={t(
            TranslationKey[
              'The "Paid" status will become available after the client confirms the change of the cost of the order. The current status will not be changed! Boxes will not be created'
            ],
          )}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showOrderPriceMismatchModal')
          }}
        />

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={showSuccessModalText}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showPaymentMethodsModal}
          setOpenModal={() => onTriggerOpenModal('showPaymentMethodsModal')}
        >
          <PaymentMethodsForm
            readOnly={Number(currentOrder?.status) !== Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])}
            payments={payments}
            onClickSaveButton={state => saveOrderPayment(currentOrder, state)}
            onClickCancelButton={() => onTriggerOpenModal('showPaymentMethodsModal')}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const BuyerMyOrdersView = withStyles(BuyerMyOrdersViewRaw, styles)
