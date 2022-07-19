import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectShopsModal} from '@components/modals/select-shops-modal/select-shops-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientExchangeViewModel} from './client-exchange-view.model'
import {styles} from './client-exchange-view.style'

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
      confirmModalSettings,
      volumeWeightCoefficient,
      showOrderModal,
      onDoubleClickBarcode,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      storekeepers,
      destinations,
      showWarningModalText,

      drawerOpen,
      curPage,
      rowsPerPage,
      selectedProduct,
      showConfirmModal,
      showSuccessModal,
      showWarningModal,
      showSelectShopsModal,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickOrderNowBtn,
      onClickCancelBtn,
      onTriggerOpenModal,
      onClickBuyProductBtn,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['Surebets exchange'])}>
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
                sx={{
                  border: 0,
                  boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  backgroundColor: '#fff',
                }}
                localeText={getLocalizationByLanguageTag()}
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
            volumeWeightCoefficient={volumeWeightCoefficient}
            destinations={destinations}
            storekeepers={storekeepers}
            requestStatus={requestStatus}
            selectedProductsData={[selectedProduct]}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onClickOrderNowBtn}
            onClickCancel={onClickCancelBtn}
          />
        </Modal>

        <Modal openModal={showSelectShopsModal} setOpenModal={() => onTriggerOpenModal('showSelectShopsModal')}>
          <SelectShopsModal
            title={confirmModalSettings.confirmTitle}
            onClickSuccessBtn={onClickBuyProductBtn}
            onClickCancelBtn={() => onTriggerOpenModal('showSelectShopsModal')}
          />
        </Modal>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <WarningInfoModal
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={showWarningModalText}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={t(TranslationKey['Order successfully created!'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const ClientExchangeView = withStyles(styles)(ClientExchangeViewRaw)
