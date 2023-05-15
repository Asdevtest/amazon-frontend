import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
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

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerMyOrdersViewModel} from './buyer-pending-orders-view.model'
import {styles} from './buyer-pending-orders-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_PENDING_ORDERS

@observer
class BuyerPendingOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      orderStatusData,
      yuanToDollarRate,
      warningInfoModalSettings,
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

      curBoxesOfOrder,
      drawerOpen,
      curPage,
      rowsPerPage,
      selectedOrder,
      hsCodeData,
      showOrderModal,
      showSuccessModal,
      showNoDimensionsErrorModal,
      showWarningNewBoxesModal,
      showOrderPriceMismatchModal,
      showWarningInfoModal,
      showConfirmModal,
      showEditHSCodeModal,

      showProgress,
      progressValue,
      imagesForLoad,
      paymentMethods,

      onClickHsCode,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrder,
      onSubmitSaveOrder,
      onTriggerOpenModal,
      onChangeImagesForLoad,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onSubmitCancelOrder,
      onSaveOrderItem,

      onSearchSubmit,
      onSubmitChangeBoxFields,
      setPhotosToLoad,
      onClickSaveSupplierBtn,
      onClickSaveHsCode,
      changeColumnsModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />

        <Main>
          <Appbar title={t(TranslationKey['Pending orders'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
                  onSubmit={onSearchSubmit}
                />
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
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection[0])
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onRowDoubleClick={e => onClickOrder(e.row.originalData._id)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal
          missClickModalOn
          openModal={showOrderModal}
          setOpenModal={() => onTriggerOpenModal('showOrderModal')}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <EditOrderModal
            isPendingOrder
            paymentMethods={paymentMethods}
            imagesForLoad={imagesForLoad}
            hsCodeData={hsCodeData}
            yuanToDollarRate={yuanToDollarRate}
            userInfo={userInfo}
            volumeWeightCoefficient={volumeWeightCoefficient}
            photosToLoad={photosToLoad}
            requestStatus={requestStatus}
            boxes={curBoxesOfOrder}
            order={selectedOrder}
            modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS()}
            showProgress={showProgress}
            progressValue={progressValue}
            setPhotosToLoad={setPhotosToLoad}
            onTriggerOpenModal={onTriggerOpenModal}
            onSubmitSaveOrder={onSubmitSaveOrder}
            onSaveOrderItem={onSaveOrderItem}
            onSubmitChangeBoxFields={onSubmitChangeBoxFields}
            onClickSaveSupplierBtn={onClickSaveSupplierBtn}
            onClickHsCode={onClickHsCode}
            onChangeImagesForLoad={onChangeImagesForLoad}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey['Attention. Are you sure?'])}
          message={t(TranslationKey['Are you sure you want to cancel the order?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onSubmitCancelOrder}
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
      </React.Fragment>
    )
  }
}

export const BuyerPendingOrdersView = withStyles(BuyerPendingOrdersViewRaw, styles)
