import React, {Component} from 'react'

import {Container, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {FREE_ORDERS_TABLE_HEADERS} from '@constants/mocks'
import {BUYER_ORDER_STATUS_LIST} from '@constants/order-status'
import {BUYER_FREE_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'
import {warehouses} from '@constants/warehouses'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/free-orders-views/table-body-row'
import {TableHeadRow} from '@components/table-rows/buyer/free-orders-views/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/buyerAvatar.jpg'
import {BuyerFreeOrdersViewModel} from './buyer-free-orders-view.model'
import {styles} from './buyer-free-orders-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').freeOrdersView

const navbarActiveCategory = 2
const navbarActiveSubCategory = 1

@observer
class BuyerFreeOrdersViewRaw extends Component {
  viewModel = new BuyerFreeOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      ordersVacant,
      drawerOpen,
      selectedOrder,
      curPage,
      rowsPerPage,
      showBarcodeModal,
      showOrderModal,
      onTriggerShowBarcodeModal,
      onTriggerShowOrderModal,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onClickOrder,
      onDoubleClickOrder,
      onClickEditBarcode,
      onClickSaveBarcode,
      onClickDeleteBarcode,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickOrder,
      onDoubleClickOrder,
      onClickEditBarcode,
      onClickDeleteBarcode,
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
                  data={ordersVacant}
                  handlerPageChange={onChangePage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(ordersVacant.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={tableRowHandlers}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showOrderModal} setOpenModal={onTriggerShowOrderModal}>
          {ordersVacant[selectedOrder] ? (
            <EditOrderModal
              order={ordersVacant[selectedOrder]}
              setModal={onTriggerShowOrderModal}
              setModalBarcode={onTriggerShowBarcodeModal}
              modalHeadCells={BUYER_FREE_ORDERS_MODAL_HEAD_CELLS}
              warehouses={warehouses}
              deliveryList={DELIVERY_OPTIONS}
              statusList={BUYER_ORDER_STATUS_LIST}
            />
          ) : undefined}
        </Modal>
        <Modal openModal={showBarcodeModal} setOpenModal={onTriggerShowBarcodeModal}>
          <SetBarcodeModal onClickSaveBarcode={onClickSaveBarcode} onCloseModal={onTriggerShowBarcodeModal} />
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

  renderHeadRow = (<TableHeadRow headCells={FREE_ORDERS_TABLE_HEADERS} />)
}

export const BuyerFreeOrdersView = withStyles(styles)(BuyerFreeOrdersViewRaw)
