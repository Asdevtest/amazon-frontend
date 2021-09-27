import React, {Component} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {clientUsername} from '@constants/mocks'
import {CLIENT_EXCHANGE_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'
import {clientExchangeViewColumns} from '@components/table-columns/client/client-exchange-columns'

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
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      showSetBarcodeModal,
      onClickSaveBarcode,
      showOrderModal,
      onDoubleClickBarcode,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      selectedProduct,
      showConfirmPayModal,
      showSuccessModal,
      showWarningModal,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrderNowBtn,
      onClickCancelBtn,
      onClickBuyProductBtn,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel
    const {classes: classNames} = this.props

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
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={100}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  columns={clientExchangeViewColumns(this.renderBtns)}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection.selectionModel[0])
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => setDataGridState(e.state)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
          <SetBarcodeModal
            product={selectedProduct}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>

        <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            selectedProductsData={[selectedProduct]}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onClickOrderNowBtn}
            onClickCancel={onClickCancelBtn}
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
            onTriggerOpenModal('showOrderModal')
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

  renderBtns = params => (
    <React.Fragment>
      <div>
        <SuccessButton
          onClick={() => {
            this.viewModel.onClickLaunchPrivateLabelBtn(params.row)
            this.viewModel.onTriggerOpenModal('showConfirmPayModal')
          }}
        >
          {`${textConsts.byForBtn} ${toFixedWithDollarSign(calcProductPrice(params.row))}`}
        </SuccessButton>
      </div>
    </React.Fragment>
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
