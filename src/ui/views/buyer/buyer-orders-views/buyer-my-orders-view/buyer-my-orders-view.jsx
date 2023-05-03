import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {routsPathes} from '@constants/routs-pathes'
import {BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {PaymentMethodsForm} from '@components/forms/payment-methods-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'
import {SearchInput} from '@components/search-input'
import {BuyerReadyForPaymentColumns} from '@components/table-columns/buyer/buyer-ready-for-payment-columns'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {toFixedWithYuanSign} from '@utils/text'
import {t} from '@utils/translations'

import {BuyerMyOrdersViewModel} from './buyer-my-orders-view.model'
import {styles} from './buyer-my-orders-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS

const attentionStatuses = [
  OrderStatusByKey[OrderStatus.AT_PROCESS],
  OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
  OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
]

const categoryNameByUrl = {
  '/buyer/ready-for-payment-orders': 'Ready for payment',
  '/buyer/not-paid-orders': 'Not paid',
  '/buyer/need-track-number-orders': 'Need track number',
  '/buyer/inbound-orders': 'Inbound',
  '/buyer/confirmation-required-orders': 'Confirmation required',
  '/buyer/closed-and-canceled-orders': 'Closed and canceled',
  '/buyer/all-orders': 'All orders',
}

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
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
      drawerOpen,
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
      navbarActiveSubCategory,
      hsCodeData,

      showProgress,
      progressValue,
      imagesForLoad,
      paymentMethods,
      currentOrder,
      // isReadyForPayment,

      firstRowId,
      rowHandlers,

      onClickHsCode,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrder,
      onSubmitSaveOrder,
      onTriggerOpenModal,
      onClickSaveSupplierBtn,

      // setDataGridState,
      onColumnVisibilityModelChange,
      setFirstRowId,
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

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />

        <Main>
          <Appbar
            title={`${t(TranslationKey['My orders'])} - ${t(
              TranslationKey[categoryNameByUrl[this.props.location.pathname]],
            )}`}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div
                className={cx(classNames.headerWrapper, {
                  [classNames.headerWrapperCenter]: !paymentAmount?.totalPriceInYuan,
                })}
              >
                {paymentAmount?.totalPriceInYuan && <div className={classNames.totalPriceWrapper} />}

                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
                  onSubmit={onSearchSubmit}
                />

                {paymentAmount?.totalPriceInYuan && (
                  <div className={classNames.totalPriceWrapper}>
                    <Typography className={classNames.totalPriceText}>
                      {t(TranslationKey['Payment to all suppliers']) + ':'}
                    </Typography>
                    <Typography className={cx(classNames.totalPriceText, classNames.totalPrice)}>
                      {toFixedWithYuanSign(paymentAmount?.totalPriceInYuan, 2)}
                    </Typography>
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
                    columnMenu: {orderStatusData},
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
                  columnVisibilityModel={columnVisibilityModel}
                  density={densityModel}
                  columns={
                    // isReadyForPayment
                    //   ?
                    BuyerReadyForPaymentColumns(firstRowId, rowHandlers)
                    // : buyerMyOrdersViewColumns(firstRowId)
                    // columnsModel
                  }
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onFilterModelChange={onChangeFilterModel}
                  onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                  onStateChange={setFirstRowId}
                  onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

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
