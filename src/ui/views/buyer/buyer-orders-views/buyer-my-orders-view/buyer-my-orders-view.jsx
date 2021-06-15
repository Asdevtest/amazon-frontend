import React, {Component} from 'react'

import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {BUYER_STATUS_LIST} from '@constants/mocks'
import {BUYER_MY_ORDERS_HEAD_CELLS, BUYER_MY_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'
import {warehouses} from '@constants/warehouses'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'
import {SetBarcodeModal} from '@components/screens/set-barcode-modal'
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
    this.viewModel.getOrdersMy()
  }

  render() {
    const {
      drawerOpen,
      ordersMy,
      curPage,
      rowsPerPage,
      selectedOrder,
      showBarcodeModal,
      showOrderModal,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onTriggerShowBarcodeModal,
      onTriggerShowOrderModal,
      onChangeSelectedOrder,
    } = this.viewModel
    const {classes: className} = this.props

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
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={className.tableWrapper}>
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
                  rowsHandlers={{
                    onOrder: onTriggerShowOrderModal,
                    onBarcode: onTriggerShowBarcodeModal,
                    onSelector: onChangeSelectedOrder,
                  }}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showOrderModal} setOpenModal={onTriggerShowOrderModal}>
          <EditOrderModal
            order={selectedOrder}
            setModal={onTriggerShowOrderModal}
            setModalBarcode={onTriggerShowBarcodeModal}
            modalHeadCells={BUYER_MY_ORDERS_MODAL_HEAD_CELLS}
            warehouses={warehouses}
            deliveryList={DELIVERY_OPTIONS}
            statusList={BUYER_STATUS_LIST}
          />
        </Modal>
        <Modal openModal={showBarcodeModal} setOpenModal={onTriggerShowBarcodeModal}>
          <SetBarcodeModal setModalBarcode={onTriggerShowBarcodeModal} />
        </Modal>
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
