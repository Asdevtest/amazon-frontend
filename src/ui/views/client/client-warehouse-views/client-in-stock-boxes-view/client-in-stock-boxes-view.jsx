import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxViewForm } from '@components/forms/box-view-form'
import { EditBoxForm } from '@components/forms/edit-box-form'
import { EditMultipleBoxesForm } from '@components/forms/edit-multiple-boxes-form'
import { GroupingBoxesForm } from '@components/forms/grouping-boxes-form'
import { RequestToSendBatchForm } from '@components/forms/request-to-send-batch-form'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { MergeBoxesModal } from '@components/modals/merge-boxes-modal'
import { SetChipValueModal } from '@components/modals/set-chip-value-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'
import { RedistributeBox } from '@components/warehouse/reditstribute-box-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './client-in-stock-boxes-view.style'

import { ClientInStockBoxesViewModel } from './client-in-stock-boxes-view.model'

export const ClientInStockBoxesView = observer(props => {
  const [viewModel] = useState(() => new ClientInStockBoxesViewModel({ history: props.history }))
  const { classes: styles } = useStyles()
  const disableSelectionCells = ['prepId']

  const getRowClassName = params =>
    (params.row.isDraft === true ||
      params.row.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE ||
      params.row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF) &&
    styles.isDraftRow

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const renderButtons = () => {
    const disable = viewModel.selectedRows.some(row => row.status === BoxStatus.REQUESTED_SEND_TO_BATCH)

    return (
      <React.Fragment>
        <Button
          tooltipInfoContent={t(TranslationKey['Form for requesting the shipment of boxes in a batch'])}
          disabled={!viewModel.selectedBoxes.length || disable}
          onClick={viewModel.onClickRequestToSendBatch}
        >
          {t(TranslationKey['Send batch'])}
        </Button>

        <Button
          tooltipInfoContent={t(TranslationKey['Form for merging several boxes'])}
          disabled={
            viewModel.selectedBoxes.length <= 1 /* || isMasterBoxSelected*/ || viewModel.isHaveRequestSendToBatch
          }
          onClick={viewModel.onClickMergeBtn}
        >
          {t(TranslationKey.Merge)}
        </Button>

        <Button
          disabled={viewModel.selectedBoxes.length !== 1 || viewModel.isHaveRequestSendToBatch}
          tooltipInfoContent={t(TranslationKey['Form for distributing to multiple boxes'])}
          onClick={viewModel.onClickSplitBtn}
        >
          {t(TranslationKey.Redistribute)}
        </Button>
        <Button
          tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
          disabled={!viewModel.selectedBoxes.length || viewModel.isHaveRequestSendToBatch}
          onClick={viewModel.onClickEditBtn}
        >
          {t(TranslationKey.Edit)}
        </Button>

        <Button
          disabled={!viewModel.selectedBoxes.length || viewModel.isHaveRequestSendToBatch}
          onClick={viewModel.onClickGroupingBtn}
        >
          {t(TranslationKey.Grouping)}
        </Button>

        <Button
          disabled={!viewModel.selectedBoxes.length || !viewModel.isChoosenOnlySendToBatchBoxes}
          onClick={viewModel.onClickReturnBoxesToStockBtn}
        >
          {t(TranslationKey['Return to stock'])}
        </Button>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div>
        <div className={styles.topHeaderBtnsWrapper}>
          <div className={styles.boxesFiltersWrapper}>
            <CustomSwitcher
              switchMode={'medium'}
              condition={viewModel.currentStorekeeperId}
              switcherSettings={[
                ...viewModel.storekeepersData
                  .filter(storekeeper => storekeeper.boxesCount !== 0)
                  .sort((a, b) => a.name?.localeCompare(b.name))
                  .map(storekeeper => ({ label: () => storekeeper.name, value: storekeeper._id })),
                { label: () => t(TranslationKey['All warehouses']), value: undefined },
              ]}
              changeConditionHandler={viewModel.onClickStorekeeperBtn}
            />
          </div>

          <SearchInput
            key={'client_warehouse_search_input'}
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box'])}
            startText={viewModel.nameSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={styles.boxesFiltersWrapper}>
          <CustomSwitcher
            switchMode={'medium'}
            condition={viewModel.curDestinationId}
            switcherSettings={[
              ...viewModel.clientDestinations
                .filter(destination => destination.boxesCount !== 0)
                .sort((a, b) => a.name?.localeCompare(b.name))
                .map(destination => ({ label: () => destination?.name, value: destination?._id })),

              { label: () => t(TranslationKey.Undistributed), value: null },
              { label: () => t(TranslationKey.All), value: undefined },
            ]}
            changeConditionHandler={viewModel.onClickDestinationBtn}
          />
        </div>

        <div className={styles.btnsWrapper}>
          <div className={styles.leftBtnsWrapper}>{renderButtons()}</div>
          <Button disabled={!viewModel.storekeepersData} onClick={() => viewModel.onClickCurrentTariffsBtn()}>
            {t(TranslationKey['Current tariffs'])}
          </Button>
        </div>

        <div className={styles.tasksWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            propsToRerender={{ onHover: viewModel.onHover, unitsOption: viewModel.unitsOption }}
            localeText={getLocalizationByLanguageTag()}
            isRowSelectable={params =>
              params.row.isDraft === false &&
              params.row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE &&
              params.row.status !== BoxStatus.NEED_TO_UPDATE_THE_TARIFF
            }
            columnHeaderHeight={65}
            getRowClassName={getRowClassName}
            rowSelectionModel={viewModel.selectedBoxes}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
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
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
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
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
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
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
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
              toJS(viewModel.boxesMy.filter(box => viewModel.selectedBoxes.includes(box._id)))?.map(
                box => box.originalData,
              )) ||
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
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          boxesMy={viewModel.boxesMy.map(box => box.originalData)}
          setCurrentOpenedBox={viewModel.setCurrentOpenedBox}
          onClickSendBoxesToBatch={viewModel.onClickSendBoxesToBatch}
          onClickRemoveBoxFromBatch={viewModel.onClickRemoveBoxFromBatch}
        />
      </Modal>

      <ConfirmationModal
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

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxViewForm
          userInfo={viewModel.userInfo}
          box={viewModel.curBox}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
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
          RemoveDestinationRestriction={!viewModel.isCurrentTarrifsButton}
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
          onSubmit={(storekeeperId, tariffId, variationTariffId, destinationId, isSelectedDestinationNotValid) =>
            viewModel.editTariff(
              viewModel.changeItem?._id,
              {
                logicsTariffId: tariffId,
                storekeeperId,
                variationTariffId,
                destinationId,
              },
              isSelectedDestinationNotValid,
            )
          }
        />
      </Modal>

      <SuccessInfoModal
        openModal={viewModel.showSuccessInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showSuccessInfoModal')}
        title={viewModel.modalEditSuccessMessage}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          viewModel.onTriggerOpenModal('showSuccessInfoModal')
        }}
      />

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

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />

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
    </React.Fragment>
  )
})
