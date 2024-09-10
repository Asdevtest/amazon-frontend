import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { BsDownload } from 'react-icons/bs'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'
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

import { useStyles } from './warehouse-vacant-tasks-view.style'

import { WarehouseVacantViewModel } from './warehouse-vacant-tasks-view.model'

export const WarehouseVacantTasksView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new WarehouseVacantViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params =>
    params.row.originalData.operationType === TaskOperationType.RECEIVE && params.row.barcode && styles.successRow

  const isDisableDowloadButton =
    !viewModel.selectedTasks.length ||
    viewModel.selectedTasks.length > 1 ||
    viewModel.currentData.filter(el => viewModel.selectedTasks.includes(el.id))[0]?.originalData.operationType !==
      TaskOperationType.RECEIVE

  return (
    <div className="viewWrapper">
      <div className={styles.headerWrapper}>
        <TaskPrioritySelector
          currentPriority={viewModel.curTaskPriority}
          onActivePriority={viewModel.onClickTaskPriorityBtn}
        />

        <BuyerTypeTaskSelect
          curTaskType={viewModel.curTaskType}
          onClickOperationTypeBtn={viewModel.onClickOperationTypeBtn}
        />
      </div>

      <div className={styles.headerWrapper}>
        <CustomButton
          type="primary"
          size="large"
          disabled={!viewModel.selectedTasks.length}
          onClick={viewModel.onClickPickupManyTasksBtn}
        >
          {t(TranslationKey['Take on the work of the selected'])}
        </CustomButton>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          wrapperClassName={styles.searchInput}
          placeholder="Search by ASIN, Order ID, Item, Track number"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton
          type="primary"
          size="large"
          ico={<BsDownload />}
          disabled={isDisableDowloadButton}
          onClick={viewModel.onClickReportBtn}
        >
          {t(TranslationKey['Download task file'])}
        </CustomButton>
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
        onRowDoubleClick={params => viewModel.setCurrentOpenedTask(params.row.originalData)}
      />

      <Modal
        openModal={viewModel.showTaskInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
      >
        <EditTaskModal
          readOnly
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          task={viewModel.curOpenedTask}
          onClickOpenCloseModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
        />
      </Modal>

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

      {viewModel.showTwoVerticalChoicesModal ? (
        <TwoVerticalChoicesModal
          // @ts-ignore
          openModal={viewModel.showTwoVerticalChoicesModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Task picked up'])}
          topBtnText={t(TranslationKey['Go to task'])}
          bottomBtnText={t(TranslationKey['Continue to work with new tasks'])}
          onClickTopBtn={() => viewModel.goToMyTasks()}
          onClickBottomBtn={() => viewModel.onTriggerOpenModal('showTwoVerticalChoicesModal')}
        />
      ) : null}

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
