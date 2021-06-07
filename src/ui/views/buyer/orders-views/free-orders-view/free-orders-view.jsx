import React, {Component} from 'react'

import {Container, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {
  FREE_ORDERS_TABLE_HEADERS,
  ORDERS_MODAL_HEAD_CELLS,
  BUYER_WAREHOUSE_LIST,
  BUYER_STATUS_LIST,
  BUYER_DELIVERY_LIST,
} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'
import {SetBarcodeModal} from '@components/screens/buyer/orders-view/set-barcode-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/buyer/orders-views/table-body-row'
import {TableHeadRow} from '@components/table-rows/buyer/orders-views/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/buyerAvatar.jpg'
import {FreeOrdersViewModel} from './free-orders-view.model'
import {styles} from './free-orders-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').freeOrdersView

@observer
class FreeOrdersViewRaw extends Component {
  viewModel = new FreeOrdersViewModel({history: this.props.history})
  state = {
    activeCategory: 2,
    activeSubCategory: 1,
    drawerOpen: false,
    modalBarcode: false,
    modalOrder: false,
    rowsPerPage: 5,
    paginationPage: 1,
    selectedOrder: 0,
  }

  componentDidMount() {
    this.viewModel.getOrdersVacant()
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen, selectedOrder} = this.state
    const {ordersVacant} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.buyer}
          setSubItem={this.onChangeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.onChangeDrawerOpen}
          user={textConsts.appUser}
        />

        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>

              <Table
                buttons={this.state.renderButtons}
                currentPage={this.state.paginationPage}
                data={ordersVacant}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(ordersVacant.length / this.state.rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={this.state.rowsPerPage}
                rowsHandlers={{
                  onOrder: this.onChangeModalOrder,
                  onBarcode: this.onChangeModalBarcode,
                  onSelector: this.onChangeSelectedOrder,
                }}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={this.state.modalOrder} setOpenModal={this.onChangeModalOrder}>
          {ordersVacant[selectedOrder] ? (
            <EditOrderModal
              order={ordersVacant[selectedOrder]}
              setModal={this.onChangeModalOrder}
              setModalBarcode={this.onChangeModalBarcode}
              modalHeadCells={ORDERS_MODAL_HEAD_CELLS}
              warehouseList={BUYER_WAREHOUSE_LIST}
              deliveryList={BUYER_DELIVERY_LIST}
              statusList={BUYER_STATUS_LIST}
            />
          ) : undefined}
        </Modal>
        <Modal openModal={this.state.modalBarcode} setOpenModal={this.onChangeModalBarcode}>
          <SetBarcodeModal setModalBarcode={this.onChangeModalBarcode} />
        </Modal>
      </React.Fragment>
    )
  }

  renderButtons = (
    <Container className={this.props.classes.buttonWrapper}>
      <Button color="secondary">{textConsts.ordersBtn}</Button>
    </Container>
  )

  renderHeadRow = (<TableHeadRow headCells={FREE_ORDERS_TABLE_HEADERS} />)

  onChangeSelectedOrder = value => {
    this.setState({selectedOrder: value})
  }

  onChangeModalBarcode = () => {
    this.setState({modalBarcode: !this.state.modalBarcode})
  }

  onChangeModalOrder = () => {
    this.setState({modalOrder: !this.state.modalOrder})
  }

  onChangeDrawerOpen = (e, value) => {
    this.setState({drawerOpen: value})
  }

  onChangeCategory = (e, value) => {
    this.setState({activeCategory: value})
  }

  onChangeSubCategory = (e, value) => {
    this.setState({activeSubCategory: value})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPge: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPge: 1})
  }
}

const FreeOrdersView = withStyles(styles)(FreeOrdersViewRaw)

export {FreeOrdersView}
