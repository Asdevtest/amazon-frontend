/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import DeleteIcon from '@mui/icons-material/Delete'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {AddOwnProductForm} from '@components/forms/add-own-product-form'
import {AddSupplierToIdeaFromInventoryForm} from '@components/forms/add-supplier-to-idea-from-inventory-form'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
import {ProductLotDataForm} from '@components/forms/product-lot-data-form/product-lot-data-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {AddSuppliersModal} from '@components/modals/add-suppliers-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SetChipValueModal} from '@components/modals/set-chip-value-modal'
import {SetFourMonthesStockModal} from '@components/modals/set-four-monthes-stock-value-modal.js'
import {ShowBarOrHscodeModal} from '@components/modals/show-bar-or-hs-code-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {OrderProductModal} from '@components/screens/client/order-product-modal'
import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientInventoryViewModel} from './client-inventory-view.model'
import {styles} from './client-inventory-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_INVENTORY

@observer
export class ClientInventoryViewRaw extends Component {
  viewModel = new ClientInventoryViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      batchesData,
      currentData,
      userInfo,
      showInfoModalTitle,
      requestStatus,
      getCurrentData,

      rowCount,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      successModalText,
      confirmModalSettings,
      storekeepers,
      destinations,
      isArchive,
      yuanToDollarRate,
      volumeWeightCoefficient,
      currentBarcode,
      currentHscode,
      shopsData,
      currentShop,

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

      // showSetStockUsValueModal,
      showConfirmModal,
      curPage,
      // currentData,
      productsMyBase,
      ideasData,

      rowsPerPage,

      showOrderModal,
      showSuccessModal,
      showSendOwnProductModal,
      showAddOrEditSupplierModal,
      showBindInventoryGoodsToStockModal,
      showAddSupplierToIdeaFromInventoryModal,
      showBarcodeOrHscodeModal,
      showInfoModal,
      showSetFourMonthsStockValueModal,
      showAddSuppliersModal,
      showCircularProgressModal,
      showProductLotDataModal,
      onSubmitBindStockGoods,
      getStockGoodsByFilters,
      onClickShowProduct,
      onDoubleClickBarcode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickSaveBarcode,
      onTriggerOpenModal,
      onClickBindInventoryGoodsToStockBtn,
      onClickSaveHsCode,
      // onClickMonthStockValue,
      onClickSaveFourMonthesStockValue,
      onClickShopBtn,
      uploadTemplateFile,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onSubmitCreateProduct,
      onSubmitSaveSupplier,
      onClickAddSupplierBtn,
      onClickParseProductsBtn,
      onSubmitCalculateSeekSupplier,
      onClickOrderBtn,
      onTriggerArchive,
      onClickAddSupplierButton,
      onClickTriggerArchOrResetProducts,
      onConfirmSubmitOrderProductModal,
      onClickProductLotDataBtn,

      onClickWithoutProductsShopBtn,
      onClickWithProductsShopBtn,

      createSupplierSearchRequest,
      // onClickSavesStockUSA,
      withoutProduct,
      withProduct,

      onSearchSubmit,

      onClickPrevButton,
      getProductsMy1,
    } = this.viewModel
    const {classes: classNames} = this.props

    const disableSelectionCells = ['asin', 'stockUSA', 'fourMonthesStock']

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Inventory)}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <div className={classNames.shopsFiltersWrapper}>
                  <WithSearchSelect
                    selectedItemName={
                      (!withProduct && !withoutProduct && !currentShop?._id && t(TranslationKey['All Products'])) ||
                      (withProduct && t(TranslationKey['Products in shops'])) ||
                      (withoutProduct && t(TranslationKey['Products without shops'])) ||
                      (currentShop && currentShop.name)
                    }
                    data={shopsData

                      // .map(
                      //   shop => productsMyBase.some(product => product.originalData.shopIds.includes(shop._id)) && shop,
                      // )
                      .filter(shop => currentShop?.id !== shop._id)}
                    searchFields={['name']}
                    firstItems={
                      <>
                        {!(!withProduct && !withoutProduct && !currentShop?._id) && (
                          <Button
                            disabled={!currentData}
                            className={classNames.button}
                            variant="text"
                            color="primary"
                            onClick={onClickShopBtn}
                          >
                            {t(TranslationKey['All Products'])}
                          </Button>
                        )}
                        {/* {!withProduct && (  // Не работает после пвнедрения пагинации, нужны отдельные фильтры в метод
                          <Button
                            disabled={!currentData}
                            className={classNames.button}
                            variant="text"
                            color="primary"
                            onClick={onClickWithProductsShopBtn}
                          >
                            {t(TranslationKey['Products in shops'])}
                          </Button>
                        )}

                        {!withoutProduct && (
                          <Button
                            disabled={!currentData}
                            className={classNames.button}
                            variant="text"
                            color="primary"
                            onClick={onClickWithoutProductsShopBtn}
                          >
                            {t(TranslationKey['Products without shops'])}
                          </Button>
                        )} */}
                      </>
                    }
                    onClickSelect={shop => onClickShopBtn(shop)}
                  />

                  <SearchInput
                    key={'client_inventory_search_input'}
                    inputClasses={classNames.searchInput}
                    placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                    onSubmit={onSearchSubmit}
                  />
                </div>

                {!isArchive ? (
                  <div className={classNames.simpleBtnsWrapper}>
                    <Button
                      tooltipInfoContent={t(TranslationKey['Deleted product archive'])}
                      variant="outlined"
                      className={classNames.openArchiveBtn}
                      onClick={onTriggerArchive}
                    >
                      {t(TranslationKey['Open archive'])}
                    </Button>

                    <Button
                      success
                      tooltipInfoContent={t(TranslationKey['Allows you to add your product to inventory'])}
                      className={cx(classNames.rightAddingBtn, classNames.flexCenterBtn)}
                      onClick={() => onTriggerOpenModal('showSendOwnProductModal')}
                    >
                      {t(TranslationKey['Add product'])}
                      <img src="/assets/icons/white-plus.svg" className={classNames.icon} />
                    </Button>
                  </div>
                ) : (
                  <div />
                )}
              </div>

              <div className={classNames.addProductBtnsWrapper}>
                {!isArchive && (
                  <div className={classNames.btnsWrapper}>
                    <Button
                      success
                      tooltipInfoContent={t(TranslationKey['To order selected products'])}
                      variant="contained"
                      disabled={selectedRowIds.length === 0}
                      onClick={onClickOrderBtn}
                    >
                      {t(TranslationKey['To order'])}
                    </Button>

                    <Button
                      tooltipInfoContent={t(
                        TranslationKey['Bind the selected product from the inventory to an item from the store'],
                      )}
                      disabled={selectedRowIds.length !== 1}
                      className={classNames.buttonOffset}
                      onClick={onClickBindInventoryGoodsToStockBtn}
                    >
                      {t(TranslationKey['Bind an product from Amazon'])}
                    </Button>

                    <Button
                      tooltipInfoContent={t(TranslationKey['Supplier Addition Services'])}
                      disabled={!selectedRowIds.length}
                      className={classNames.buttonOffset}
                      onClick={onClickAddSupplierBtn}
                    >
                      {t(TranslationKey['Supplier search'])}
                    </Button>

                    <Button disabled={!selectedRowIds.length} onClick={onClickParseProductsBtn}>
                      {'Parse all'}
                    </Button>
                    <Button
                      tooltipInfoContent={t(TranslationKey['Product lot data'])}
                      disabled={selectedRowIds.length !== 1}
                      onClick={onClickProductLotDataBtn}
                    >
                      {t(TranslationKey['Product lot data'])}
                    </Button>
                  </div>
                )}

                <div className={classNames.simpleBtnsWrapper}>
                  {!isArchive && (
                    <>
                      <Button
                        tooltipInfoContent={t(
                          TranslationKey['Delete the selected product (the product is moved to the archive)'],
                        )}
                        disabled={!selectedRowIds.length}
                        variant="outlined"
                        className={classNames.archiveAddBtn}
                        onClick={onClickTriggerArchOrResetProducts}
                      >
                        {t(TranslationKey['Move to archive'])}
                        {<DeleteIcon className={classNames.archiveIcon} />}
                      </Button>

                      <Button
                        success
                        className={classNames.rightAddingBtn}
                        onClick={() => onTriggerOpenModal('showAddSuppliersModal')}
                      >
                        {t(TranslationKey['Add a supplier list'])}
                        <img src="/assets/icons/white-plus.svg" className={classNames.icon} />
                      </Button>
                    </>
                  )}

                  {isArchive ? (
                    <>
                      <Button
                        tooltipInfoContent={t(TranslationKey['Return the selected product to the inventory list'])}
                        disabled={!selectedRowIds.length}
                        variant="contained"
                        onClick={onClickTriggerArchOrResetProducts}
                      >
                        {t(TranslationKey['Return to inventory'])}
                      </Button>

                      <Button
                        tooltipInfoContent={t(TranslationKey['Return to inventory with a list of items'])}
                        variant="outlined"
                        className={classNames.openArchiveBtn}
                        onClick={onTriggerArchive}
                      >
                        {t(TranslationKey['Open inventory'])}
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  disableVirtualization
                  pagination
                  checkboxSelection
                  selectionModel={selectedRowIds}
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
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  // rows={getCurrentData()}
                  rows={currentData}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onFilterModelChange={onChangeFilterModel}
                  onCellClick={(params, event) => {
                    event.defaultMuiPrevented = disableSelectionCells.includes(params.field)
                  }}
                  onCellDoubleClick={params =>
                    !disableSelectionCells.includes(params.field) && onClickShowProduct(params.row)
                  }
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        {showCircularProgressModal ? <CircularProgressWithLabel /> : null}

        <Modal openModal={showSendOwnProductModal} setOpenModal={() => onTriggerOpenModal('showSendOwnProductModal')}>
          <AddOwnProductForm
            showProgress={showProgress}
            progressValue={progressValue}
            onSubmit={onSubmitCreateProduct}
          />
        </Modal>

        <Modal openModal={showProductLotDataModal} setOpenModal={() => onTriggerOpenModal('showProductLotDataModal')}>
          <ProductLotDataForm
            product={currentData.filter(product => selectedRowIds.includes(product.id)).map(prod => prod.originalData)}
            batchesData={batchesData}
          />
        </Modal>

        <Modal
          openModal={showAddSupplierToIdeaFromInventoryModal}
          setOpenModal={() => onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
        >
          <AddSupplierToIdeaFromInventoryForm
            showProgress={showProgress}
            progressValue={progressValue}
            product={currentData.filter(product => selectedRowIds.includes(product.id)).map(prod => prod.originalData)}
            ideas={ideasData}
            onClose={() => onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
            onSubmit={createSupplierSearchRequest}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
          <SetBarcodeModal
            item={selectedProduct}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>

        <Modal openModal={showBarcodeOrHscodeModal} setOpenModal={() => onTriggerOpenModal('showBarcodeOrHscodeModal')}>
          <ShowBarOrHscodeModal
            barcode={currentBarcode}
            hscode={currentHscode}
            onCloseModal={() => onTriggerOpenModal('showBarcodeOrHscodeModal')}
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
          openModal={showSetFourMonthsStockValueModal}
          setOpenModal={() => onTriggerOpenModal('showSetFourMonthsStockValueModal')}
        >
          <SetFourMonthesStockModal
            title={t(TranslationKey['Four months of stock'])}
            selectedProduct={selectedProduct}
            onSubmit={onClickSaveFourMonthesStockValue}
            onCloseModal={() => onTriggerOpenModal('showSetFourMonthsStockValueModal')}
          />
        </Modal>

        <Modal
          missClickModalOn
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
            product={currentData.find(el => el.originalData._id === selectedRowId)}
            onClickFinalAddSupplierButton={onClickAddSupplierButton}
            onCloseModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
            onSubmitSeekSupplier={onSubmitCalculateSeekSupplier}
            onClickSeekSupplierToIdea={() => onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
          />
        </Modal>

        <Modal missClickModalOn openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            volumeWeightCoefficient={volumeWeightCoefficient}
            destinations={destinations}
            storekeepers={storekeepers}
            selectedProductsData={currentData
              .filter(product => selectedRowIds.includes(product.id))
              .map(prod => prod.originalData)}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onConfirmSubmitOrderProductModal}
          />
        </Modal>

        <Modal
          openModal={showBindInventoryGoodsToStockModal}
          setOpenModal={() => onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
        >
          <BindInventoryGoodsToStockForm
            product={currentData.find(item => selectedRowIds.includes(item.id))?.originalData}
            stockData={sellerBoardDailyData}
            updateStockData={getStockGoodsByFilters}
            onSubmit={onSubmitBindStockGoods}
          />
        </Modal>

        <Modal openModal={showAddSuppliersModal} setOpenModal={() => onTriggerOpenModal('showAddSuppliersModal')}>
          <AddSuppliersModal
            userInfo={userInfo}
            showProgress={showProgress}
            progressValue={progressValue}
            onSubmit={uploadTemplateFile}
            onClose={() => onTriggerOpenModal('showAddSuppliersModal')}
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

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={showInfoModalTitle}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
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
      </React.Fragment>
    )
  }
}

export const ClientInventoryView = withStyles(ClientInventoryViewRaw, styles)
