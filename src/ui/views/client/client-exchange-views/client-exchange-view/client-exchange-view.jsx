import {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientExchangeViewTable, clientUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ClientExchnageModalContent} from '@components/modal-contents/client-exchange-modal-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {ExchangeBodyRow} from '@components/table-rows/client/exchange'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getRequiredListByKeys} from '@utils/get-required-list-by-keys'

import {ClientExchangeViewModel} from './client-exchange-view.model'
import {styles} from './client-exchange-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeView

const {headCells, modalHeadCells, mainTableKeys, modalTableKeys, productList} = clientExchangeViewTable

const mainTableProductList = getRequiredListByKeys(productList, mainTableKeys)
const modalTableProductList = getRequiredListByKeys(productList, modalTableKeys)

const navbarActiveCategory = 1
const navbarActiveSubCategory = 0

@observer
export class ClientExchangeViewRaw extends Component {
  viewModel = new ClientExchangeViewModel({history: this.props.history})
  state = {
    drawerOpen: false,
    paginationPage: 1,
    rowsPerPage: 5,
    modalPrivateLabel: false,
    selectedIndex: null,
    modalQty: 0,
    modalManagerIndex: 0,
  }

  render() {
    const {drawerOpen, paginationPage, rowsPerPage, modalPrivateLabel, selectedIndex, modalQty, modalManagerIndex} =
      this.state
    const {classes} = this.props
    const rowsHandlers = {
      privateLabel: this.onClickPrivateLabel,
      username: this.onClickUsername,
      qty: this.onChangeModalQty,
      manager: this.onChangeManager,
    }

    return (
      <>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={this.onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={this.onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
          >
            <MainContent>
              <div className={classes.titleWrapepr}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
              </div>
              <Table
                currentPage={paginationPage}
                data={mainTableProductList}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(mainTableProductList.length / rowsPerPage)}
                BodyRow={ExchangeBodyRow}
                renderHeadRow={this.renderTableHeadRow()}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalPrivateLabel} setOpenModal={this.onCloseModal}>
          <ClientExchnageModalContent
            modalHeadRow={this.renderModalHeadRow()}
            qty={modalQty}
            managerIndex={modalManagerIndex}
            item={modalTableProductList[selectedIndex]}
            handlers={rowsHandlers}
            onClickOrderNowBtn={this.onClickOrderNowBtn}
            onClickCancelBtn={this.onClickCancelBtn}
          />
        </Modal>
      </>
    )
  }

  renderTableHeadRow = () => (
    <TableRow>
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )

  renderModalHeadRow = () => (
    <TableRow>
      {modalHeadCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )

  renderModalHeadRows = (
    <TableRow>
      {modalHeadCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
    </TableRow>
  )

  onChangeCategory = index => {
    this.setState({activeCategory: index})
  }

  onChangeSubCategory = index => {
    this.setState({activeSubCategory: index})
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }

  onChangePagination = (e, value) => {
    this.setState({paginationPage: value})
  }

  onChangeRowsPerPage = e => {
    this.setState({rowsPerPage: Number(e.target.value), paginationPage: 1})
  }

  onCloseModal = () => {
    this.setState({modalPrivateLabel: false})
  }

  onClickPrivateLabel = index => {
    this.setState({
      selectedIndex: index,
      modalQty: modalTableProductList[index].qty,
      modalPrivateLabel: true,
    })
  }

  onClickOrderNowBtn = () => {
    this.setState({
      modalPrivateLabel: false,
    })
  }

  onClickCancelBtn = () => {
    this.setState({
      modalPrivateLabel: false,
    })
  }

  onClickUsername = () => {
    this.props.history.push('/user/subusers')
  }

  onChangeModalQty = e => {
    this.setState({modalQty: Number(e.target.value)})
  }

  onChangeManager = e => {
    this.setState({modalManagerIndex: Number(e.target.value)})
  }
}

const ClientExchangeView = withStyles(styles)(ClientExchangeViewRaw)

export {ClientExchangeView}
