import React, {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientUsername} from '@constants/mocks'
import {CLIENT_EXCHANGE_HEAD_CELLS, CLIENT_EXCHANGE_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

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

const navbarActiveCategory = 1
const navbarActiveSubCategory = 0

@observer
export class ClientExchangeViewRaw extends Component {
  viewModel = new ClientExchangeViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      curPage,
      rowsPerPage,
      productsVacant,
      showPrivateLabelModal,
      selectedIndex,
      modalQty,
      modalManagerIndex,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrderNowBtn,
      onClickCancelBtn,
      onTriggerPrivateLabelModal,
      onClickLaunchPrivateLabelBtn,
      onClickBuyProductBtn,
      onClickUsername,
      onChangeModalQty,
      onChangeManager,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowsHandlers = {
      onClickLaunchPrivateLabelBtn,
      onClickBuyProductBtn,
      onClickUsername,
    }
    const modalRowHanglers = {
      onChangeModalQty,
      onChangeManager,
    }
    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
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
              <div className={classNames.titleWrapepr}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
              </div>
              <Table
                currentPage={curPage}
                data={productsVacant}
                handlerPageChange={onChangeCurPage}
                handlerRowsPerPage={onChangeRowsPerPage}
                pageCount={Math.ceil(productsVacant.length / rowsPerPage)}
                BodyRow={ExchangeBodyRow}
                renderHeadRow={this.renderTableHeadRow()}
                rowsPerPage={rowsPerPage}
                rowsHandlers={tableRowsHandlers}
              />
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showPrivateLabelModal} setOpenModal={onTriggerPrivateLabelModal}>
          <ClientExchnageModalContent
            modalHeadRow={this.renderModalHeadRow()}
            qty={modalQty}
            managerIndex={modalManagerIndex}
            item={productsVacant[selectedIndex]}
            handlers={modalRowHanglers}
            onClickOrderNowBtn={onClickOrderNowBtn}
            onClickCancelBtn={onClickCancelBtn}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderTableHeadRow = () => (
    <TableRow>
      {CLIENT_EXCHANGE_HEAD_CELLS.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )

  renderModalHeadRow = () => (
    <TableRow>
      {CLIENT_EXCHANGE_MODAL_HEAD_CELLS.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
      <TableCell />
      <TableCell />
    </TableRow>
  )
}

export const ClientExchangeView = withStyles(styles)(ClientExchangeViewRaw)
