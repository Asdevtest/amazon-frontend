/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Alert } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { AddOwnProductForm } from '@components/forms/add-own-product-form'
import { AddSupplierToIdeaFromInventoryForm } from '@components/forms/add-supplier-to-idea-from-inventory-form'
import { BindInventoryGoodsToStockForm } from '@components/forms/bind-inventory-goods-to-stock-form'
import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { GetFilesForm } from '@components/forms/get-files-form'
import { ProductLotDataForm } from '@components/forms/product-lot-data-form/product-lot-data-form'
import { MainContent } from '@components/layout/main-content'
import { AddSuppliersModal } from '@components/modals/add-suppliers-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetChipValueModal } from '@components/modals/set-chip-value-modal'
import { SetFourMonthesStockModal } from '@components/modals/set-four-monthes-stock-value-modal.js'
import { ShowBarOrHscodeModal } from '@components/modals/show-bar-or-hs-code-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { ClientInventoryViewModel } from './client-inventory-view.model'
import { styles } from './client-inventory-view.style'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'

export const ClientInventoryViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new ClientInventoryViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const disableSelectionCells = ['stockUSA', 'purchaseQuantity', 'barCode']

  const clickableCells = ['inTransfer', 'amountInBoxes', 'amountInOrders']

  const getCellClassName = params => clickableCells.includes(params.field) && classNames.clickableCell

  const getRowClassName = params =>
    (!params.row.originalData.ideasOnCheck && !!params.row.originalData.ideasVerified && classNames.ideaRowGreen) ||
    (!!params.row.originalData.ideasOnCheck && classNames.ideaRowYellow)

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.topHeaderBtnsWrapper}>
          <div className={classNames.shopsFiltersWrapper}>
            <SearchInput
              key={'client_inventory_search_input'}
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
              onSubmit={viewModel.onSearchSubmit}
            />
          </div>

          {!viewModel.isArchive ? (
            <div className={classNames.simpleBtnsWrapper}>
              <Button
                tooltipInfoContent={t(TranslationKey['Deleted product archive'])}
                variant="outlined"
                btnWrapperStyle={classNames.btnWrapperStyle}
                className={classNames.openArchiveBtn}
                onClick={viewModel.onTriggerArchive}
              >
                {t(TranslationKey['Open archive'])}
              </Button>

              <Button
                success
                tooltipInfoContent={t(TranslationKey['Allows you to add your product to inventory'])}
                btnWrapperStyle={classNames.btnWrapperStyle}
                className={cx(classNames.rightAddingBtn, classNames.flexCenterBtn)}
                onClick={() => viewModel.onTriggerOpenModal('showSendOwnProductModal')}
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
          {!viewModel.isArchive && (
            <div className={classNames.btnsWrapper}>
              <Button
                success
                tooltipInfoContent={t(TranslationKey['To order selected products'])}
                variant="contained"
                disabled={viewModel.selectedRowIds.length === 0}
                onClick={viewModel.onClickOrderBtn}
              >
                {t(TranslationKey['To order'])}
              </Button>

              <Button
                tooltipInfoContent={t(
                  TranslationKey['Bind the selected product from the inventory to an item from the store'],
                )}
                disabled={viewModel.selectedRowIds.length !== 1}
                className={cx(classNames.buttonOffset)}
                onClick={viewModel.onClickBindInventoryGoodsToStockBtn}
              >
                {t(TranslationKey['Bind an product from Amazon'])}
              </Button>

              <Button
                tooltipInfoContent={t(TranslationKey['Supplier Addition Services'])}
                disabled={!viewModel.selectedRowIds.length}
                className={cx(classNames.buttonOffset)}
                onClick={viewModel.onClickAddSupplierBtn}
              >
                {t(TranslationKey['Supplier search'])}
              </Button>

              <Button disabled={!viewModel.selectedRowIds.length} onClick={viewModel.onClickParseProductsBtn}>
                {'Parse all'}
              </Button>
              <Button
                tooltipInfoContent={t(TranslationKey['Product batches data'])}
                disabled={viewModel.selectedRowIds.length !== 1}
                onClick={viewModel.onClickProductLotDataBtn}
              >
                {t(TranslationKey['Product batches data'])}
              </Button>
            </div>
          )}

          <div className={classNames.simpleBtnsWrapper}>
            {!viewModel.isArchive && (
              <>
                <Button
                  tooltipInfoContent={t(
                    TranslationKey['Delete the selected product (the product is moved to the archive)'],
                  )}
                  disabled={!viewModel.selectedRowIds.length}
                  variant="outlined"
                  className={classNames.archiveAddBtn}
                  sx={{
                    '&.Mui-disabled': {
                      background: 'none',
                    },
                  }}
                  onClick={viewModel.onClickTriggerArchOrResetProducts}
                >
                  {t(TranslationKey['Move to archive'])}
                  {<DeleteIcon className={classNames.archiveIcon} />}
                </Button>

                <Button
                  success
                  className={classNames.rightAddingBtn}
                  onClick={() => viewModel.onTriggerOpenModal('showAddSuppliersModal')}
                >
                  {t(TranslationKey['Add a supplier list'])}
                  <img src="/assets/icons/white-plus.svg" className={classNames.icon} />
                </Button>
              </>
            )}

            {viewModel.isArchive ? (
              <>
                <Button
                  tooltipInfoContent={t(TranslationKey['Return the selected product to the inventory list'])}
                  disabled={!viewModel.selectedRowIds.length}
                  variant="contained"
                  onClick={viewModel.onClickTriggerArchOrResetProducts}
                >
                  {t(TranslationKey['Return to inventory'])}
                </Button>

                <Button
                  tooltipInfoContent={t(TranslationKey['Return to inventory with a list of items'])}
                  variant="outlined"
                  className={classNames.openArchiveBtn}
                  onClick={viewModel.onTriggerArchive}
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
            disableRowSelectionOnClick
            propsToRerender={{ onHover: viewModel.onHover }}
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,

              columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
              columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
              iconSeparator: classNames.iconSeparator,
              menuIconButton: classNames.menuIconButton,
              iconButtonContainer: classNames.iconButtonContainer,
            }}
            sx={{
              '.MuiDataGrid-sortIcon': {
                width: 14,
                height: 14,
              },
            }}
            getCellClassName={getCellClassName}
            getRowClassName={getRowClassName}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.currentData}
            columnHeaderHeight={65}
            rowHeight={160}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
            slotProps={{
              columnMenu: viewModel.columnMenuSettings,

              toolbar: {
                resetFiltersBtnSettings: {
                  onClickResetFilters: viewModel.onClickResetFilters,
                  isSomeFilterOn: viewModel.isSomeFilterOn,
                },
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            rowSelectionModel={viewModel.selectedRowIds}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onColumnHeaderEnter={params => {
              viewModel.onHoverColumnField(params.field)
            }}
            onColumnHeaderLeave={viewModel.onLeaveColumnField}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onCellClick={(params, event) => {
              if (disableSelectionCells.includes(params.field)) {
                event.stopPropagation()
              }
              event.defaultMuiPrevented = disableSelectionCells.includes(params.field)
            }}
            onCellDoubleClick={params =>
              !disableSelectionCells.includes(params.field) && viewModel.onClickShowProduct(params.row)
            }
            onRowClick={params => viewModel.onClickProductModal(params.row)}
          />
        </div>
      </MainContent>

      {viewModel.showCircularProgressModal ? <CircularProgressWithLabel /> : null}

      <Modal
        openModal={viewModel.showSendOwnProductModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSendOwnProductModal')}
      >
        <AddOwnProductForm
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onSubmit={viewModel.onSubmitCreateProduct}
        />
      </Modal>

      <ProductCardModal
        history={viewModel.history}
        openModal={viewModel.productCardModal}
        setOpenModal={() => viewModel.onClickProductModal()}
        onClickOpenNewTab={row => viewModel.onClickShowProduct(row)}
      />

      <Modal
        openModal={viewModel.showProductLotDataModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductLotDataModal')}
      >
        <ProductLotDataForm
          userInfo={viewModel.userInfo}
          isTransfer={viewModel.isTransfer}
          product={viewModel.curProduct}
          batchesData={viewModel.batchesData}
          onClickToggleArchiveProductLotData={viewModel.onClickToggleArchiveProductLotData}
        />
      </Modal>

      <Modal
        openModal={viewModel.showCheckPendingOrderFormModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
      >
        <CheckPendingOrderForm
          existingOrders={viewModel.existingOrders}
          checkPendingData={viewModel.checkPendingData}
          onClickPandingOrder={viewModel.onClickPandingOrder}
          onClickContinueBtn={viewModel.onClickContinueBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddSupplierToIdeaFromInventoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
      >
        <AddSupplierToIdeaFromInventoryForm
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          product={viewModel.currentData
            .filter(product => viewModel.selectedRowIds.includes(product.id))
            .map(prod => prod.originalData)}
          ideas={viewModel.ideasData}
          onClose={() => viewModel.onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
          onSubmit={viewModel.createSupplierSearchRequest}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetBarcodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
      >
        <SetBarcodeModal
          item={viewModel.selectedProduct}
          onClickSaveBarcode={viewModel.onClickSaveBarcode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showBarcodeOrHscodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBarcodeOrHscodeModal')}
      >
        <ShowBarOrHscodeModal
          barcode={viewModel.currentBarcode}
          hscode={viewModel.currentHscode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showBarcodeOrHscodeModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetChipValueModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetChipValueModal')}
      >
        <SetChipValueModal
          title={t(TranslationKey['Set HS code'])}
          sourceValue={viewModel.selectedProduct?.hsCode}
          onSubmit={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSetChipValueModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          hsCodeData={viewModel.hsCodeData}
          onClickSaveHsCode={viewModel.onClickSaveHsCode}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetFourMonthsStockValueModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetFourMonthsStockValueModal')}
      >
        <SetFourMonthesStockModal
          title={t(TranslationKey['Four months of stock'])}
          selectedProduct={viewModel.selectedProduct}
          onSubmit={viewModel.onClickSaveFourMonthesStockValue}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSetFourMonthsStockValueModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
      >
        <AddOrEditSupplierModalContent
          outsideProduct
          paymentMethods={viewModel.paymentMethods}
          sourceYuanToDollarRate={viewModel.yuanToDollarRate}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          title={t(TranslationKey['Add a new supplier'])}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onTriggerShowModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
          onClickPrevButton={viewModel.onClickPrevButton}
          onClickSaveBtn={viewModel.onSubmitSaveSupplier}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSelectionSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
      >
        <SelectionSupplierModal
          product={viewModel.currentData.find(el => el.originalData._id === viewModel.selectedRowId)}
          onClickFinalAddSupplierButton={viewModel.onClickAddSupplierButton}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
          onSubmitSeekSupplier={viewModel.onSubmitCalculateSeekSupplier}
          onClickSeekSupplierToIdea={() => viewModel.onTriggerOpenModal('showAddSupplierToIdeaFromInventoryModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <OrderProductModal
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          selectedProductsData={viewModel.currentData
            .filter(product => viewModel.selectedRowIds.includes(product.id))
            .map(prod => prod.originalData)}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onConfirmSubmitOrderProductModal}
        />
      </Modal>

      <Modal
        openModal={viewModel.showBindInventoryGoodsToStockModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
      >
        <BindInventoryGoodsToStockForm
          product={viewModel.currentData.find(item => viewModel.selectedRowIds.includes(item.id))?.originalData}
          stockData={viewModel.sellerBoardDailyData}
          updateStockData={viewModel.getStockGoodsByFilters}
          onSubmit={viewModel.onSubmitBindStockGoods}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddSuppliersModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddSuppliersModal')}
      >
        <AddSuppliersModal
          userInfo={viewModel.userInfo}
          showProgress={viewModel.showProgress}
          progressValue={viewModel.progressValue}
          onSubmit={viewModel.uploadTemplateFile}
          onClose={() => viewModel.onTriggerOpenModal('showAddSuppliersModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showGetFilesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showGetFilesModal')}
      >
        <GetFilesForm
          receivedFiles={viewModel.receivedFiles}
          onClose={() => viewModel.onTriggerOpenModal('showGetFilesModal')}
        />
      </Modal>

      <SuccessInfoModal
        openModal={viewModel.showSuccessModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessModal')}
        title={viewModel.successModalText}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessModal')
        }}
      />

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={viewModel.showInfoModalTitle}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showInfoModal')
        }}
      />

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        isWarning={viewModel.confirmModalSettings.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
      {viewModel.acceptMessage && viewModel.showAcceptMessage ? (
        <div className={classNames.acceptMessageWrapper}>
          <Alert elevation={5} severity="success">
            {viewModel.acceptMessage}
          </Alert>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export const ClientInventoryView = withStyles(observer(ClientInventoryViewRaw), styles)
