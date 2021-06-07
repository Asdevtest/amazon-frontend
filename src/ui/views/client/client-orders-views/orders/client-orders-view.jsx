import React, {Component} from 'react'

import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {CLIENT_ORDERS_DATA, CLIENT_ORDERS_HEAD_CELL} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

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
import {styles} from './client-orders-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersView

class ClientOrdersViewRaw extends Component {
  state = {
    activeCategory: 3,
    activeSubCategory: 2,
    drawerOpen: false,
    modalBarcode: false,
    rowsPerPage: 5,
    paginationPage: 1,
  }

  render() {
    const {activeCategory, activeSubCategory, drawerOpen, modalBarcode, rowsPerPage, paginationPage} = this.state

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          setItem={this.onChangeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.client}
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
            username={textConsts.appBarUsername}
            setDrawerOpen={this.onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.mainTitle}</Typography>

              <Table
                buttons={this.renderButtons}
                currentPage={paginationPage}
                data={CLIENT_ORDERS_DATA}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(CLIENT_ORDERS_DATA.length / rowsPerPage)}
                BodyRow={TableBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={{
                  onBarcode: this.onChangeModalBarcode,
                }}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalBarcode} setOpenModal={this.onChangeModalBarcode}>
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

  renderHeadRow = (<TableHeadRow headCells={CLIENT_ORDERS_HEAD_CELL} />)

  onChangeModalBarcode = () => {
    this.setState({modalBarcode: !this.state.modalBarcode})
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

const ClientOrdersView = withStyles(styles)(ClientOrdersViewRaw)

export {ClientOrdersView}
