import { observer } from 'mobx-react'
import { useState } from 'react'

import { useGridApiRef } from '@mui/x-data-grid-premium'

import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { AddOwnProductForm } from '@components/forms/add-own-product-form'
import { BindInventoryGoodsToStockForm } from '@components/forms/bind-inventory-goods-to-stock-form'
import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { GetFilesForm } from '@components/forms/get-files-form'
import { ProductDataForm } from '@components/forms/product-data-form'
import { ProductLaunchForm } from '@components/forms/product-launch-form'
import { ProductVariationsForm } from '@components/forms/product-variations-form'
import { AddSuppliersModal } from '@components/modals/add-suppliers-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { EditProductTags } from '@components/modals/edit-product-tags-modal'
import { IdeaCardsModal } from '@components/modals/idea-cards-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductCardModal } from '@components/modals/product-card-modal/product-card-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetFourMonthesStockModal } from '@components/modals/set-four-monthes-stock-value-modal.js'
import { ShowBarOrHscodeModal } from '@components/modals/show-bar-or-hs-code-modal'
import { AddOrEditSupplierModalContent } from '@components/product/add-or-edit-supplier-modal-content'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { useStyles } from './client-inventory-view.style'

import {
  TAGS,
  clickableCells,
  disableDoubleClickOnCells,
  disableSelectionCells,
} from './client-inventory-view.constants'
import { ClientInventoryViewModel } from './client-inventory-view.model'
import { Header } from './header'

export const ClientInventoryView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientInventoryViewModel())
  viewModel.initHistory()

  const [useProductsPermissions] = useState(
    () =>
      new UseProductsPermissions(ClientModel.getProductPermissionsData, {
        isChild: false,
      }),
  )

  const getCellClassName = params => clickableCells.includes(params.field) && styles.clickableCell

  const apiRef = useGridApiRef()

  return (
    <div className="viewWrapper">
      <Header
        isArchive={viewModel.isArchive}
        selectedRows={viewModel.selectedRows}
        onClickTriggerArchOrResetProducts={viewModel.onClickTriggerArchOrResetProducts}
        onTriggerOpenModal={viewModel.onTriggerOpenModal}
        onTriggerArchive={viewModel.onTriggerArchive}
        onClickProducDataButton={viewModel.onClickProducDataButton}
        onClickParseProductsBtn={viewModel.onClickParseProductsBtn}
        onClickAddSupplierBtn={viewModel.onClickAddSupplierBtn}
        onClickBindInventoryGoodsToStockBtn={() => viewModel.onTriggerOpenModal('showBindInventoryGoodsToStockModal')}
        onClickProductLaunch={viewModel.onClickProductLaunch}
        onClickOrderBtn={viewModel.onClickOrderBtn}
        onSearchSubmit={viewModel.onSearchSubmit}
      />

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        apiRef={apiRef}
        pinnedColumns={viewModel.pinnedColumns}
        getCellClassName={getCellClassName}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: viewModel.columnMenuSettings,

          toolbar: {
            // presetsSettings: {
            //   presetsData: viewModel.presetsData,
            //   onClickResetPresets: viewModel.resetPresetsHandler,
            //   onClickSavePresets: viewModel.savePresetsHandler,
            // },

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
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

            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.columnsModel,
              onSortModelChange: viewModel.onChangeSortingModel,
            },

            tagSearchSettings: {
              tagList: viewModel.columnMenuSettings?.tags?.filterData,
              activeTags: viewModel.columnMenuSettings?.tags?.currentFilterData,
              isLoading: viewModel.columnMenuSettings?.filterRequestStatus === loadingStatus.IS_LOADING,
              getTags: () => viewModel.columnMenuSettings?.onClickFilterBtn(TAGS, DataGridFilterTables.PRODUCTS),
              setActiveProductsTag: viewModel.setActiveProductsTag,
            },
          },
        }}
        rowSelectionModel={viewModel.selectedRows}
        getRowId={row => row._id}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onCellClick={(params, event) => {
          if (
            disableSelectionCells.includes(params.field) ||
            params.field?.includes('boxAmounts') ||
            params.field?.includes('toRefill')
          ) {
            event.stopPropagation()
          }
          event.defaultMuiPrevented = disableSelectionCells.includes(params.field)
        }}
        onCellDoubleClick={(params, event) => {
          if (
            disableDoubleClickOnCells.includes(params.field) ||
            params.field?.includes('boxAmounts') ||
            params.field?.includes('toRefill')
          ) {
            event.stopPropagation()
          }
        }}
        onRowClick={params => viewModel.onClickProductModal(params.row)}
        onRowDoubleClick={params => viewModel.onClickShowProduct(params?.row?._id)}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

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

      {viewModel.showIdeaModal ? (
        <IdeaCardsModal
          // @ts-ignore
          isCreate
          product={viewModel.selectedProductToLaunch}
          productId={viewModel.selectedProductToLaunch?._id}
          openModal={viewModel.showIdeaModal}
          updateData={viewModel.getCurrentData}
          setOpenModal={() => viewModel.onTriggerOpenModal('showIdeaModal')}
        />
      ) : null}

      {viewModel.productCardModal && (
        <ProductCardModal
          history={history}
          openModal={viewModel.productCardModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('productCardModal')}
          updateDataHandler={viewModel.getCurrentData}
          onClickOpenNewTab={id => viewModel.onClickShowProduct(id)}
        />
      )}

      <Modal
        openModal={viewModel.showProductDataModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductDataModal')}
      >
        <ProductDataForm product={viewModel.curProduct} isBatches={viewModel.isBatches} onAmazon={viewModel.onAmazon} />
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
        openModal={viewModel.showSetBarcodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetBarcodeModal')}
      >
        <SetBarcodeModal
          barCode={viewModel.selectedProduct?.barCode}
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
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          productId={viewModel.selectedProduct?._id}
          onUpdateData={viewModel.getCurrentData}
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
        openModal={viewModel.showSelectionSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
      >
        <SelectionSupplierModal
          product={
            viewModel.selectedProductToLaunch || viewModel.currentData.find(el => el._id === viewModel.selectedRowId)
          }
          title={viewModel.selectedProductToLaunch && t(TranslationKey['Send product card for supplier search'])}
          onClickFinalAddSupplierButton={viewModel.onClickAddSupplierButton}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSelectionSupplierModal')}
          onSubmitSeekSupplier={viewModel.onSubmitCalculateSeekSupplier}
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
          selectedProductsData={viewModel.dataForOrderModal}
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
          product={viewModel.currentData.find(item => viewModel.selectedRows.includes(item._id))}
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

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

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

      {viewModel.showCircularProgressModal ? <CircularProgressWithLabel /> : null}
      {viewModel.showProgress && <CircularProgressWithLabel />}

      <Modal
        openModal={viewModel.showAddOrEditSupplierModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
      >
        <AddOrEditSupplierModalContent
          // @ts-ignore
          paymentMethods={viewModel.paymentMethods}
          requestStatus={viewModel.requestStatus}
          platformSettings={viewModel.platformSettings}
          title={t(TranslationKey['Adding and editing a supplier'])}
          onClickSaveBtn={viewModel.onClickSaveSupplierBtn}
          onTriggerShowModal={() => viewModel.onTriggerOpenModal('showAddOrEditSupplierModal')}
        />
      </Modal>

      {viewModel.showEditProductTagsModal ? (
        <EditProductTags
          openModal={viewModel.showEditProductTagsModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showEditProductTagsModal')}
          productId={viewModel.selectedRowId}
          handleUpdateRow={tags => apiRef.current.updateRows([{ _id: viewModel.selectedRowId, tags }])}
        />
      ) : null}
    </div>
  )
})
