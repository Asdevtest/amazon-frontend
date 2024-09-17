import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-my-batches-view.style'

import { WarehouseAwaitingBatchesViewModel } from './warehouse-my-batches-view.model'

interface WarehouseMyBatchesViewProps {
  isSentBatches: boolean
}

export const WarehouseMyBatchesView: FC<WarehouseMyBatchesViewProps> = observer(({ isSentBatches }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WarehouseAwaitingBatchesViewModel(isSentBatches), [])

  const selectedRowsString =
    '№ ' +
    viewModel.currentData
      .filter(batch => viewModel.selectedRows.includes(batch._id))
      .map(batch => batch.humanFriendlyId)
      .join(', ')
  const disabledConfirmSendButton =
    !viewModel.selectedRows.length || viewModel.isInvalidTariffBoxSelected || viewModel.isNeedConfirmPriceBoxSelected

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        {isSentBatches ? (
          <CustomButton size="large" onClick={viewModel.onTriggerArchive}>
            {t(TranslationKey[viewModel.isArchive ? 'Actual batches' : 'Open archive'])}
          </CustomButton>
        ) : (
          <div className={styles.flexRow}>
            <CustomButton
              size="large"
              type="primary"
              disabled={disabledConfirmSendButton}
              title={t(TranslationKey['After confirmation it will be impossible to return the batch'])}
              onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
            >
              {t(TranslationKey['Confirm send to batch'])}
            </CustomButton>

            <CustomButton
              size="large"
              type="primary"
              disabled={viewModel.selectedRows.length !== 1}
              title={t(TranslationKey['Add/remove a box or files to a batch'])}
              onClick={() => viewModel.onClickAddOrEditBatch(false)}
            >
              {t(TranslationKey['Edit batch'])}
            </CustomButton>
          </div>
        )}

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by ASIN, Title, Batch ID, Order ID"
          onSearch={viewModel.onSearchSubmit}
        />

        {isSentBatches ? null : (
          <CustomButton
            size="large"
            type="primary"
            icon={<FiPlus />}
            title={t(TranslationKey['Open a form to create a new batch'])}
            onClick={() => viewModel.onClickAddOrEditBatch(true)}
          >
            {t(TranslationKey['Create a batch'])}
          </CustomButton>
        )}
      </div>

      <CustomDataGrid
        disableRowSelectionOnClick
        checkboxSelection={!isSentBatches}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        rowSelectionModel={viewModel.selectedRows}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        getRowId={({ _id }: GridRowModel) => _id}
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
        rowCount={viewModel.rowCount}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onRowDoubleClick={({ row }: GridRowModel) => viewModel.setCurrentOpenedBatch(row?._id)}
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showAddOrEditBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
      >
        <AddOrEditBatchForm
          // @ts-ignore
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          batchToEdit={viewModel.curBatch}
          boxesData={viewModel.boxesData}
          onClose={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
          onSubmit={viewModel.onSubmitAddOrEditBatch}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={false}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={`${t(TranslationKey['Send batch'])} ${selectedRowsString}?`}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.onClickConfirmSendToBatchBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showBatchInfoModal ? (
        <BatchInfoModal
          // @ts-ignore
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
          batch={viewModel.curBatch}
          patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
        />
      ) : null}
    </div>
  )
})
