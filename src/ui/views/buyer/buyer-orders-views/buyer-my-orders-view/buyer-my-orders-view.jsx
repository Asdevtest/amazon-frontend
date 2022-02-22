import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/buyerAvatar.jpg'
import {BuyerMyOrdersViewModel} from './buyer-my-orders-view.model'
import {styles} from './buyer-my-orders-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').myOrdersView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

const attentionStatuses = [OrderStatusByKey[OrderStatus.AT_PROCESS], OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]]

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
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

      setPhotosToLoad,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      attentionStatuses.includes(params.getValue(params.id, 'status')) && classNames.attentionRow

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
                classes={{
                  row: classNames.row,
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
                onRowDoubleClick={e => onClickOrder(e.row)}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal
          openModal={showOrderModal}
          setOpenModal={() => onTriggerOpenModal('showOrderModal')}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <EditOrderModal
            photosToLoad={photosToLoad}
            requestStatus={requestStatus}
            boxes={curBoxesOfOrder}
            order={selectedOrder}
            modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS}
            warehouses={warehouses}
            deliveryTypeByCode={DeliveryTypeByCode}
            showProgress={showProgress}
            progressValue={progressValue}
            setPhotosToLoad={setPhotosToLoad}
            onTriggerOpenModal={onTriggerOpenModal}
            onSubmitSaveOrder={onSubmitSaveOrder}
          />
        </Modal>

        <WarningInfoModal
          openModal={showNoDimensionsErrorModal}
          setOpenModal={() => onTriggerOpenModal('showNoDimensionsErrorModal')}
          title={textConsts.dimensionsMessage}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showNoDimensionsErrorModal')
          }}
        />

        <WarningInfoModal
          openModal={showWarningNewBoxesModal}
          setOpenModal={() => onTriggerOpenModal('showWarningNewBoxesModal')}
          title={'Создание новых коробок. Будьте внимательны!'}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningNewBoxesModal')
          }}
        />

        <WarningInfoModal
          openModal={showOrderPriceMismatchModal}
          setOpenModal={() => onTriggerOpenModal('showOrderPriceMismatchModal')}
          title={textConsts.warningMessage}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showOrderPriceMismatchModal')
          }}
        />

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={textConsts.successMessage}
          successBtnText={textConsts.okBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const BuyerMyOrdersView = withStyles(styles)(BuyerMyOrdersViewRaw)
