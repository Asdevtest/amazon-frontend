import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-my-batches-view.style'

import { WarehouseAwaitingBatchesViewModel } from './warehouse-my-batches-view.model'

interface WarehouseMyBatchesViewProps {
  isSentBatches: boolean
}

export const WarehouseMyBatchesView: FC<WarehouseMyBatchesViewProps> = observer(({ isSentBatches }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseAwaitingBatchesViewModel(isSentBatches))

  const selectedRowsString =
    '№ ' +
    viewModel.currentData
      .filter(batch => viewModel.selectedRows.includes(batch._id))
      .map(batch => batch.humanFriendlyId)
      .join(', ')
  const disabledConfirmSendButton =
    !viewModel.selectedRows.length || viewModel.isInvalidTariffBoxSelected || viewModel.isNeedConfirmPriceBoxSelected
  const tooltipAttentionContentConfirmSendButton = viewModel.isInvalidTariffBoxSelected
    ? t(TranslationKey['Selected a batch contains a box with an invalid tariff'])
    : viewModel.isNeedConfirmPriceBoxSelected
    ? t(TranslationKey['Selected lot contains a box for which you need to confirm the price change'])
    : ''

  return (
    <>
      <div className={styles.flexRow}>
        {isSentBatches ? (
          <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onTriggerArchive}>
            {viewModel.isArchive ? t(TranslationKey['Actual batches']) : t(TranslationKey['Open archive'])}
          </Button>
        ) : (
          <div className={styles.flexRow}>
            <Button
              disabled={disabledConfirmSendButton}
              tooltipAttentionContent={tooltipAttentionContentConfirmSendButton}
              tooltipInfoContent={t(TranslationKey['After confirmation it will be impossible to return the batch'])}
              onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
            >
              {t(TranslationKey['Confirm send to batch'])}
            </Button>

            <Button
              disabled={viewModel.selectedRows.length !== 1}
              tooltipInfoContent={t(TranslationKey['Add/remove a box or files to a batch'])}
              onClick={() => viewModel.onClickAddOrEditBatch(false)}
            >
              {t(TranslationKey['Edit batch'])}
            </Button>
          </div>
        )}

        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
          onSubmit={viewModel.onSearchSubmit}
        />

        {isSentBatches ? (
          <div />
        ) : (
          <Button
            styleType={ButtonStyle.SUCCESS}
            tooltipInfoContent={t(TranslationKey['Open a form to create a new batch'])}
            onClick={() => viewModel.onClickAddOrEditBatch(true)}
          >
            <FiPlus />
            {t(TranslationKey['Create a batch'])}
          </Button>
        )}
      </div>

      <div className={styles.tableWrapper}>
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
      </div>

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
    </>
  )
})
