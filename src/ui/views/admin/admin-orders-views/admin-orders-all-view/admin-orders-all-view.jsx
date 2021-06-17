import React, {Component} from 'react'

import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {ADMIN_ORDERS_HEAD_CELL} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

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

import avatar from '../../assets/adminAvatar.jpg'
import {AdminOrdersAllViewModel} from './admin-orders-all-view.model'
import {styles} from './admin-orders-all-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrdersView

const navbarActiveCategory = 3
const navbarActiveSubCategory = 0

@observer
class AdminOrdersAllViewRaw extends Component {
  viewModel = new AdminOrdersAllViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getOrders()
  }

  render() {
    const {
      ordersData,
      drawerOpen,
      modalBarcode,
      rowsPerPage,
      curPage,
      onTriggerBarcodeModal,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
    } = this.viewModel
    const {classes: className} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
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
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={className.tableWrapper}>
                <Table
                  buttons={this.renderButtons}
                  currentPage={curPage}
                  data={ordersData}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(ordersData.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={{
                    onClickBarcode: onTriggerBarcodeModal,
                  }}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalBarcode} setOpenModal={onTriggerBarcodeModal}>
          <SetBarcodeModal setModalBarcode={onTriggerBarcodeModal} />
        </Modal>
      </React.Fragment>
    )
  }

  renderButtons = (
    <Container className={this.props.classes.buttonWrapper}>
      <Button color="secondary">{textConsts.ordersBtn}</Button>
    </Container>
  )

  renderHeadRow = (<TableHeadRow headCells={ADMIN_ORDERS_HEAD_CELL} />)
}

export const AdminOrdersAllView = withStyles(styles)(AdminOrdersAllViewRaw)
