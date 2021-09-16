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
import {ClientExchnageCreateOrderModalContent} from '@components/modal-contents/client-exchange-create-order-modal-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {ExchangeBodyRow} from '@components/table-rows/client/exchange'

import {calcProductPrice} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import avatar from '../../assets/clientAvatar.jpg'
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
      selectedProduct,
      showConfirmPayModal,
      showSuccessModal,
      showWarningModal,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrderNowBtn,
      onClickCancelBtn,
      onTriggerPrivateLabelModal,
      onClickLaunchPrivateLabelBtn,
      onClickBuyProductBtn,
      onClickUsername,
      onTriggerOpenModal,
      setDataToPay,
    } = this.viewModel
    const {classes: classNames} = this.props
    const tableRowsHandlers = {
      onClickLaunchPrivateLabelBtn,
      onClickBuyProductBtn,
      onClickUsername,
      onTriggerOpenModal,
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
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
            curUserRole={UserRole.CLIENT}
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
          <ClientExchnageCreateOrderModalContent
            modalHeadRow={this.renderModalHeadRow()}
            product={selectedProduct}
            setDataToPay={setDataToPay}
            onClickOrderNowBtn={onClickOrderNowBtn}
            onClickCancelBtn={onClickCancelBtn}
            onTriggerOpenConfirmModal={() => onTriggerOpenModal('showConfirmPayModal')}
          />
        </Modal>

        <ConfirmationModal
          openModal={showConfirmPayModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmPayModal')}
          title={textConsts.confirmTitle}
          message={`${textConsts.confirmMessage} (${
            selectedProduct && toFixedWithDollarSign(calcProductPrice(selectedProduct))
          })`}
          successBtnText={textConsts.confirmBtn}
          cancelBtnText={textConsts.cancelBtn}
          onClickSuccessBtn={() => {
            onClickBuyProductBtn(selectedProduct)
            onTriggerOpenModal('showConfirmPayModal')
            onTriggerOpenModal('showPrivateLabelModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmPayModal')}
        />
        <WarningInfoModal
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={textConsts.warningModalTitle}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={textConsts.successTitle}
          successBtnText={textConsts.successBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />
      </React.Fragment>
    )
  }

  renderTableHeadRow = () => (
    <TableRow>
      {CLIENT_EXCHANGE_HEAD_CELLS.map((item, index) => (
        <TableCell key={index} align={item.align}>
          {item.label}
        </TableCell>
      ))}
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
