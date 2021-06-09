import React, {Component} from 'react'

import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {
  clientUsername,
  INVENTORY_CARD_LIST, // CLIENT_INVENTORY_PRODUCTS_DATA,
  CLIENT_INVENTORY_MY_PRODUCTS_HEAD_CELLS,
} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DashboardInfoCard} from '@components/dashboard-info-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {SetBarcodeModalContent} from '@components/set-barcode-modal-content'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/client/inventory/products-view/table-body-row'
import {TableHeadRow} from '@components/table-rows/client/inventory/products-view/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientInventoryViewModel} from './client-inventory-view.model'
import {styles} from './client-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

const navbarActiveCategory = 2

@observer
export class ClientInventoryViewRaw extends Component {
  viewModel = new ClientInventoryViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProductsMy()
  }

  render() {
    const {
      productsData,
      drawerOpen,
      curProduct,
      showSetBarcodeModal,
      rowsPerPage,
      paginationPage,
      onClickBarcode,
      onClickExchange,
      onDoubleClickBarcode,
      onDeleteBarcode,
      onSaveBarcode,
      onChangePagination,
      onChangeRowsPerPage,
      onTriggerDrawer,
      onTriggerShowBarcodeModal,
    } = this.viewModel

    const {classes: classNames} = this.props
    const tableRowHandlers = {
      onClickBarcode,
      onClickExchange,
      onDoubleClickBarcode,
      onDeleteBarcode,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
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
          >
            <MainContent>
              <Grid container justify="center" spacing={1}>
                {INVENTORY_CARD_LIST.map((el, index) => (
                  <Grid key={index} item>
                    <DashboardInfoCard color="primary" viewMore="Показать" value={el.count} title={el.label} />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h6" className={classNames.someClass}>
                {textConsts.productsList}
              </Typography>
              <Table
                buttons={this.renderButtons()}
                currentPage={paginationPage}
                data={productsData}
                handlerPageChange={onChangePagination}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(productsData.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={tableRowHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showSetBarcodeModal} setOpenModal={onTriggerShowBarcodeModal}>
          <SetBarcodeModalContent
            barcodeValue={(curProduct && curProduct.barcode) || ''}
            onClose={onTriggerShowBarcodeModal}
            onSaveBarcode={onSaveBarcode}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={CLIENT_INVENTORY_MY_PRODUCTS_HEAD_CELLS} />)
  renderButtons = () => (
    <React.Fragment>
      <Button
        variant="contained" /*  открыть модалку, а ее во front-main нет onClick={() => this.viewModel.onClickMerge()}*/
      >
        {textConsts.orderBtn}
      </Button>
      <Button color="disabled">{textConsts.resetBtn}</Button>
    </React.Fragment>
  )
}

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
