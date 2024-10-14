import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { useGridApiRef } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { ProductDataForm } from '@components/forms/product-data-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MyOrderModal } from '@components/modals/my-order-modal/my-order-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductAndBatchModal } from '@components/modals/product-and-batch-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-orders-view.style'

import { ClientOrdersViewModel } from './client-orders-view.model'

export const ClientOrdersView = observer(history => {
  const { classes: styles, cx } = useStyles()

  const viewModel = useMemo(() => new ClientOrdersViewModel(history), [])

  const apiRef = useGridApiRef()

  return (
    <>
      <div className={styles.flexRow}>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title, Order, item"
          wrapperClassName={styles.inputSearch}
          onSearch={viewModel.onSearchSubmit}
        />

        {viewModel.isPendingOrdering ? (
          <div className={styles.flexRow}>
            <CustomButton
              type="primary"
              size="large"
              disabled={!viewModel.selectedRows.length}
              onClick={viewModel.onClickManyReorder}
            >
              {t(TranslationKey['To order'])}
            </CustomButton>

            <CustomButton
              danger
              type="primary"
              size="large"
              disabled={!viewModel.selectedRows.length}
              onClick={viewModel.onConfirmCancelManyReorder}
            >
              {t(TranslationKey['Cancel order'])}
            </CustomButton>
          </div>
        ) : (
          <div />
        )}
      </div>

      <CustomDataGrid
        disableRowSelectionOnClick
        apiRef={apiRef}
        checkboxSelection={viewModel.isPendingOrdering}
        pinnedColumns={viewModel.pinnedColumns}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={row => row._id}
        rowSelectionModel={viewModel.selectedRows}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
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
            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.columnsModel,
              onSortModelChange: viewModel.onChangeSortingModel,
            },

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowClick={params => viewModel.onClickMyOrderModal(params.row._id)}
        onPinnedColumnsChange={viewModel.handlePinColumn}
      />

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
        openModal={viewModel.showProductModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductModal')}
      >
        <ProductAndBatchModal
          currentSwitch={viewModel.productAndBatchModalSwitcherCondition}
          batches={viewModel.productBatches}
          getCurrentBatch={viewModel.getCurrBatch}
          currentBatch={viewModel.currentBatch}
          shops={viewModel.shopsData}
          selectedProduct={viewModel.selectedWarehouseOrderProduct}
          patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
          onChangeSwitcher={viewModel.onClickChangeProductAndBatchModalCondition}
          onClickMyOrderModal={viewModel.onClickMyOrderModal}
          onOpenProductDataModal={viewModel.onOpenProductDataModal}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <OrderProductModal
          isPendingOrdering={viewModel.isPendingOrdering}
          reorderOrdersData={viewModel.reorderOrdersData}
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onConfirmSubmitOrderProductModal}
        />
      </Modal>

      <Modal
        openModal={viewModel.showCheckPendingOrderFormModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
      >
        <CheckPendingOrderForm
          existingProducts={viewModel.existingProducts}
          onClickPandingOrder={viewModel.onClickPandingOrder}
          onClickContinueBtn={() => viewModel.onClickContinueBtn(viewModel.existingProducts?.[0])}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showCheckPendingOrderFormModal')}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.title}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
        />
      ) : null}

      {viewModel.showMyOrderModal ? (
        <MyOrderModal
          isClient
          isPendingOrdering={viewModel.isPendingOrdering}
          order={viewModel.order}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepers}
          platformSettings={viewModel.platformSettings}
          switcherCondition={viewModel.myOrderModalSwitcherCondition}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          openModal={viewModel.showMyOrderModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMyOrderModal')}
          onClickOpenNewTab={viewModel.onClickOpenNewTab}
          onClickChangeCondition={viewModel.onClickChangeMyOrderModalCondition}
          onClickCancelOrder={viewModel.onClickCancelOrder}
          onClickReorder={viewModel.onClickReorder}
          onSubmitSaveOrder={viewModel.onSubmitSaveOrder}
        />
      ) : null}

      <Modal
        openModal={viewModel.showProductDataModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductDataModal')}
      >
        <ProductDataForm product={viewModel.selectedWarehouseOrderProduct} onAmazon={viewModel.onAmazon} />
      </Modal>
    </>
  )
})
