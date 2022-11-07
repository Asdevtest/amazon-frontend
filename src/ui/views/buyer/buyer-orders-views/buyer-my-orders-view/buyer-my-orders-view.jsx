import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerMyOrdersViewModel} from './buyer-my-orders-view.model'
import {styles} from './buyer-my-orders-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

const attentionStatuses = [OrderStatusByKey[OrderStatus.AT_PROCESS], OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]]

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      nameSearchValue,
      showSuccessModalText,
      volumeWeightCoefficient,
      photosToLoad,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

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
      showConfirmModal,

      showProgress,
      progressValue,

      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrder,
      onSubmitSaveOrder,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onSubmitCancelOrder,
      onSaveOrderItem,

      onChangeNameSearchValue,
      setPhotosToLoad,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      attentionStatuses.includes(params.getValue(params.id, 'status')) && classNames.attentionRow

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />

        <Main>
          <Appbar title={t(TranslationKey['My orders'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                  onChange={onChangeNameSearchValue}
                />
              </div>

              <div className={classNames.dataGridWrapper}>
                <DataGrid
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
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={100}
                  components={{
                    Toolbar: GridToolbar,
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
      </React.Fragment>
    )
  }
}

export const BuyerMyOrdersView = withStyles(BuyerMyOrdersViewRaw, styles)
