import DeleteIcon from '@mui/icons-material/Delete'
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
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {AddOwnProductForm} from '@components/forms/add-own-product-form'
import {AddSupplierToIdeaFromInventoryForm} from '@components/forms/add-supplier-to-idea-from-inventory-form'
import {BindInventoryGoodsToStockForm} from '@components/forms/bind-inventory-goods-to-stock-form'
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
      nameSearchValue,
      showInfoModalTitle,
      requestStatus,
      getCurrentData,

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

      onClickWithoutProductsShopBtn,
      onClickWithProductsShopBtn,

      onChangeNameSearchValue,

      withoutProduct,
      withProduct,
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

                      .map(
                        shop => productsMyBase.some(product => product.originalData.shopIds.includes(shop._id)) && shop,
                      )
                      .filter(shop => currentShop?.id !== shop._id)}
                    fieldName="name"
                    firstItems={
                      <>
                        {!(!withProduct && !withoutProduct && !currentShop?._id) && (
                          <Button
                            disabled={!productsMy}
                            className={classNames.button}
                            variant="text"
                            color="primary"
                            onClick={onClickShopBtn}
                          >
                            {t(TranslationKey['All Products'])}
                          </Button>
                        )}
                        {!withProduct && (
                          <Button
                            disabled={!productsMy}
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
                            disabled={!productsMy}
                            className={classNames.button}
                            variant="text"
                            color="primary"
                            onClick={onClickWithoutProductsShopBtn}
                          >
                            {t(TranslationKey['Products without shops'])}
                          </Button>
                        )}
                      </>
                    }
                    onClickSelect={shop => onClickShopBtn(shop)}
                  />

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
                      className={classNames.rightAddingBtn}
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
                      disableElevation
                      tooltipInfoContent={t(
                        TranslationKey['Bind the selected product from the inventory to an item from the store'],
                      )}
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
                      tooltipInfoContent={t(TranslationKey['Supplier Addition Services'])}
                      tooltipAttentionContent={
                        selectedRowIds.length &&
                        isNoEditProductSelected &&
                        t(TranslationKey['Product with invalid status selected'])
                      }
                      disabled={!selectedRowIds.length || isNoEditProductSelected}
                      className={classNames.buttonOffset}
                      onClick={() => onClickAddSupplierBtn()}
                    >
                      {t(TranslationKey['Supplier search'])}
                    </Button>

                    <Button
                      tooltipAttentionContent={
                        isNoEditProductSelected && t(TranslationKey['Product with invalid status selected'])
                      }
                      variant="contained"
                      disabled={!selectedRowIds.length || isNoEditProductSelected}
                      onClick={onClickParseProductsBtn}
                    >
                      {'Parse all'}
                    </Button>
                  </div>
                )}

                <div className={classNames.simpleBtnsWrapper}>
                  {!isArchive && (
                    <>
                      <Button
                        tooltipAttentionContent={
                          isNoEditProductSelected && t(TranslationKey['Product with invalid status selected'])
                        }
                        tooltipInfoContent={t(
                          TranslationKey['Delete the selected product (the product is moved to the archive)'],
                        )}
                        disabled={!selectedRowIds.length || isNoEditProductSelected}
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
                        disableElevation
                        tooltipAttentionContent={
                          isNoEditProductSelected && t(TranslationKey['Product with invalid status selected'])
                        }
                        tooltipInfoContent={t(TranslationKey['Return the selected product to the inventory list'])}
                        disabled={!selectedRowIds.length || isNoEditProductSelected}
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
                  pagination
                  useResizeContainer
                  checkboxSelection
                  // sx={{
                  //   border: 0,
                  //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  //   backgroundColor: '#fff',
                  //   height: '700px',
                  // }}
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
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
                  // onRowClick={(params, event) => // в один клик(с фильтрами)
                  //   event.target.checked === undefined &&
                  //   !event.target.className.includes('Chip') &&
                  //   onClickShowProduct(params.row)
                  // }
                  onRowDoubleClick={params => onClickShowProduct(params.row)}
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

        <Modal
          openModal={showAddSupplierToIdeaFromInventoryModal}
          setOpenModal={() => onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
        >
          <AddSupplierToIdeaFromInventoryForm
            showProgress={showProgress}
            progressValue={progressValue}
            ideas={ideasData}
            onClose={() => onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}

            // onSubmit={onSubmitCreateProduct}
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
            product={productsMy.find(el => el.originalData._id === selectedRowId)}
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
            selectedProductsData={productsMy
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
            product={getCurrentData().find(item => selectedRowIds.includes(item.id))?.originalData}
            stockData={sellerBoardDailyData}
            updateStockData={getStockGoodsByFilters}
            onSubmit={onSubmitBindStockGoods}
          />
        </Modal>

        <Modal openModal={showAddSuppliersModal} setOpenModal={() => onTriggerOpenModal('showAddSuppliersModal')}>
          <AddSuppliersModal
            product={productsMy[0]}
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

export const ClientInventoryView = withStyles(styles)(ClientInventoryViewRaw)
