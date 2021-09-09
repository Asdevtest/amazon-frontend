import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {OrderStatusByCode} from '@constants/order-status'
import {BUYER_MY_ORDERS_HEAD_CELLS, BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'
import {warehouses} from '@constants/warehouses'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ErrorInfoModal} from '@components/modals/error-info-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/orders-views/table-body-row'
import {TableHeadRow} from '@components/table-rows/buyer/orders-views/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/buyerAvatar.jpg'
import {BuyerMyOrdersViewModel} from './buyer-my-orders-view.model'
import {styles} from './buyer-my-orders-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').myOrdersView

const navbarActiveCategory = 2

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curBoxesOfOrder,
      drawerOpen,
      ordersMy,
      curPage,
      rowsPerPage,
      selectedOrder,
      showOrderModal,
      showSuccessModal,
      showNoDimensionsErrorModal,
      showWarningNewBoxesModal,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onClickOrder,
      onSelectedOrder,
      onSubmitSaveOrder,
      onSubmitCreateBoxes,
      onTriggerOpenModal,
    } = this.viewModel
    const {classes: classNames} = this.props
    const rowHandlers = {
      onClickOrder,
      onSelectedOrder,
    }
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
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  currentPage={curPage}
                  data={ordersMy}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(ordersMy.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={rowHandlers}
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
            orderStatusByCode={OrderStatusByCode}
            onTriggerOpenModal={onTriggerOpenModal}
            onSubmitSaveOrder={onSubmitSaveOrder}
            onSubmitCreateBoxes={onSubmitCreateBoxes}
          />
        </Modal>

        <ErrorInfoModal
          openModal={showNoDimensionsErrorModal}
          setOpenModal={() => onTriggerOpenModal('showNoDimensionsErrorModal')}
          title={textConsts.dimensionsMessage}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showNoDimensionsErrorModal')
          }}
        />

        <ErrorInfoModal
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

  renderHeadRow = (<TableHeadRow headCells={BUYER_MY_ORDERS_HEAD_CELLS} />)
}

export const BuyerMyOrdersView = withStyles(styles)(BuyerMyOrdersViewRaw)
