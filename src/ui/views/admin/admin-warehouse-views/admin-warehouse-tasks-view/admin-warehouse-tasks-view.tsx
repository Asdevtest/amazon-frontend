import { observer } from 'mobx-react'
import { useState } from 'react'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITask } from '@typings/models/tasks/task'

import { useStyles } from './admin-warehouse-tasks-view.style'

import { AdminWarehouseTasksViewModel } from './admin-warehouse-tasks-view.model'

export const AdminWarehouseTasksView = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new AdminWarehouseTasksViewModel())

  return (
    <>
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          pinnedColumns={viewModel.pinnedColumns}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          density={viewModel.densityModel}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          getRowId={({ _id }: ITask) => _id}
          slotProps={{
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
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

      <Modal
        openModal={viewModel.showTaskInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
      >
        <EditTaskModal
          // @ts-ignore
          readOnly
          // @ts-ignore
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
          task={viewModel.currentTask}
          onClickOpenCloseModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
        />
      </Modal>
    </>
  )
})
