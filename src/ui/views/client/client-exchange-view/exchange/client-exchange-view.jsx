import {Component} from 'react'

import {
  Button,
  TableCell,
  TableContainer,
  Table as MuiTable,
  TableRow,
  Typography,
  TableHead,
  TableBody,
} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {clientExchangeViewTable, clientUsername} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {ExchangeBodyRow, ExchangeModalBodyRow} from '@components/table-rows/client/exchange'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getRequiredListByKeys} from '@utils/get-required-list-by-keys'

import {styles} from './client-exchange-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeView

const {headCells, modalHeadCells, mainTableKeys, modalTableKeys, productList} = clientExchangeViewTable

const mainTableProductList = getRequiredListByKeys(productList, mainTableKeys)
const modalTableProductList = getRequiredListByKeys(productList, modalTableKeys)

export class ClientExchangeViewRaw extends Component {
  state = {
    activeCategory: 1,
    activeSubCategory: 0,
    drawerOpen: false,
    paginationPage: 1,
    rowsPerPage: 5,
    modalPrivateLabel: false,
    selectedIndex: null,
    modalQty: 0,
    modalManagerIndex: 0,
  }

  render() {
    const {
      activeCategory,
      activeSubCategory,
      drawerOpen,
      paginationPage,
      rowsPerPage,
      modalPrivateLabel,
      selectedIndex,
      modalQty,
      modalManagerIndex,
    } = this.state
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
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          categoriesList={categoriesList.client}
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
              <div className={classes.mb5}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
              </div>
              <Table
                buttons={this.renderButtons}
                currentPage={paginationPage}
                data={mainTableProductList}
                handlerPageChange={this.onChangePagination}
                handlerRowsPerPage={this.onChangeRowsPerPage}
                pageCount={Math.ceil(mainTableProductList.length / rowsPerPage)}
                BodyRow={ExchangeBodyRow}
                renderHeadRow={this.renderHeadRow}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalPrivateLabel} setOpenModal={this.onCloseModal}>
          <Typography variant="h5">{textConsts.modalOrderProductTitle}</Typography>
          <TableContainer className={classes.modalTableWrapper}>
            <MuiTable>
              <TableHead>{this.renderHeadRow}</TableHead>
              <TableBody>
                <ExchangeModalBodyRow
                  qty={modalQty}
                  managerIndex={modalManagerIndex}
                  item={modalTableProductList[selectedIndex]}
                  handlers={rowsHandlers}
                />
              </TableBody>
            </MuiTable>
          </TableContainer>
        </Modal>
      </>
    )
  }

  renderHeadRow = (
    <TableRow>
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )

  renderButtons = (
    <>
      <Button
        disableElevation
        color="primary"
        variant="contained"
        onClick={() => {
          this.setState({modalPrivateLabel: true})
        }}
      >
        Button1
      </Button>
      <Button>Button2</Button>
      <Button>Button3</Button>
    </>
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
