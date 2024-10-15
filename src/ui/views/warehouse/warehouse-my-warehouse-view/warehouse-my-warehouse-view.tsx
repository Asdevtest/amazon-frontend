import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridRowClassNameParams, GridRowModel, GridRowParams } from '@mui/x-data-grid-premium'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { AddOrEditHsCodeInBox } from '@components/forms/add-or-edit-hs-code-in-box-form'
import { EditBoxStorekeeperForm } from '@components/forms/edit-box-storekeeper-form'
import { EditBoxTasksForm } from '@components/forms/edit-box-tasks-form'
import { EditMultipleBoxesForm } from '@components/forms/edit-multiple-boxes-form'
import { GroupingBoxesForm } from '@components/forms/grouping-boxes-form'
import { MoveBoxToBatchForm } from '@components/forms/move-box-to-batch-form'
import { BoxModal } from '@components/modals/box-modal'
import { MergeBoxesModal } from '@components/modals/merge-boxes-modal'
import { StorekeeperRedistributeBox } from '@components/modals/storekeeper'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-my-warehouse-view.style'

import { ActionButtons } from './action-buttons'
import { WarehouseMyWarehouseViewModel } from './warehouse-my-warehouse-view.model'

export const WarehouseMyWarehouseView = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new WarehouseMyWarehouseViewModel(), [])

  const getRowClassName = (params: GridRowClassNameParams) => params.row.isDraft && styles.isDraftRow
  const getIsRowSelectable = (params: GridRowParams) => {
    return (
      !params.row.isDraft &&
      params.row.status !== BoxStatus.REQUESTED_SEND_TO_BATCH &&
      params.row.status !== BoxStatus.IN_BATCH
    )
  }

  const disableSelectionCells = ['prepId']

  return (
    <>
      <div className={styles.headerWrapper}>
        <ActionButtons
          selectedBoxes={viewModel.selectedRows}
          onEditBox={viewModel.onEditBox}
          onClickMergeBtn={viewModel.onClickMergeBtn}
          onClickSplitBtn={viewModel.onClickSplitBtn}
          onClickGroupingBtn={viewModel.onClickGroupingBtn}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          wrapperClassName={styles.searchInput}
          placeholder="Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box"
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        isRowSelectable={getIsRowSelectable}
        getRowClassName={getRowClassName}
        rowCount={viewModel.rowCount}
        getRowId={({ _id }: GridRowModel) => _id}
        rowSelectionModel={viewModel.selectedRows}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        slotProps={{
          columnMenu: viewModel.columnMenuSettings,
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
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
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onCellDoubleClick={(params: GridRowModel) =>
          !disableSelectionCells.includes(params.field) && viewModel.setCurrentOpenedBox(params.row)
        }
      />

      <Modal
        openModal={viewModel.showBoxMoveToBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxMoveToBatchModal')}
      >
        <MoveBoxToBatchForm
          box={viewModel.curBoxToMove}
          batches={viewModel.batches}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBoxMoveToBatchModal')}
          onSubmit={viewModel.onSubmitMoveBoxToBatch}
          onSubmitCreateBatch={viewModel.onSubmitCreateBatch}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddBatchModal')}
      >
        {/* @ts-ignore  */}
        <AddOrEditBatchForm
          sourceBox={viewModel.sourceBoxForBatch}
          boxesData={viewModel.boxesData}
          onClose={() => viewModel.onTriggerOpenModal('showAddBatchModal')}
          onSubmit={viewModel.onSubmitAddBatch}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showFullEditBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showFullEditBoxModal')}
      >
        <EditBoxStorekeeperForm
          // @ts-ignore
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          requestStatus={viewModel.requestStatus}
          formItem={viewModel.curBox}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onSubmit={viewModel.onClickSubmitEditBox}
          onTriggerOpenModal={() => viewModel.onTriggerOpenModal('showFullEditBoxModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showBoxViewModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')}
      >
        <BoxModal boxId={viewModel.curBox} onToggleModal={() => viewModel.onTriggerOpenModal('showBoxViewModal')} />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showEditMultipleBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditMultipleBoxesModal')}
      >
        <EditMultipleBoxesForm
          showCheckbox
          userInfo={viewModel.userInfo}
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
        openModal={viewModel.showAddOrEditHsCodeInBox}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditHsCodeInBox')}
      >
        <AddOrEditHsCodeInBox
          box={viewModel.curBox}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditHsCodeInBox')}
          startData={undefined}
          onSubmit={viewModel.onSubmitAddOrEditHsCode}
        />
      </Modal>
      <Modal openModal={viewModel.showEditBoxModal} setOpenModal={viewModel.onTriggerShowEditBoxModal}>
        {/* @ts-ignore */}
        <EditBoxTasksForm
          isInStorekeeperWarehouse
          setEditModal={viewModel.onTriggerShowEditBoxModal}
          storekeeperWarehouseSubmit={viewModel.onSubmitEditBox}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showMergeBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showMergeBoxModal')}
      >
        <MergeBoxesModal
          userInfo={viewModel.userInfo}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.currentData.filter(box => viewModel.selectedRows.includes(box._id))}
          requestStatus={viewModel.requestStatus}
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          setOpenModal={() => viewModel.onTriggerOpenModal('showMergeBoxModal')}
          onRemoveBoxFromSelected={viewModel.onRemoveBoxFromSelected}
          onSubmit={viewModel.onClickConfirmMerge}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showRedistributeBoxModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRedistributeBoxModal')}
      >
        <StorekeeperRedistributeBox
          showEditBoxModalR={viewModel.showEditBoxModalR}
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          requestStatus={viewModel.requestStatus}
          selectedBox={
            viewModel.selectedRows.length &&
            viewModel.currentData.find(box => box._id === viewModel.selectedRows.slice()[0])
          }
          destinationsFavourites={viewModel.destinationsFavourites}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          onRedistribute={viewModel.onClickConfirmSplit}
          onTriggerOpenModal={viewModel.onTriggerOpenModal}
          onEditBox={viewModel.onTriggerShowEditBoxModalR}
          onTriggerShowEditBoxModalR={viewModel.onTriggerShowEditBoxModalR}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showGroupingBoxesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showGroupingBoxesModal')}
      >
        <GroupingBoxesForm
          // @ts-ignore
          destinations={viewModel.destinations}
          storekeepers={viewModel.storekeepersData}
          selectedBoxes={viewModel.currentData.filter(el => viewModel.selectedRows.includes(el._id))}
          onSubmit={viewModel.onClickSubmitGroupingBoxes}
          onCloseModal={() => viewModel.onTriggerOpenModal('showGroupingBoxesModal')}
        />
      </Modal>
    </>
  )
})
