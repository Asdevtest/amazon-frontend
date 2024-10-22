import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { BsDownload } from 'react-icons/bs'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { VerticalChoicesModal } from '@components/modals/vertical-choices-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { TaskStatus } from '@typings/enums/task/task-status'

import { useStyles } from './warehouse-main-tasks-view.style'

import { taskPriorityOptions, taskTypeOptions } from './warehouse-main-tasks-view.config'
import { WarehouseMainTasksViewModel } from './warehouse-main-tasks-view.model'

export const WarehouseMainTasksView = observer(({ status }: { status: TaskStatus }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WarehouseMainTasksViewModel(status), [])

  const canceledTasks = status === TaskStatus.NOT_SOLVED

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        <CustomRadioButton
          size="large"
          options={taskPriorityOptions()}
          defaultValue={viewModel.taskPriority}
          onChange={viewModel.onChangeTaskPriority}
        />

        {status === TaskStatus.NEW ? (
          <CustomButton
            type="primary"
            size="large"
            disabled={!viewModel.selectedRows.length}
            onClick={viewModel.onPickupTasks}
          >
            {t(TranslationKey['Take on the work of the selected'])}
          </CustomButton>
        ) : null}
      </div>

      <div className={styles.flexRow}>
        <CustomRadioButton
          size="large"
          options={taskTypeOptions(canceledTasks)}
          defaultValue={viewModel.taskType}
          onChange={viewModel.onChangeTaskType}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          wrapperClassName={styles.searchInput}
          placeholder="Search by ASIN, Order ID, Item, Track number"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton
          size="large"
          type="primary"
          icon={<BsDownload />}
          disabled={!viewModel.selectedRows.length}
          onClick={viewModel.onClickReport}
        >
          {t(TranslationKey['Download task file'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
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
      />

      <Modal
        missClickModalOn
        openModal={viewModel.showTaskModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTaskModal')}
      >
        <EditTaskModal
          // @ts-ignore
          readOnly={status === TaskStatus.NEW}
          task={viewModel.currentTask}
          showEditBoxModal={viewModel.showEditBoxModal}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          onClickOpenCloseModal={() => viewModel.onTriggerOpenModal('showTaskModal')}
          onTriggerShowEditBoxModal={viewModel.onTriggerShowEditBoxModal}
          onEditBox={viewModel.onTriggerShowEditBoxModal}
          onClickSolveTask={viewModel.onClickSolveTask}
        />
      </Modal>

      <Modal
        openModal={viewModel.showEditPriorityData}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditPriorityData')}
      >
        <EditTaskPriorityModal
          data={viewModel.editPriorityData}
          handleClose={() => viewModel.onTriggerOpenModal('showEditPriorityData')}
          onSubmitHandler={viewModel.onUpdateTask}
        />
      </Modal>

      <Modal
        openModal={viewModel.showVerticalChoicesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showVerticalChoicesModal')}
      >
        <VerticalChoicesModal
          title="Task picked up"
          firstButtonText="Go to task"
          secondButtonText="Continue to work with new tasks"
          onClickFirstButton={viewModel.goToMyTasks}
          onClickSecondButton={() => viewModel.onTriggerOpenModal('showVerticalChoicesModal')}
        />
      </Modal>
    </div>
  )
})
