import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { HeaderTable } from '@components/table/header-table/header-table'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { ClientAwaitingBatchesViewModel } from './client-awaiting-batches-view.model'

export const ClientAwaitingBatchesView = observer(() => {
  const [viewModel] = useState(() => new ClientAwaitingBatchesViewModel())

  return (
    <div className="viewWrapper">
      <HeaderTable viewModel={viewModel} />

      <div className="tableWrapper">
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          rowSelectionModel={viewModel.selectedRows}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          pinnedColumns={viewModel.pinnedColumns}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
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
              },
            },
          }}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row._id)}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

      <Modal
        openModal={viewModel.showAddOrEditBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
      >
        <AddOrEditBatchForm
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          batchToEdit={viewModel.curBatch}
          boxesData={viewModel.boxesData}
          onClose={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
          onSubmit={viewModel.onSubmitAddOrEditBatch}
        />
      </Modal>

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

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to cancel the send?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.onClickCancelSendToBatchBtn}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
