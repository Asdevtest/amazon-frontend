import React, {Component} from 'react'

import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {OrderStatusByCode} from '@constants/order-status'
import {BUYER_MY_ORDERS_HEAD_CELLS, BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'
import {warehouses} from '@constants/warehouses'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CreateOrEditBoxForm} from '@components/forms/create-or-edit-box-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ErrorInfoModal} from '@components/modals/error-info-modal'
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
const navbarActiveSubCategory = 0

@observer
class BuyerMyOrdersViewRaw extends Component {
  viewModel = new BuyerMyOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      ordersMy,
      curPage,
      history,
      rowsPerPage,
      selectedOrder,
      showOrderModal,
      showCreateOrEditBoxModal,
      showNoDimensionsErrorModal,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onTriggerShowOrderModal,
      onClickOrder,
      onSelectedOrder,
      onSubmitSaveOrder,
      onTriggerShowCreateOrEditBoxModal,
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
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            history={history}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  renderButtons={this.renderButtons}
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
        <Modal openModal={showCreateOrEditBoxModal} setOpenModal={onTriggerShowCreateOrEditBoxModal}>
          <Typography variant="h5">{textConsts.modalEditBoxTitle}</Typography>
          <CreateOrEditBoxForm
            order={selectedOrder}
            onSubmit={onSubmitCreateBoxes}
            onCloseModal={onTriggerShowCreateOrEditBoxModal}
          />
        </Modal>
        <Modal
          openModal={showOrderModal}
          setOpenModal={onTriggerShowOrderModal}
          dialogContextClassName={classNames.dialogContextClassName}
        >
          <EditOrderModal
            order={selectedOrder}
            modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS}
            warehouses={warehouses}
            deliveryTypeByCode={DeliveryTypeByCode}
            orderStatusByCode={OrderStatusByCode}
            onTriggerModal={onTriggerShowOrderModal}
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
      </React.Fragment>
    )
  }

  renderButtons = () => {
    const {classes: classNames} = this.props
    return (
      <Container className={classNames.buttonWrapper}>
        <Button color="secondary">{textConsts.ordersBtn}</Button>
      </Container>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={BUYER_MY_ORDERS_HEAD_CELLS} />)
}

export const BuyerMyOrdersView = withStyles(styles)(BuyerMyOrdersViewRaw)
