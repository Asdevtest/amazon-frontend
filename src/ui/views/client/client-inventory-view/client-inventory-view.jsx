import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { SelectedButtonValueConfig } from '@constants/configs/buttons'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { AddOwnProductForm } from '@components/forms/add-own-product-form'
import { AddSupplierToIdeaFromInventoryForm } from '@components/forms/add-supplier-to-idea-from-inventory-form'
import { BindInventoryGoodsToStockForm } from '@components/forms/bind-inventory-goods-to-stock-form'
import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { GetFilesForm } from '@components/forms/get-files-form'
import { ProductLaunchForm } from '@components/forms/product-launch-form'
import { ProductLotDataForm } from '@components/forms/product-lot-data-form/product-lot-data-form'
import { ProductVariationsForm } from '@components/forms/product-variations-form'
import { AddSuppliersModal } from '@components/modals/add-suppliers-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetChipValueModal } from '@components/modals/set-chip-value-modal'
import { SetFourMonthesStockModal } from '@components/modals/set-four-monthes-stock-value-modal.js'
import { ShowBarOrHscodeModal } from '@components/modals/show-bar-or-hs-code-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content/'
import { AlertShield } from '@components/shared/alert-shield'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { useStyles } from './client-inventory-view.style'

import { ClientInventoryViewModel } from './client-inventory-view.model'
import { Header } from './components'
import {
  clickableCells,
  disableDoubleClickOnCells,
  disableSelectionCells,
} from './helpers/client-inventory-view.constants'

export const ClientInventoryView = observer(({ history, location }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientInventoryViewModel({ history, location }))
  const [useProductsPermissions] = useState(
    () =>
      new UseProductsPermissions(ClientModel.getProductPermissionsData, {
        isChild: false,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getCellClassName = params => clickableCells.includes(params.field) && styles.clickableCell

  const getRowClassName = params =>
    (!params.row.originalData.ideasOnCheck && !!params.row.originalData.ideasVerified && styles.ideaRowGreen) ||
    (!!params.row.originalData.ideasOnCheck && styles.ideaRowYellow)

  return (
    <>
      <Header
        isArchive={viewModel.isArchive}
        selectedRows={viewModel.selectedRows}
        onClickTriggerArchOrResetProducts={viewModel.onClickTriggerArchOrResetProducts}
        onTriggerOpenModal={viewModel.onTriggerOpenModal}
        onTriggerArchive={viewModel.onTriggerArchive}
        onClickProductLotDataBtn={viewModel.onClickProductLotDataBtn}
        onClickParseProductsBtn={viewModel.onClickParseProductsBtn}
        onClickAddSupplierBtn={viewModel.onClickAddSupplierBtn}
        onClickBindInventoryGoodsToStockBtn={viewModel.onClickBindInventoryGoodsToStockBtn}
        onClickProductLaunch={viewModel.onClickProductLaunch}
        onClickOrderBtn={viewModel.onClickOrderBtn}
        onSearchSubmit={viewModel.onSearchSubmit}
      />

      <div className={styles.datagridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          getCellClassName={getCellClassName}
          getRowClassName={getRowClassName}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.tableData}
          getRowHeight={() => 'auto'}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            columnMenu: viewModel.columnMenuSettings,

            toolbar: {
              presetsSettings: {
                presetsData: viewModel.presetsData,
                onClickResetPresets: viewModel.resetPresetsHandler,
                onClickSavePresets: viewModel.savePresetsHandler,
              },
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
          rowSelectionModel={viewModel.selectedRows}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onCellClick={(params, event) => {
            if (disableSelectionCells.includes(params.field)) {
              event.stopPropagation()
            }
            event.defaultMuiPrevented = disableSelectionCells.includes(params.field)
          }}
          onCellDoubleClick={(params, event) => {
            if (disableDoubleClickOnCells.includes(params.field)) {
              event.stopPropagation()
            }
          }}
          onRowClick={params => viewModel.onClickProductModal(params.row)}
          onRowDoubleClick={params => viewModel.onClickShowProduct(params?.row?.originalData?._id)}
        />
      </div>

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

      <Modal
        noPadding
        dialogClassName={styles.modalDialogContext}
        openModal={viewModel.showProductLaunch}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductLaunch')}
      >
        <ProductLaunchForm
          selectedProductToLaunch={viewModel.selectedProductToLaunch}
          productsToLaunch={useProductsPermissions.currentPermissionsData}
          loadMorePermissionsDataHadler={() => useProductsPermissions.loadMoreDataHadler()}
          onClickVariationRadioButton={() => useProductsPermissions.getPermissionsData()}
          onClickSubmitSearch={value => useProductsPermissions.onClickSubmitSearch(value)}
          onClickNextButton={viewModel.onClickNextButton}
          onClickCancelButton={() => viewModel.onTriggerOpenModal('showProductLaunch')}
        />
      </Modal>

      {viewModel.showIdeaModal && (
        <IdeaCardsModal
          isCreate
          product={viewModel.selectedProductToLaunch}
          productId={viewModel.selectedProductToLaunch?._id}
          openModal={viewModel.showIdeaModal}
          updateData={viewModel.getProductsMy}
          setOpenModal={() => viewModel.onTriggerOpenModal('showIdeaModal')}
        />
      )}

      {viewModel.productCardModal && (
        <ProductCardModal
          history={viewModel.history}
          openModal={viewModel.productCardModal}
          setOpenModal={() => viewModel.onClickProductModal()}
          updateDataHandler={() => viewModel.getProductsMy()}
          onClickOpenNewTab={id => viewModel.onClickShowProduct(id)}
        />
      )}

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
          existingProducts={viewModel.existingProducts}
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
          product={viewModel.tableData
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
          product={
            viewModel.selectedProductToLaunch ||
            viewModel.tableData.find(el => el.originalData._id === viewModel.selectedRowId)
          }
          title={viewModel.selectedProductToLaunch && t(TranslationKey['Send product card for supplier search'])}
          buttonValue={viewModel.selectedProductToLaunch && SelectedButtonValueConfig.SEND_REQUEST}
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
          isInventory
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          // selectedProductsData={viewModel.dataForOrderModal}
          selectedProductsData={viewModel.tableData
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
          product={viewModel.tableData.find(item => viewModel.selectedRowIds.includes(item.id))?.originalData}
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
        isWarning={viewModel.confirmModalSettings?.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      {viewModel.showProductVariationsForm && (
        <Modal
          noPadding
          openModal={viewModel.showProductVariationsForm}
          setOpenModal={() => viewModel.onTriggerOpenModal('showProductVariationsForm')}
        >
          <ProductVariationsForm
            product={viewModel.productVariations}
            onClickShowProduct={viewModel.onClickShowProduct}
          />
        </Modal>
      )}

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}

      {viewModel.showCircularProgressModal ? <CircularProgressWithLabel /> : null}
      {viewModel.showProgress && <CircularProgressWithLabel />}
    </>
  )
})
