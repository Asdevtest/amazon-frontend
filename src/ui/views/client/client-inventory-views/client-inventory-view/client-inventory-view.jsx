import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {ClientInventoryDashboardCardDataKey, getClientInventoryDashboardCardConfig} from '@constants/dashboard-configs'
import {clientUsername, CLIENT_INVENTORY_MY_PRODUCTS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {SendOwnProductForm} from '@components/forms/send-own-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/inventory-view/order-product-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/client/inventory/products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/client/inventory/products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientInventoryViewModel} from './client-inventory-view.model'
import {styles} from './client-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView
const inventoryDashboardCardConfig = getClientInventoryDashboardCardConfig(textConsts)

const navbarActiveCategory = 2

@observer
export class ClientInventoryViewRaw extends Component {
  viewModel = new ClientInventoryViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedProducts,
      drawerOpen,
      selectedProduct,
      showSetBarcodeModal,
      curPage,
      productsMy,
      rowsPerPage,
      showOrderModal,
      showSuccessModal,
      showSendOwnProductModal,
      onClickBarcode,
      onClickExchange,
      onDoubleClickBarcode,
      onDeleteBarcode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickSaveBarcode,
      onTriggerOpenModal,
      onTriggerCheckbox,
      onSubmitOrderProductModal,
      onDoubleClickRow,
    } = this.viewModel
    const {classes: classNames} = this.props

    const tableRowHandlers = {
      onClickBarcode,
      onClickExchange,
      onDoubleClickBarcode,
      onDeleteBarcode,
      onCheckbox: onTriggerCheckbox,
      onDoubleClickRow,
    }

    const rowsDatas = {
      selectedProducts,
    }

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Grid container justify="center" spacing={2} md={12}>
                {this.renderDashboardCards()}
              </Grid>
              <Typography variant="h6" className={classNames.someClass}>
                {textConsts.productsList}
              </Typography>
              <div className={classNames.addProductBtnWrapper}>
                <SuccessButton onClick={() => onTriggerOpenModal('showSendOwnProductModal')}>
                  {textConsts.addProductBtn}
                </SuccessButton>
              </div>

              <Table
                renderButtons={this.renderButtons}
                currentPage={curPage}
                data={productsMy}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(productsMy.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={tableRowHandlers}
                rowsDatas={rowsDatas}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showSendOwnProductModal} setOpenModal={() => onTriggerOpenModal('showSendOwnProductModal')}>
          <Typography variant="h5">{textConsts.addProductModal}</Typography>
          <SendOwnProductForm />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
          <SetBarcodeModal
            product={selectedProduct}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>

        <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            selectedProductsData={productsMy.filter(product => selectedProducts.includes(product._id))}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onSubmitOrderProductModal}
          />
        </Modal>

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={textConsts.successTitle}
          successBtnText={textConsts.successBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />
      </React.Fragment>
    )
  }

  renderDashboardCards = () =>
    inventoryDashboardCardConfig.map(item => (
      <Grid key={`inventoryDashboardCard_${item.dataKey}`} item>
        <DashboardInfoCard value={this.getCardValueByDataKey(item.dataKey)} title={item.title} color={item.color} />
      </Grid>
    ))

  renderHeadRow = (<TableHeadRow headCells={CLIENT_INVENTORY_MY_PRODUCTS_HEAD_CELLS} />)

  renderButtons = () => (
    <React.Fragment>
      <Button
        variant="contained"
        disabled={this.viewModel.selectedProducts.length === 0}
        onClick={() => this.viewModel.onTriggerOpenModal('showOrderModal')}
      >
        {textConsts.orderBtn}
      </Button>
      <Button color="default" onClick={() => this.viewModel.onResetselectedProducts()}>
        {textConsts.resetBtn}
      </Button>
    </React.Fragment>
  )

  getCardValueByDataKey = dataKey => {
    const {productsMy, orders} = this.viewModel
    switch (dataKey) {
      case ClientInventoryDashboardCardDataKey.PRODUCTS_IN_INVENTORY:
        return productsMy.length
      case ClientInventoryDashboardCardDataKey.PRODUCTS_BOUGHT_ON_EXCHANGE:
        return productsMy.length
      case ClientInventoryDashboardCardDataKey.PRODUCTS_ADDED:
        return 0
      case ClientInventoryDashboardCardDataKey.ORDERS_CHECKOUT:
        return orders.length
      case ClientInventoryDashboardCardDataKey.BOUGHT_FOR_LAST_30_DAYS:
        return 0
    }
  }
}

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
