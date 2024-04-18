import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxForm } from '@components/forms/box-form'
import { CheckPendingOrderForm } from '@components/forms/check-pending-order-form'
import { EditBoxForm } from '@components/forms/edit-box-form'
import { EditMultipleBoxesForm } from '@components/forms/edit-multiple-boxes-form'
import { GroupingBoxesForm } from '@components/forms/grouping-boxes-form'
import { ProductLotDataForm } from '@components/forms/product-lot-data-form/product-lot-data-form'
import { RequestToSendBatchForm } from '@components/forms/request-to-send-batch-form'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { MergeBoxesModal } from '@components/modals/merge-boxes-modal'
import { MyOrderModal } from '@components/modals/my-order-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { ProductAndBatchModal } from '@components/modals/product-and-batch-modal'
import { SetChipValueModal } from '@components/modals/set-chip-value-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'
import { RedistributeBox } from '@components/warehouse/reditstribute-box-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-in-stock-boxes-view.style'

import { disableSelectionCells } from './client-in-stock-boxes-view.constants'
import { ClientInStockBoxesViewModel } from './client-in-stock-boxes-view.model'
import { ViewHeader } from './view-header/view-header'

export const ClientInStockBoxesView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientInStockBoxesViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

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
        nameSearchValue={viewModel.nameSearchValue}
        curDestinationId={viewModel.curDestinationId}
        clientDestinations={viewModel.clientDestinations}
        selectedRows={viewModel.selectedRows}
        selectedBoxes={viewModel.selectedBoxes}
        onClickRequestToSendBatch={viewModel.onClickRequestToSendBatch}
        onClickMergeBtn={viewModel.onClickMergeBtn}
        onClickSplitBtn={viewModel.onClickSplitBtn}
        onClickEditBtn={viewModel.onClickEditBtn}
        onClickGroupingBtn={viewModel.onClickGroupingBtn}
        onClickReturnBoxesToStockBtn={viewModel.onClickReturnBoxesToStockBtn}
        onClickStorekeeperBtn={viewModel.onClickStorekeeperBtn}
        onClickDestinationBtn={viewModel.onClickDestinationBtn}
        onSearchSubmit={viewModel.onSearchSubmit}
        onClickWarehouseOrderButton={() => viewModel.onClickWarehouseOrderButton(viewModel.selectedBoxes?.[0])}
        onClickCurrentTariffsBtn={viewModel.onClickCurrentTariffsBtn}
      />

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          isRowSelectable={params =>
            params.row.isDraft === false &&
            params.row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE &&
            params.row.status !== BoxStatus.NEED_TO_UPDATE_THE_TARIFF
          }
          getRowClassName={getRowClassName}
          rowSelectionModel={viewModel.selectedBoxes}
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
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onColumnHeaderEnter={params => {
            viewModel.onHoverColumnField(params.field)
          }}
          onColumnHeaderLeave={viewModel.onLeaveColumnField}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onCellDoubleClick={params =>
            !disableSelectionCells.includes(params.field) && viewModel.setCurrentOpenedBox(params.row.originalData)
          }
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
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          requestStatus={viewModel.requestStatus}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          formItem={viewModel.boxesMy.find(box => box._id === viewModel.selectedBoxes.slice()[0])?.originalData}
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
          setAddNewBoxModal={value => viewModel.onModalRedistributeBoxAddNewBox(value)}
          selectedBox={
            viewModel.selectedBoxes.length &&
            viewModel.boxesMy.find(box => box._id === viewModel.selectedBoxes.slice()[0])?.originalData
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
          selectedBoxes={viewModel.boxesMy
            .filter(el => viewModel.selectedBoxes.includes(el._id))
            .map(box => box.originalData)}
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
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.boxesMy
            .filter(el => viewModel.selectedBoxes.includes(el._id))
            .map(box => box.originalData)}
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
          selectedBoxes={
            (viewModel.selectedBoxes.length &&
              viewModel.boxesMy
                .filter(box => viewModel.selectedBoxes.includes(box._id))
                ?.map(box => box.originalData)) ||
            []
          }
          requestStatus={viewModel.requestStatus}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
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
          selectedBoxes={viewModel.selectedBoxes}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          boxesMy={viewModel.boxesMy
            .filter(box => viewModel.selectedBoxes.includes(box._id))
            .map(box => box.originalData)}
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
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={viewModel.confirmModalSettings.onClickCancelBtn}
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

      <Modal openModal={viewModel.showSelectionStorekeeperAndTariffModal} setOpenModal={viewModel.openModalAndClear}>
        <SelectStorekeeperAndTariffForm
          showCheckbox
          removeDestinationRestriction={!viewModel.isCurrentTarrifsButton}
          storekeepers={
            viewModel.changeItem
              ? viewModel.storekeepersData.filter(el => el._id === viewModel.changeItem?.storekeeper._id)
              : viewModel.storekeepersData
          }
          curStorekeeperId={viewModel.changeItem?.storekeeper?._id}
          curTariffId={viewModel.changeItem?.logicsTariff?._id}
          destinationsData={viewModel.destinations}
          inNotifications={!viewModel.changeItem}
          total={!viewModel.changeItem}
          currentDestinationId={viewModel.changeItem?.destination?._id}
          currentVariationTariffId={viewModel.changeItem?.variationTariff?._id}
          onSubmit={(
            storekeeperId,
            tariffId,
            variationTariffId,
            destinationId,
            isSelectedDestinationNotValid,
            isSetCurrentDestination,
          ) =>
            viewModel.editTariff(
              viewModel.changeItem?._id,
              {
                logicsTariffId: tariffId,
                storekeeperId,
                variationTariffId,
                destinationId,
              },
              isSelectedDestinationNotValid,
              isSetCurrentDestination,
            )
          }
        />
      </Modal>

      {viewModel.showProductModal ? (
        <ProductAndBatchModal
          // @ts-ignore
          setOpenModal={() => viewModel.onTriggerOpenModal('showProductModal')}
          openModal={viewModel.showProductModal}
          currentSwitch={viewModel.productAndBatchModalSwitcherCondition}
          batches={viewModel.productBatches}
          getCurrentBatch={viewModel.getCurrBatch}
          currentBatch={viewModel.currentBatch}
          shops={viewModel.shopsData}
          selectedProduct={viewModel.selectedWarehouseOrderProduct}
          onChangeSwitcher={viewModel.onClickChangeProductAndBatchModalCondition}
          onClickMyOrderModal={viewModel.onClickMyOrderModal}
          onClickInTransferModal={viewModel.onClickInTransfer}
          onClickHsCode={viewModel.onClickHsCode}
        />
      ) : null}

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
        openModal={viewModel.showProductLotDataModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showProductLotDataModal')}
      >
        <ProductLotDataForm
          isTransfer
          userInfo={viewModel.userInfo}
          product={[viewModel.selectedWarehouseOrderProduct]}
          batchesData={viewModel.batchesData}
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

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
        />
      )}

      {viewModel.showSuccessInfoModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={viewModel.showSuccessInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessInfoModal')}
          title={viewModel.modalEditSuccessMessage}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showSuccessInfoModal')}
        />
      ) : null}

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

      {viewModel.showWarningInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        />
      ) : null}

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
    </>
  )
})
