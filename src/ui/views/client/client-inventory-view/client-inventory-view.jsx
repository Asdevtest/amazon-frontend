import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {AddOwnProductForm} from '@components/forms/add-own-product-form'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SetChipValueModal} from '@components/modals/set-chip-value-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {OrderProductModal} from '@components/screens/client/order-product-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

import {ClientInventoryViewModel} from './client-inventory-view.model'
import {styles} from './client-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_INVENTORY

@observer
export class ClientInventoryViewRaw extends Component {
  viewModel = new ClientInventoryViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showInfoModalTitle,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      successModalText,
      confirmMessage,
      storekeepers,
      destinations,
      isArchive,
      yuanToDollarRate,
      volumeWeightCoefficient,

      isNoEditProductSelected,

      showProgress,
      progressValue,
      selectedRowId,

      sellerBoardDailyData,
      selectedRowIds,
      drawerOpen,
      selectedProduct,
      showSetBarcodeModal,
      showSelectionSupplierModal,
      showSetChipValueModal,
      showConfirmModal,
      curPage,
      productsMy,
      rowsPerPage,
      showOrderModal,
      showSuccessModal,
      showSendOwnProductModal,
      showAddOrEditSupplierModal,
      showBindInventoryGoodsToStockModal,
      showInfoModal,
      onSubmitBindStockGoods,
      getStockGoodsByFilters,
      onClickShowProduct,
      onDoubleClickBarcode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickSaveBarcode,
      onTriggerOpenModal,
      onSubmitOrderProductModal,
      onClickBindInventoryGoodsToStockBtn,
      onClickSaveHsCode,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onSubmitCreateProduct,
      onSubmitSaveSupplier,
      onClickAddSupplierBtn,
      onSubmitSeekSupplier,
      onSubmitCalculateSeekSupplier,
      onClickOrderBtn,
      onTriggerArchive,
      onClickAddSupplierButton,
      onClickTriggerArchOrResetProducts,
    } = this.viewModel
    const {classes: classNames} = this.props
    const onClickPrevButton = () => {
      onTriggerOpenModal('showAddOrEditSupplierModal')
      onTriggerOpenModal('showSelectionSupplierModal')
    }

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Inventory)}>
            <MainContent>
              <div className={classNames.addProductBtnsWrapper}>
                {!isArchive && (
                  <div className={classNames.btnsWrapper}>
                    <Button variant="contained" disabled={selectedRowIds.length === 0} onClick={onClickOrderBtn}>
                      {t(TranslationKey['To order'])}
                    </Button>

                    <Button
                      disableElevation
                      disabled={selectedRowIds.length !== 1}
                      className={classNames.buttonOffset}
                      variant="contained"
                      color="primary"
                      onClick={onClickBindInventoryGoodsToStockBtn}
                    >
                      {t(TranslationKey['Bind an product from Amazon'])}
                    </Button>

                    <Button
                      variant="contained"
                      disabled={selectedRowIds.length !== 1}
                      className={classNames.buttonOffset}
                      onClick={() => onClickAddSupplierBtn()}
                    >
                      {t(TranslationKey['Supplier search'])}
                    </Button>
                  </div>
                )}

                <div className={classNames.archiveBtnsWrapper}>
                  <Button variant="outlined" onClick={onTriggerArchive}>
                    {isArchive ? t(TranslationKey['Open inventory']) : t(TranslationKey['Open archive'])}
                  </Button>

                  <Button
                    disableElevation
                    tooltipContent={
                      isNoEditProductSelected && t(TranslationKey['Product with invalid status selected'])
                    }
                    disabled={!selectedRowIds.length || isNoEditProductSelected}
                    variant="outlined"
                    onClick={onClickTriggerArchOrResetProducts}
                  >
                    {isArchive ? t(TranslationKey.Recover) : t(TranslationKey['Move to archive'])}
                  </Button>
                </div>

                {!isArchive && (
                  <SuccessButton onClick={() => onTriggerOpenModal('showSendOwnProductModal')}>
                    {t(TranslationKey['Add your product'])}
                  </SuccessButton>
                )}
              </div>

              <DataGrid
                pagination
                useResizeContainer
                checkboxSelection
                disableSelectionOnClick
                classes={{
                  row: classNames.row,
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
                onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
                onRowClick={(params, event) =>
                  event.target.checked === undefined &&
                  !event.target.className.includes('Chip') &&
                  onClickShowProduct(params.row)
                }
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showSendOwnProductModal} setOpenModal={() => onTriggerOpenModal('showSendOwnProductModal')}>
          <AddOwnProductForm
            showProgress={showProgress}
            progressValue={progressValue}
            onSubmit={onSubmitCreateProduct}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
          <SetBarcodeModal
            item={selectedProduct}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>

        <Modal openModal={showSetChipValueModal} setOpenModal={() => onTriggerOpenModal('showSetChipValueModal')}>
          <SetChipValueModal
            title={t(TranslationKey['Set HS code'])}
            sourceValue={selectedProduct?.hsCode}
            onSubmit={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showSetChipValueModal')}
          />
        </Modal>

        <Modal
          openModal={showAddOrEditSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
        >
          <AddOrEditSupplierModalContent
            outsideProduct
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Add a new supplier'])}
            showProgress={showProgress}
            progressValue={progressValue}
            onClickPrevButton={() => onClickPrevButton()}
            onClickSaveBtn={onSubmitSaveSupplier}
          />
        </Modal>

        <Modal
          openModal={showSelectionSupplierModal}
          setOpenModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
        >
          <SelectionSupplierModal
            product={productsMy.find(el => el.originalData._id === selectedRowId)}
            onClickFinalAddSupplierButton={onClickAddSupplierButton}
            onCloseModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
            onSubmitSeekSupplier={onSubmitCalculateSeekSupplier}
          />
        </Modal>

        <Modal openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            volumeWeightCoefficient={volumeWeightCoefficient}
            destinations={destinations}
            storekeepers={storekeepers}
            requestStatus={requestStatus}
            selectedProductsData={productsMy
              .filter(product => selectedRowIds.includes(product.id))
              .map(prod => prod.originalData)}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onSubmitOrderProductModal}
          />
        </Modal>

        <Modal
          openModal={showBindInventoryGoodsToStockModal}
          setOpenModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
        >
          <BindInventoryGoodsToStockForm
            product={getCurrentData().find(item => selectedRowIds.includes(item.id))?.originalData}
            stockData={sellerBoardDailyData}
            updateStockData={getStockGoodsByFilters}
            onSubmit={onSubmitBindStockGoods}
          />
        </Modal>

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={successModalText}
          successBtnText={textConsts.successBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={showInfoModalTitle}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            onSubmitSeekSupplier()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
