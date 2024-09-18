import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { BsDownload } from 'react-icons/bs'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'
import { BuyerTypeTaskSelect } from '@components/shared/selects/buyer-type-task-select'
import { TaskPrioritySelector } from '@components/shared/task-priority-selector/task-priority-selector'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-completed-tasks-view.style'

import { WarehouseCompletedViewModel } from './warehouse-completed-tasks-view.model'

export const WarehouseCompletedTasksView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WarehouseCompletedViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()
  }, [])

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
    </div>
  )
})
