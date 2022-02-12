import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'

import {calcProductPrice} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientExchangeViewModel} from './client-exchange-view.model'
import {styles} from './client-exchange-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangeView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_EXCHANGE
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
      showOrderModal,
      onDoubleClickBarcode,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

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
      onChangeFilterModel,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawer}
            title={textConsts.appbarTitle}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={100}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            requestStatus={requestStatus}
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
            selectedProduct && toFixedWithDollarSign(calcProductPrice(selectedProduct), 2)
          })`}
          successBtnText={textConsts.confirmBtn}
          cancelBtnText={textConsts.cancelBtn}
          onClickSuccessBtn={() => {
            onClickBuyProductBtn(selectedProduct)
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
}

export const ClientExchangeView = withStyles(styles)(ClientExchangeViewRaw)
