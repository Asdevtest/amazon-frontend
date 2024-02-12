import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditBatchForm } from '@components/forms/add-or-edit-batch-form'
import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { EditHSCodeModal } from '@components/modals/edit-hs-code-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './warehouse-awaiting-batches-view.style'

import { WarehouseAwaitingBatchesViewModel } from './warehouse-awaiting-batches-view.model'

export const WarehouseAwaitingBatchesView = observer(props => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseAwaitingBatchesViewModel({ history: props.history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const selectedBatchesString =
    '№ ' +
    viewModel.currentData
      .filter(batch => viewModel.selectedBatches.includes(batch._id))
      .map(batch => batch.humanFriendlyId)
      .join(', ')

  return (
    <>
      <div>
        <div className={styles.btnsWrapper}>
          <div className={styles.leftBtnsWrapper}>
            <Button
              disabled={
                !viewModel.selectedBatches.length ||
                viewModel.isInvalidTariffBoxSelected ||
                viewModel.isNeedConfirmPriceBoxSelected
              }
              tooltipAttentionContent={
                (viewModel.isInvalidTariffBoxSelected &&
                  t(TranslationKey['Selected a batch contains a box with an invalid tariff'])) ||
                (viewModel.isNeedConfirmPriceBoxSelected &&
                  t(TranslationKey['Selected lot contains a box for which you need to confirm the price change']))
              }
              tooltipInfoContent={t(TranslationKey['After confirmation it will be impossible to return the batch'])}
              className={styles.batchBtn}
              onClick={() => viewModel.onTriggerOpenModal('showConfirmModal')}
            >
              {t(TranslationKey['Confirm send to batch'])}
            </Button>

            <Button
              disabled={viewModel.selectedBatches.length !== 1}
              className={styles.editBtn}
              tooltipInfoContent={t(TranslationKey['Add/remove a box or files to a batch'])}
              onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: false })}
            >
              {t(TranslationKey['Edit batch'])}
            </Button>
          </div>
          <SearchInput
            inputClasses={styles.searchInput}
            value={viewModel.nameSearchValue}
            placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])} // В ОТРАВЛ
            onSubmit={viewModel.onSearchSubmit}
          />

          <Button
            success
            tooltipInfoContent={t(TranslationKey['Open a form to create a new batch'])}
            className={styles.createBtn}
            onClick={() => viewModel.onClickAddOrEditBatch({ isAdding: true })}
          >
            <AddIcon />
            {t(TranslationKey['Create a batch'])}
          </Button>
        </div>
        <div className={styles.datagridWrapper}>
          <CustomDataGrid
            checkboxSelection
            useResizeContainer
            disableRowSelectionOnClick
            sortingMode="client"
            paginationMode="client"
            localeText={getLocalizationByLanguageTag()}
            rowSelectionModel={viewModel.selectedBatches}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.currentData}
            getRowHeight={() => 'auto'}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
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
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row.originalData._id)}
            onRowSelectionModelChange={viewModel.onSelectionModel}
          />
        </div>
      </div>

      <Modal
        openModal={viewModel.showAddOrEditBatchModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
      >
        <AddOrEditBatchForm
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          batchToEdit={viewModel.getCurrentData().find(batch => batch.id === viewModel.selectedBatches.slice()[0])}
          boxesData={viewModel.boxesData}
          onClose={() => viewModel.onTriggerOpenModal('showAddOrEditBatchModal')}
          onSubmit={viewModel.onSubmitAddOrEditBatch}
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
      <ConfirmationModal
        isWarning={viewModel.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={`${t(TranslationKey['Send batch'])} ${selectedBatchesString}?`}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.onClickConfirmSendToBatchBtn}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
      <BatchInfoModal
        volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
        openModal={viewModel.showBatchInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
        batch={viewModel.curBatch}
        userInfo={viewModel.userInfo}
        patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
        onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
        onClickHsCode={viewModel.onClickHsCode}
      />
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

      {viewModel.showCircularProgress ? <CircularProgressWithLabel /> : null}
    </>
  )
})
