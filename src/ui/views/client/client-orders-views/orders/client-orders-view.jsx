import React, {Component} from 'react'

import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {CLIENT_ORDERS_HEAD_CELL} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/client/orders-views/orders/table-body-row'
import {TableHeadRow} from '@components/table-rows/client/orders-views/orders/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientOrdersViewModel} from './client-orders-view.model'
import {styles} from './client-orders-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersView

const navbarActiveCategory = 3

@observer
class ClientOrdersViewRaw extends Component {
  viewModel = new ClientOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      activeSubCategory,
      orders,
      drawerOpen,
      modalBarcode,
      rowsPerPage,
      curPage,
      selectedOrder,
      onTriggerShowBarcodeModal,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickEditBarcode,
      onClickDeleteBarcode,
      onClickSaveBarcode,
      onClickTableRow,
    } = this.viewModel
    const {classes: className} = this.props
    const rowHandlers = {
      onClickEditBarcode,
      onClickDeleteBarcode,
      onClickTableRow,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={className.tableWrapper}>
                <Table
                  renderButtons={this.renderButtons}
                  currentPage={curPage}
                  data={orders}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(orders.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={rowHandlers}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalBarcode} setOpenModal={onTriggerShowBarcodeModal}>
          <SetBarcodeModal
            order={selectedOrder}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={onTriggerShowBarcodeModal}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderButtons = () => (
    <Container className={this.props.classes.buttonWrapper}>
      <Button color="secondary">{textConsts.ordersBtn}</Button>
    </Container>
  )

  renderHeadRow = (<TableHeadRow headCells={CLIENT_ORDERS_HEAD_CELL} />)
}

export const ClientOrdersView = withStyles(styles)(ClientOrdersViewRaw)
