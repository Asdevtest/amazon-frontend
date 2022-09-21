import SearchIcon from '@mui/icons-material/Search'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {InputAdornment} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientOrdersViewModel} from './client-orders-view.model'
import {styles} from './client-orders-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_ORDERS

@observer
class ClientOrdersViewRaw extends Component {
  viewModel = new ClientOrdersViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      confirmModalSettings,
      successModalText,
      reorderOrder,
      selectedProduct,
      storekeepers,
      destinations,
      volumeWeightCoefficient,
      nameSearchValue,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      showOrderModal,
      showSetBarcodeModal,
      showSuccessModal,
      showConfirmModal,

      drawerOpen,
      rowsPerPage,
      curPage,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickTableRow,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onChangeNameSearchValue,

      onTriggerOpenModal,
      onClickSaveBarcode,
      onDoubleClickBarcode,
      onConfirmSubmitOrderProductModal,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Orders)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <Field
                  containerClasses={classNames.searchContainer}
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                  endAdornment={
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  }
                  onChange={onChangeNameSearchValue}
                />
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                  }}
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
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>

            <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
              <SetBarcodeModal
                item={selectedProduct}
                onClickSaveBarcode={onClickSaveBarcode}
                onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
              />
            </Modal>

            <Modal
              missClickModalOn
              openModal={showOrderModal}
              setOpenModal={() => onTriggerOpenModal('showOrderModal')}
            >
              <OrderProductModal
                reorderOrder={reorderOrder}
                volumeWeightCoefficient={volumeWeightCoefficient}
                destinations={destinations}
                storekeepers={storekeepers}
                onTriggerOpenModal={onTriggerOpenModal}
                onDoubleClickBarcode={onDoubleClickBarcode}
                onSubmit={onConfirmSubmitOrderProductModal}
              />
            </Modal>

            <SuccessInfoModal
              openModal={showSuccessModal}
              setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
              title={successModalText}
              successBtnText={t(TranslationKey.Ok)}
              onClickSuccessBtn={() => {
                onTriggerOpenModal('showSuccessModal')
              }}
            />

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
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientOrdersView = withStyles(styles)(ClientOrdersViewRaw)
