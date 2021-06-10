import React, {Component} from 'react'

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

import {ClientExchangeViewModel} from './client-exchange-view.model'
import {styles} from './client-exchange-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeView

const {headCells, modalHeadCells} = clientExchangeViewTable

const navbarActiveCategory = 1
const navbarActiveSubCategory = 0

@observer
export class ClientExchangeViewRaw extends Component {
  viewModel = new ClientExchangeViewModel({history: this.props.history})

  render() {
    const {
      productList,
      modalProductList,
      drawerOpen,
      paginationPage,
      rowsPerPage,
      modalPrivateLabel,
      selectedIndex,
      modalQty,
      modalManagerIndex,
      onTriggerDrawer,
      onChangePagination,
      onChangeRowsPerPage,
      onCloseModal,
      onClickPrivateLabel,
      onClickOrderNowBtn,
      onClickCancelBtn,
      onClickUsername,
      onChangeModalQty,
      onChangeManager,
    } = this.viewModel

    const {classes} = this.props
    const rowsHandlers = {
      privateLabel: onClickPrivateLabel,
      username: onClickUsername,
      qty: onChangeModalQty,
      manager: onChangeManager,
    }

    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc=""
            handlerTriggerDrawer={onTriggerDrawer}
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
                data={productList}
                handlerPageChange={onChangePagination}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(productList.length / rowsPerPage)}
                BodyRow={ExchangeBodyRow}
                renderHeadRow={this.renderTableHeadRow()}
                rowsPerPage={rowsPerPage}
                rowsHandlers={rowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={modalPrivateLabel} setOpenModal={onCloseModal}>
          <ClientExchnageModalContent
            modalHeadRow={this.renderModalHeadRow()}
            qty={modalQty}
            managerIndex={modalManagerIndex}
            item={modalProductList[selectedIndex]}
            handlers={rowsHandlers}
            onClickOrderNowBtn={onClickOrderNowBtn}
            onClickCancelBtn={onClickCancelBtn}
          />
        </Modal>
      </React.Fragment>
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
}

const ClientExchangeView = withStyles(styles)(ClientExchangeViewRaw)

export {ClientExchangeView}
