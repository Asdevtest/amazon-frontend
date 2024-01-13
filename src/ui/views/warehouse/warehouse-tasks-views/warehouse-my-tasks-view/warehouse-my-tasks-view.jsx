import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { BuyerTypeTaskSelect } from '@components/shared/selects/buyer-type-task-select'
import { TaskPrioritySelector } from '@components/shared/task-priority-selector/task-priority-selector'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './warehouse-my-tasks-view.style'

import { WarehouseMyTasksViewModel } from './warehouse-my-tasks-view.model'

export const WarehouseMyTasksView = observer(({ history, location }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseMyTasksViewModel({ history, location }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params =>
    params.row.originalData.operationType === TaskOperationType.RECEIVE && params.row.barcode && styles.successRow

  return (
    <React.Fragment>
      <div>
        <div className={styles.headerWrapper}>
          <TaskPrioritySelector
            currentPriority={viewModel.curTaskPriority}
            handleActivePriority={viewModel.onClickTaskPriorityBtn}
          />
          <Button
            variant="contained"
            disabled={
              !viewModel.selectedTasks.length ||
              viewModel.selectedTasks.length > 1 ||
              viewModel.getCurrentData().filter(el => viewModel.selectedTasks.includes(el.id))[0]?.originalData
                .operationType !== TaskOperationType.RECEIVE
            }
            onClick={viewModel.onClickReportBtn}
          >
            {t(TranslationKey['Download task file'])}
            <FileDownloadIcon />
          </Button>
        </div>

        <div className={styles.headerWrapper}>
          <BuyerTypeTaskSelect
            curTaskType={viewModel.curTaskType}
            onClickOperationTypeBtn={viewModel.onClickOperationTypeBtn}
          />

          <SearchInput
            value={viewModel.nameSearchValue}
            inputClasses={styles.searchInput}
            placeholder={t(TranslationKey['Search by ASIN, Order ID, Item, Track number'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>
        <div className={styles.tableWrapper}>
          <CustomDataGrid
            checkboxSelection
            disableRowSelectionOnClick
            localeText={getLocalizationByLanguageTag()}
            getRowClassName={getRowClassName}
            rowCount={viewModel.rowCount}
            sortingMode="client"
            paginationMode="client"
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.getCurrentData()}
            getRowHeight={() => 'auto'}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={params => viewModel.onClickResolveBtn(params.row.originalData._id)}
          />
        </div>
      </div>

      <Modal
        openModal={viewModel.showEditPriorityData}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditPriorityData')}
      >
        <EditTaskPriorityModal
          data={viewModel.editPriorityData}
          handleClose={() => viewModel.onTriggerOpenModal('showEditPriorityData')}
          onSubmitHandler={viewModel.updateTaskPriority}
        />
      </Modal>

      <Modal
        missClickModalOn
        dialogClassName={styles.resolveTaskModalContent}
        openModal={viewModel.showEditTaskModal}
        setOpenModal={viewModel.onTriggerEditTaskModal}
      >
        <EditTaskModal
          requestStatus={viewModel.requestStatus}
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          task={viewModel.selectedTask}
          showEditBoxModal={viewModel.showEditBoxModal}
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          onTriggerShowEditBoxModal={viewModel.onTriggerShowEditBoxModal}
          onClickOpenCloseModal={viewModel.onTriggerEditTaskModal}
          onSetBarcode={viewModel.onTriggerShowBarcodeModal}
          onEditBox={viewModel.onTriggerShowEditBoxModal}
          onClickSolveTask={viewModel.onClickSolveTask}
        />
      </Modal>

      <WarningInfoModal
        openModal={viewModel.showNoDimensionsErrorModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')}
        title={t(TranslationKey['Enter dimensions'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showNoDimensionsErrorModal')
        }}
      />

      <ConfirmationModal
        isWarning
        withComment
        commentTitleText={t(TranslationKey['Cancel task'])}
        commentLabelText={t(TranslationKey['Reason for canceling the task'])}
        openModal={viewModel.showConfirmModal}
        title={t(TranslationKey['Confirm action'])}
        message={t(TranslationKey['After confirmation, the task will be cancelled. Confirm?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        commentCancelBtnText={t(TranslationKey.Cancel)}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        onClickSuccessBtn={viewModel.onClickConfirmCancelTask}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
    </React.Fragment>
  )
})
