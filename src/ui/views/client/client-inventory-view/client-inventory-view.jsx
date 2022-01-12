import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {ClientInventoryDashboardCardDataKey, getClientInventoryDashboardCardConfig} from '@constants/dashboard-configs'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {AddOwnProductForm} from '@components/forms/add-own-product-form'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {OrderProductModal} from '@components/screens/client/order-product-modal'

import {onStateChangeHandler} from '@utils/data-grid-handlers'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientInventoryViewModel} from './client-inventory-view.model'
import {styles} from './client-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView
const inventoryDashboardCardConfig = getClientInventoryDashboardCardConfig(textConsts)

const navbarActiveCategory = navBarActiveCategory.NAVBAR_INVENTORY

@observer
export class ClientInventoryViewRaw extends Component {
  viewModel = new ClientInventoryViewModel({history: this.props.history})

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

      selectedRowIds,
      drawerOpen,
      selectedProduct,
      showSetBarcodeModal,
      showSelectionSupplierModal,
      curPage,
      productsMy,
      rowsPerPage,
      showOrderModal,
      showSuccessModal,
      showSendOwnProductModal,
      showAddOrEditSupplierModal,
      showBindInventoryGoodsToStockModal,
      onClickShowProduct,
      onDoubleClickBarcode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickSaveBarcode,
      onTriggerOpenModal,
      onSubmitOrderProductModal,
      onClickBindInventoryGoodsToStockBtn,
      getStockData,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props
    const renderButton = () => (
      <div className={classNames.buttonsWrapper}>
        <Button disableElevation className={classNames.saveBtn} variant="contained">
          {textConsts.saveBtn}
        </Button>
        <div>
          <Button disableElevation className={classNames.saveBtn} variant="contained">
            {textConsts.saveBtn}
          </Button>
          <Button disableElevation className={classNames.cancelBtn} variant="contained">
            {textConsts.cancelBtn}
          </Button>
        </div>
      </div>
    )
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Grid container justify="center" spacing={2} md={12}>
                {this.renderDashboardCards()}
              </Grid>
              <Typography variant="h6" className={classNames.someClass}>
                {textConsts.productsList}
              </Typography>
              <div className={classNames.addProductBtnsWrapper}>
                <div>
                  <Button
                    variant="contained"
                    disabled={selectedRowIds.length === 0}
                    onClick={() => onTriggerOpenModal('showOrderModal')}
                  >
                    {textConsts.orderBtn}
                  </Button>

                  <Button
                    variant="contained"
                    className={classNames.buttonOffset}
                    disabled={selectedRowIds.length !== 1}
                    onClick={() => onClickShowProduct()}
                  >
                    {textConsts.showProductBtn}
                  </Button>

                  <Button
                    disableElevation
                    tooltipContent="Пример тултипа"
                    disabled={selectedRowIds.length !== 1}
                    className={classNames.buttonOffset}
                    variant="contained"
                    color="primary"
                    onClick={onClickBindInventoryGoodsToStockBtn}
                  >
                    {textConsts.bindGoodsBtn}
                  </Button>

                  <Button
                    variant="contained"
                    className={classNames.buttonOffset}
                    onClick={() => onTriggerOpenModal('showSelectionSupplierModal')}
                  >
                    {'test'}
                  </Button>
                </div>

                <SuccessButton onClick={() => onTriggerOpenModal('showSendOwnProductModal')}>
                  {textConsts.addProductBtn}
                </SuccessButton>
              </div>

              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  checkboxSelection
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
                  onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => onStateChangeHandler(e, setDataGridState)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showSendOwnProductModal} setOpenModal={() => onTriggerOpenModal('showSendOwnProductModal')}>
          <AddOwnProductForm />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
          <SetBarcodeModal
            product={selectedProduct}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>

        <Modal
          openModal={showAddOrEditSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
        >
          <AddOrEditSupplierModalContent
            title={textConsts.addOrEditSupplierTitle}
            renderButton={() => renderButton()}
          />
        </Modal>

        <Modal
          openModal={showSelectionSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
        >
          <SelectionSupplierModal
            onTriggerOpenModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
            onCloseModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
          />
        </Modal>

        <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            requestStatus={requestStatus}
            selectedProductsData={productsMy
              .filter(product => selectedRowIds.includes(product.id))
              .map(prod => prod.originalData)}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onSubmitOrderProductModal}
          />
        </Modal>

        <Modal
          openModal={showBindInventoryGoodsToStockModal}
          setOpenModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
        >
          <BindInventoryGoodsToStockForm
            selectedRow={getCurrentData().find(item => selectedRowIds.includes(item.id))}
            goodsToSelect={getStockData()}
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

  getCardValueByDataKey = dataKey => {
    const {productsMy, orders} = this.viewModel
    switch (dataKey) {
      case ClientInventoryDashboardCardDataKey.PRODUCTS_IN_INVENTORY:
        return productsMy.length
      case ClientInventoryDashboardCardDataKey.PRODUCTS_BOUGHT_ON_EXCHANGE:
        return productsMy.length
      case ClientInventoryDashboardCardDataKey.PRODUCTS_ADDED:
        return 'N/A'
      case ClientInventoryDashboardCardDataKey.ORDERS_CHECKOUT:
        return orders.length
      case ClientInventoryDashboardCardDataKey.BOUGHT_FOR_LAST_30_DAYS:
        return 'N/A'
    }
  }
}

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
