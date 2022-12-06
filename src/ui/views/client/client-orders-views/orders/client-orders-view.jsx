import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {OrderProductModal} from '@components/screens/client/order-product-modal'
import {SearchInput} from '@components/search-input'

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
      destinationsFavourites,
      rowCount,
      confirmModalSettings,
      successModalText,
      getCurrentReorderData,

      selectedProduct,
      storekeepers,
      destinations,
      volumeWeightCoefficient,
      requestStatus,
      currentData,
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

      onTriggerOpenModal,
      onClickSaveBarcode,
      onDoubleClickBarcode,
      onConfirmSubmitOrderProductModal,
      onSearchSubmit,
      setDestinationsFavouritesItem,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Orders)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
                  onSubmit={onSearchSubmit}
                />
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  disableVirtualization
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
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50 /* , 100*/]}
                  rows={currentData}
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
                reorderOrder={getCurrentReorderData()}
                volumeWeightCoefficient={volumeWeightCoefficient}
                destinations={destinations}
                storekeepers={storekeepers}
                destinationsFavourites={destinationsFavourites}
                setDestinationsFavouritesItem={setDestinationsFavouritesItem}
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

export const ClientOrdersView = withStyles(ClientOrdersViewRaw, styles)
