import { observer } from 'mobx-react'
import { useState } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BoxForm } from '@components/forms/box-form'
import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { EditBoxForm } from '@components/forms/edit-box-form'
import { EditMultipleBoxesForm } from '@components/forms/edit-multiple-boxes-form'
import { GroupingBoxesForm } from '@components/forms/grouping-boxes-form'
import { ProductDataForm } from '@components/forms/product-data-form'
import { RequestToSendBatchForm } from '@components/forms/request-to-send-batch-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { MergeBoxesModal } from '@components/modals/merge-boxes-modal'
import { MyOrderModal } from '@components/modals/my-order-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductAndBatchModal } from '@components/modals/product-and-batch-modal'
import { SetChipValueModal } from '@components/modals/set-chip-value-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'
import { RedistributeBox } from '@components/warehouse/reditstribute-box-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { TariffModal } from '@typings/enums/tariff-modal'

import { useStyles } from './client-in-stock-boxes-view.style'

import { disableSelectionCells } from './client-in-stock-boxes-view.constants'
import { ClientInStockBoxesViewModel } from './client-in-stock-boxes-view.model'
import { ViewHeader } from './view-header/view-header'

export const ClientInStockBoxesView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientInStockBoxesViewModel({ history }))

  const getRowClassName = params =>
    (params.row.isDraft === true ||
      params.row.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE ||
      params.row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF) &&
    styles.isDraftRow

  return (
    <>
      <ViewHeader
        isHaveRequestSendToBatch={viewModel.isHaveRequestSendToBatch}
        isChoosenOnlySendToBatchBoxes={viewModel.isChoosenOnlySendToBatchBoxes}
        currentStorekeeperId={viewModel.currentStorekeeperId}
        storekeepersData={viewModel.storekeepersData}
        nameSearchValue={viewModel.currentSearchValue}
        curDestinationId={viewModel.curDestinationId}
        clientDestinations={viewModel.clientDestinations}
        selectedRows={viewModel.selectedRows}
        onClickRequestToSendBatch={viewModel.onClickRequestToSendBatch}
        onClickMergeBtn={viewModel.onClickMergeBtn}
        onClickSplitBtn={viewModel.onClickSplitBtn}
        onClickEditBtn={viewModel.onClickEditBtn}
        onClickGroupingBtn={viewModel.onClickGroupingBtn}
        onClickReturnBoxesToStockBtn={viewModel.onClickReturnBoxesToStockBtn}
        onClickStorekeeperBtn={viewModel.onClickStorekeeperBtn}
        onClickDestinationBtn={viewModel.onClickDestinationBtn}
        onSearchSubmit={viewModel.onSearchSubmit}
        onClickWarehouseOrderButton={() => viewModel.onClickWarehouseOrderButton(viewModel.selectedRows?.[0])}
        onClickCurrentTariffsBtn={viewModel.onClickCurrentTariffsBtn}
      />

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          pinnedColumns={viewModel.pinnedColumns}
          isRowSelectable={params =>
            params.row.isDraft === false &&
            params.row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE &&
            params.row.status !== BoxStatus.NEED_TO_UPDATE_THE_TARIFF
          }
          getRowClassName={getRowClassName}
          rowSelectionModel={viewModel.selectedRows}
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={row => row._id}
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
            },
          }}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onColumnHeaderLeave={viewModel.onLeaveColumnField}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onCellDoubleClick={params =>
            !disableSelectionCells.includes(params.field) && viewModel.setCurrentOpenedBox(params.row)
          }
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

      <Modal
        missClickModalOn
        openModal={viewModel.showEditBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditBoxModal')}
      >
        <EditBoxForm
          showCheckbox
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          requestStatus={viewModel.requestStatus}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          formItem={viewModel.currentData.find(box => box._id === viewModel.selectedRows.slice()[0])}
          onSubmit={viewModel.onClickConfirmCreateChangeTasks}
          onTriggerOpenModal={() => viewModel.onTriggerOpenModal('showEditBoxModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showRedistributeBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRedistributeBoxModal')}
      >
        <RedistributeBox
          showCheckbox
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          requestStatus={viewModel.requestStatus}
          addNewBoxModal={viewModel.showRedistributeBoxAddNewBoxModal}
          selectedBox={
            viewModel.selectedRows.length &&
            viewModel.currentData.find(box => box._id === viewModel.selectedRows.slice()[0])
          }
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onRedistribute={viewModel.onClickConfirmCreateSplitTasks}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showEditMultipleBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditMultipleBoxesModal')}
      >
        <EditMultipleBoxesForm
          showCheckbox
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.currentData.filter(el => viewModel.selectedRows.includes(el._id))}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onSubmit={viewModel.onClickSubmitEditMultipleBoxes}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditMultipleBoxesModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showGroupingBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showGroupingBoxesModal')}
      >
        <GroupingBoxesForm
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.currentData.filter(el => viewModel.selectedRows.includes(el._id))}
          onSubmit={viewModel.onClickSubmitGroupingBoxes}
          onCloseModal={() => viewModel.onTriggerOpenModal('showGroupingBoxesModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showMergeBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showMergeBoxModal')}
      >
        <MergeBoxesModal
          showCheckbox
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.currentData.filter(box => viewModel.selectedRows.includes(box._id))}
          requestStatus={viewModel.requestStatus}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={SettingsModel.setDestinationsFavouritesItem}
          setOpenModal={() => viewModel.onTriggerOpenModal('showMergeBoxModal')}
          onRemoveBoxFromSelected={viewModel.onRemoveBoxFromSelected}
          onSubmit={viewModel.onClickConfirmCreateMergeTasks}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showRequestToSendBatchModal}
        setOpenModal={viewModel.triggerRequestToSendBatchModal}
      >
        <RequestToSendBatchForm
          storekeepersData={viewModel.storekeepersData}
          closeModal={viewModel.triggerRequestToSendBatchModal}
          boxesDeliveryCosts={viewModel.boxesDeliveryCosts}
          selectedBoxes={viewModel.selectedRows}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          boxesMy={viewModel.currentData.filter(box => viewModel.selectedRows.includes(box._id))}
          setCurrentOpenedBox={viewModel.setCurrentOpenedBox}
          onClickSendBoxesToBatch={viewModel.onClickSendBoxesToBatch}
          onClickRemoveBoxFromBatch={viewModel.onClickRemoveBoxFromBatch}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
        />
      ) : null}
      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          onToggleModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
          onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetShippingLabelModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSetShippingLabelModal')}
      >
        <SetShippingLabelModal
          requestStatus={viewModel.requestStatus}
          item={viewModel.selectedBox}
          onClickSaveShippingLabel={viewModel.onClickSaveShippingLabel}
          onCloseModal={() => viewModel.onTriggerOpenModal('showSetShippingLabelModal')}
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

      {viewModel.showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          tariffModalType={TariffModal[viewModel.changeItem ? 'WAREHOUSE' : 'TARIFFS']}
          isTariffsSelect={viewModel.changeItem}
          isHideCalculation={!viewModel.changeItem}
          openModal={viewModel.showSelectionStorekeeperAndTariffModal}
          boxId={viewModel.changeItem?._id}
          setOpenModal={viewModel.openModalAndClear}
          onClickSubmit={viewModel.editTariff}
        />
      ) : null}

      <Modal
        openModal={viewModel.showProductModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductModal')}
      >
        <ProductAndBatchModal
          openModal={viewModel.showProductModal}
          currentSwitch={viewModel.productAndBatchModalSwitcherCondition}
          batches={viewModel.productBatches}
          getCurrentBatch={viewModel.getCurrBatch}
          currentBatch={viewModel.currentBatch}
          shops={viewModel.shopsData}
          selectedProduct={viewModel.selectedWarehouseOrderProduct}
          onChangeSwitcher={viewModel.onClickChangeProductAndBatchModalCondition}
          onClickMyOrderModal={viewModel.onClickMyOrderModal}
          onOpenProductDataModal={viewModel.onOpenProductDataModal}
          onClickHsCode={viewModel.onClickHsCode}
        />
      </Modal>

      {viewModel.showMyOrderModal ? (
        <MyOrderModal
          isClient
          order={viewModel.order}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
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

      <Modal
        missClickModalOn
        openModal={viewModel.showOrderModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showOrderModal')}
      >
        <OrderProductModal
          reorderOrdersData={viewModel.reorderOrdersData}
          platformSettings={viewModel.platformSettings}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onDoubleClickBarcode={viewModel.onDoubleClickBarcode}
          onSubmit={viewModel.onConfirmSubmitOrderProductModal}
        />
      </Modal>

      <Modal
        openModal={viewModel.showSetChipValueModal}
        setOpenModal={() => {
          viewModel.onTriggerOpenModal('showSetChipValueModal')
          viewModel.onCloseShippingLabelModal()
        }}
      >
        <SetChipValueModal
          title={t(TranslationKey['Set FBA shipment'])}
          sourceValue={viewModel.selectedBox?.fbaShipment}
          onSubmit={viewModel.onClickSaveFbaShipment}
          onCloseModal={() => {
            viewModel.onTriggerOpenModal('showSetChipValueModal')
            viewModel.onCloseShippingLabelModal()
          }}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditPriorityData}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditPriorityData')}
      >
        <EditTaskPriorityModal
          withSelect
          data={viewModel.editPriorityData}
          handleClose={() => viewModel.onTriggerOpenModal('showEditPriorityData')}
          onSubmitHandler={viewModel.updateTaskPriority}
        />
      </Modal>

      {viewModel.showProgress && <CircularProgressWithLabel />}

      <Modal
        openModal={viewModel.showProductDataModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductDataModal')}
      >
        <ProductDataForm product={viewModel.selectedWarehouseOrderProduct} onAmazon={viewModel.onAmazon} />
      </Modal>
    </>
  )
})
