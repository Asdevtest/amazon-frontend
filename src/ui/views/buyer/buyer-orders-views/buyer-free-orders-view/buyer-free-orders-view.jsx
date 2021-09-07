import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
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
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
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

const navbarActiveCategory = 3

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
      history,
      rowsPerPage,
      showOrderModal,
      onTriggerShowBarcodeModal,
      onTriggerShowOrderModal,
      onTriggerDrawerOpen,
      onChangePage,
      onChangeRowsPerPage,
      onClickTableRowBtn,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickTableRowBtn,
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
            history={history}
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
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={FREE_ORDERS_TABLE_HEADERS} />)
}

export const BuyerFreeOrdersView = withStyles(styles)(BuyerFreeOrdersViewRaw)
