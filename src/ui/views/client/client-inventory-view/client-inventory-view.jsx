/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Alert, Tooltip, Typography} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOwnProductForm} from '@components/forms/add-own-product-form'
import {AddSupplierToIdeaFromInventoryForm} from '@components/forms/add-supplier-to-idea-from-inventory-form'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
import {CheckPendingOrderForm} from '@components/forms/check-pending-order-form'
import {GetFilesForm} from '@components/forms/get-files-form'
import {ProductLotDataForm} from '@components/forms/product-lot-data-form/product-lot-data-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {AddSuppliersModal} from '@components/modals/add-suppliers-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {SelectionSupplierModal} from '@components/modals/selection-supplier-modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {SetChipValueModal} from '@components/modals/set-chip-value-modal'
import {SetFourMonthesStockModal} from '@components/modals/set-four-monthes-stock-value-modal.js'
import {ShowBarOrHscodeModal} from '@components/modals/show-bar-or-hs-code-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/'
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
      columnMenuSettings,
      isNeedPurchaseFilter,
      isTransfer,
      curProduct,
      receivedFiles,
      batchesData,
      currentData,
      userInfo,
      showInfoModalTitle,
      requestStatus,
      hsCodeData,
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
      currentShops,

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
      showEditHSCodeModal,

      showAcceptMessage,
      acceptMessage,

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
      showCheckPendingOrderFormModal,
      showBindInventoryGoodsToStockModal,
      showAddSupplierToIdeaFromInventoryModal,
      showBarcodeOrHscodeModal,
      showInfoModal,
      showSetFourMonthsStockValueModal,
      showAddSuppliersModal,
      showCircularProgressModal,
      showProductLotDataModal,
      showGetFilesModal,
      destinationsFavourites,
      existingOrders,
      checkPendingData,
      onClickPandingOrder,
      onClickContinueBtn,
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
      onClickToggleArchiveProductLotData,

      onClickWithoutProductsShopBtn,
      onClickWithProductsShopBtn,

      createSupplierSearchRequest,
      setDestinationsFavouritesItem,
      // onClickSavesStockUSA,
      withoutProduct,
      withProduct,

      onSearchSubmit,

      onClickPrevButton,
      onChangeIsNeedPurchaseFilter,
      getProductsMy1,
      onClickFilterBtn,
    } = this.viewModel
    const {classes: classNames} = this.props

    const disableSelectionCells = ['asin', 'stockUSA', 'fourMonthesStock']

    const clickableCells = ['inTransfer', 'amountInBoxes', 'amountInOrders']

    const getCellClassName = params => clickableCells.includes(params.field) && classNames.clickableCell

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Inventory)}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <div className={classNames.shopsFiltersWrapper}>
                  <WithSearchSelect
                    checkbox
                    notCloseOneClick
                    currentShops={currentShops}
                    selectedItemName={
                      (!withProduct && !withoutProduct && !currentShops?.length && t(TranslationKey['All Products'])) ||
                      (currentShops?.length && currentShops?.map(shop => shop.name).join(', '))
                    }
                    // Расскоментировать если нужно будет убрать из списка магазинов выбранные мазин
                    data={shopsData /* .filter(shop => currentShop?.id !== shop._id) */}
                    searchFields={['name']}
                    firstItems={
                      <>
                        {!(!withProduct && !withoutProduct && !currentShops[0]?._id) && (
                          <Button
                            disabled={!currentData}
                            className={classNames.button}
                            variant="text"
                            color="primary"
                            onClick={() => onClickShopBtn('ALL')}
                          >
                            {t(TranslationKey['All Products'])}
                          </Button>
                        )}
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
                      tooltipInfoContent={t(TranslationKey['Product batches data'])}
                      disabled={selectedRowIds.length !== 1}
                      onClick={onClickProductLotDataBtn}
                    >
                      {t(TranslationKey['Product batches data'])}
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
                        sx={{
                          '&.Mui-disabled': {
                            background: 'none',
                          },
                        }}
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
                <MemoDataGrid
                  disableVirtualization
                  pagination
                  checkboxSelection
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,

                    columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                    columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                    columnHeader: classNames.columnHeader,
                    menuIconButton: classNames.menuIconButton,
                    iconButtonContainer: classNames.iconButtonContainer,
                    iconSeparator: classNames.iconSeparator,
                    columnHeaderTitleContainerContent: classNames.columnHeaderTitleContainerContent,
                    checkboxInput: classNames.checkboxInput,
                    sortIcon: classNames.sortIcon,
                  }}
                  sx={{
                    '.MuiDataGrid-sortIcon': {
                      width: 14,
                      height: 14,
                    },
                  }}
                  getCellClassName={getCellClassName}
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  headerHeight={65}
                  rowHeight={120}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenu: DataGridCustomColumnMenuComponent,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  componentsProps={{
                    columnMenu: columnMenuSettings,
                  }}
                  selectionModel={selectedRowIds}
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
            userInfo={userInfo}
            isTransfer={isTransfer}
            product={curProduct}
            batchesData={batchesData}
            onClickToggleArchiveProductLotData={onClickToggleArchiveProductLotData}
          />
        </Modal>

        <Modal
          openModal={showCheckPendingOrderFormModal}
          setOpenModal={() => onTriggerOpenModal('showCheckPendingOrderFormModal')}
        >
          <CheckPendingOrderForm
            existingOrders={existingOrders}
            checkPendingData={checkPendingData}
            onClickPandingOrder={onClickPandingOrder}
            onClickContinueBtn={onClickContinueBtn}
            onClickCancelBtn={() => onTriggerOpenModal('showCheckPendingOrderFormModal')}
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

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
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
            onTriggerShowModal={() => onTriggerOpenModal('showAddOrEditSupplierModal')}
            onClickPrevButton={onClickPrevButton}
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
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
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

        <Modal openModal={showGetFilesModal} setOpenModal={() => onTriggerOpenModal('showGetFilesModal')}>
          <GetFilesForm receivedFiles={receivedFiles} onClose={() => onTriggerOpenModal('showGetFilesModal')} />
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
        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const ClientInventoryView = withStyles(ClientInventoryViewRaw, styles)
