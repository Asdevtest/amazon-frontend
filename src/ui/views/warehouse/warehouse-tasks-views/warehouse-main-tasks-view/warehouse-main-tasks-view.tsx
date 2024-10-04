import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { BsDownload } from 'react-icons/bs'

import { GridRowModel } from '@mui/x-data-grid-premium'

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
import { TaskStatus } from '@typings/enums/task-status'

import { useStyles } from './warehouse-main-tasks-view.style'

import { WarehouseMainTasksViewModel } from './warehouse-main-tasks-view.model'

export const WarehouseMainTasksView = observer(({ status }: { status: TaskStatus }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WarehouseMainTasksViewModel(status), [])

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        <TaskPrioritySelector
          currentPriority={viewModel.taskPriority}
          onActivePriority={viewModel.onChangeTaskPriority}
        />

        <CustomButton
          size="large"
          type="primary"
          icon={<BsDownload />}
          disabled={viewModel.downloadTaskFileDisabled}
          onClick={viewModel.onClickReport}
        >
          {t(TranslationKey['Download task file'])}
        </CustomButton>
      </div>

      <div className={styles.flexRow}>
        <BuyerTypeTaskSelect curTaskType={viewModel.taskType} onClickOperationTypeBtn={viewModel.onChangeTaskType} />

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
        openModal={viewModel.showTaskInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
      >
        <EditTaskModal
          // @ts-ignore
          readOnly
          task={viewModel.currentTask}
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          onClickOpenCloseModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
        />
      </Modal>
    </div>
  )
})
