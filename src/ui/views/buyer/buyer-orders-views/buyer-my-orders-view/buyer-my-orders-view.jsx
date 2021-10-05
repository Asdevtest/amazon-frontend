import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {loadingStatuses} from '@constants/loading-statuses'
import {BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'
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

const navbarActiveCategory = 3

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
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
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrder,
      onSubmitSaveOrder,
      onSubmitCreateBoxes,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
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
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  classes={{
                    row: classNames.row,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
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
                  onStateChange={e => e.state.containerSizes?.isVirtualized && setDataGridState(e.state)}
                  onRowDoubleClick={e => onClickOrder(e.row)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal
          openModal={showOrderModal}
          setOpenModal={() => onTriggerOpenModal('showOrderModal')}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <EditOrderModal
            boxes={curBoxesOfOrder}
            order={selectedOrder}
            modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS}
            warehouses={warehouses}
            deliveryTypeByCode={DeliveryTypeByCode}
            onTriggerOpenModal={onTriggerOpenModal}
            onSubmitSaveOrder={onSubmitSaveOrder}
            onSubmitCreateBoxes={onSubmitCreateBoxes}
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

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={"Создана задача складу: 'создание коробок'"}
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
