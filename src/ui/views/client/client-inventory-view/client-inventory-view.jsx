import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {
  clientUsername,
  INVENTORY_CARD_LIST,
  CLIENT_INVENTORY_PRODUCTS_DATA,
  CLIENT_INVENTORY_MY_PRODUCTS_HEAD_CELLS,
} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {SetBarcodeModalContent} from '@components/set-barcode-modal-content'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/client/inventory/products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/client/inventory/products-view/table-head-row'

import {copyToClipBoard} from '@utils/clipboard'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientInventoryViewModel} from './client-inventory-view.model'
import {styles} from './client-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

const navbarActiveCategory = 2

@observer
export class ClientInventoryViewRaw extends Component {
  viewModel = new ClientInventoryViewModel({history: this.props.history})
  state = {
    drawerOpen: false,
    rowsPerPage: 5,
    paginationPage: 1,
    showSetBarcodeModal: false,
    curProduct: undefined,
  }

  render() {
    const {drawerOpen, curProduct, showSetBarcodeModal} = this.state
    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickBarcode: this.onClickBarcode,
      onClickExchange: this.onClickExchange,
      onDoubleClickBarcode: this.onDoubleClickBarcode,
      onDeleteBarcode: this.onDeleteBarcode,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <Grid container justify="center" spacing={1}>
                {INVENTORY_CARD_LIST.map((el, index) => (
                  <Grid key={index} item>
                    <DashboardInfoCard color="primary" viewMore="Показать" value={el.count} title={el.label} />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h5" className={classNames.someClass}>
                {textConsts.productsList}
              </Typography>
              <Table
                currentPage={this.state.paginationPage}
                data={CLIENT_INVENTORY_PRODUCTS_DATA}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(CLIENT_INVENTORY_PRODUCTS_DATA.length / this.state.rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={this.state.rowsPerPage}
                rowsHandlers={tableRowHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showSetBarcodeModal} setOpenModal={this.onTriggerShowBarcodeModal}>
          <SetBarcodeModalContent
            barcodeValue={(curProduct && curProduct.barcode) || ''}
            onClose={this.onTriggerShowBarcodeModal}
            onSaveBarcode={this.onSaveBarcode}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={CLIENT_INVENTORY_MY_PRODUCTS_HEAD_CELLS} />)

  onClickBarcode = item => {
    if (item.barcode) {
      copyToClipBoard(item.barcode)
    } else {
      this.setCurProduct(item)
      this.onTriggerShowBarcodeModal()
    }
  }

  onClickExchange = () => {}

  onDoubleClickBarcode = item => {
    this.setCurProduct(item)
    this.onTriggerShowBarcodeModal()
  }

  onDeleteBarcode = () => {}

  onSaveBarcode = () => {}

  onChangePagination = (e, value) => {
    this.setState({paginationPge: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPge: 1})
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

  onTriggerShowBarcodeModal = () => {
    this.setState({showSetBarcodeModal: !this.state.showSetBarcodeModal})
  }

  setCurProduct = item => {
    this.setState({curProduct: item})
  }
}

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
