import React, {Component} from 'react'

import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {CLIENT_ORDERS_HEAD_CELL} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {SetBarcodeModal} from '@components/screens/client/orders-view/set-barcode-modal'
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
    this.viewModel.getOrders()
  }

  render() {
    const {
      activeSubCategory,
      ordersData,
      drawerOpen,
      modalBarcode,
      rowsPerPage,
      paginationPage,
      onChangeModalBarcode,
      onChangeDrawerOpen,
      onChangePagination,
      onChangeRowsPerPage,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>

              <Table
                buttons={this.renderButtons}
                currentPage={paginationPage}
                data={ordersData}
                handlerPageChange={onChangePagination}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(ordersData.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={{
                  onBarcode: onChangeModalBarcode,
                }}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalBarcode} setOpenModal={onChangeModalBarcode}>
          <SetBarcodeModal setModalBarcode={onChangeModalBarcode} />
        </Modal>
      </React.Fragment>
    )
  }

  renderButtons = (
    <Container className={this.props.classes.buttonWrapper}>
      <Button color="secondary">{textConsts.ordersBtn}</Button>
    </Container>
  )

  renderHeadRow = (<TableHeadRow headCells={CLIENT_ORDERS_HEAD_CELL} />)
}

const ClientOrdersView = withStyles(styles)(ClientOrdersViewRaw)

export {ClientOrdersView}
