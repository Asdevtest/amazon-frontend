import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { BsDownload } from 'react-icons/bs'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'
import { BuyerTypeTaskSelect } from '@components/shared/selects/buyer-type-task-select'
import { TaskPrioritySelector } from '@components/shared/task-priority-selector/task-priority-selector'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-my-tasks-view.style'

import { WarehouseMyTasksViewModel } from './warehouse-my-tasks-view.model'

export const WarehouseMyTasksView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new WarehouseMyTasksViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params =>
    params.row.originalData.operationType === TaskOperationType.RECEIVE && params.row.barcode && styles.successRow

  return (
    <div className="viewWrapper">
      <div className={styles.headerWrapper}>
        <TaskPrioritySelector
          currentPriority={viewModel.curTaskPriority}
          onActivePriority={viewModel.onClickTaskPriorityBtn}
        />
        <CustomButton
          size="large"
          type="primary"
          icon={<BsDownload />}
          disabled={
            !viewModel.selectedTasks.length ||
            viewModel.selectedTasks.length > 1 ||
            viewModel.currentData.filter(el => viewModel.selectedTasks.includes(el.id))[0]?.originalData
              .operationType !== TaskOperationType.RECEIVE
          }
          onClick={viewModel.onClickReportBtn}
        >
          {t(TranslationKey['Download task file'])}
        </CustomButton>
      </div>

      <div className={styles.headerWrapper}>
        <BuyerTypeTaskSelect
          curTaskType={viewModel.curTaskType}
          onClickOperationTypeBtn={viewModel.onClickOperationTypeBtn}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          wrapperClassName={styles.searchInput}
          placeholder="Search by ASIN, Order ID, Item, Track number"
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        getRowClassName={getRowClassName}
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
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowDoubleClick={params => viewModel.onClickResolveBtn(params.row.originalData._id)}
      />

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

      <Modal missClickModalOn openModal={viewModel.showEditTaskModal} setOpenModal={viewModel.onTriggerEditTaskModal}>
        <EditTaskModal
          requestStatus={viewModel.requestStatus}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          task={viewModel.selectedTask}
          showEditBoxModal={viewModel.showEditBoxModal}
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          onTriggerShowEditBoxModal={viewModel.onTriggerShowEditBoxModal}
          onClickOpenCloseModal={viewModel.onTriggerEditTaskModal}
          onEditBox={viewModel.onTriggerShowEditBoxModal}
          onClickSolveTask={viewModel.onClickSolveTask}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning
          withComment
          commentTitleText={t(TranslationKey['Cancel task'])}
          commentLabelText={t(TranslationKey['Reason for canceling the task'])}
          openModal={viewModel.showConfirmModal}
          title={t(TranslationKey['Confirm action'])}
          message={t(TranslationKey['After confirmation, the task will be cancelled. Confirm?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          commentCancelBtnText={t(TranslationKey.Close)}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          onClickSuccessBtn={viewModel.onClickConfirmCancelTask}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
