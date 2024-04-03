import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import FileDownloadIcon from '@mui/icons-material/FileDownload'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { BuyerTypeTaskSelect } from '@components/shared/selects/buyer-type-task-select'
import { TaskPrioritySelector } from '@components/shared/task-priority-selector/task-priority-selector'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-canceled-tasks-view.style'

import { WarehouseCanceledTasksViewModel } from './warehouse-canceled-tasks-view.model'

export const WarehouseCanceledTasksView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseCanceledTasksViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.headerWrapper}>
          <TaskPrioritySelector
            currentPriority={viewModel.curTaskPriority}
            handleActivePriority={viewModel.onClickTaskPriorityBtn}
          />

          <Button
            disabled={
              !viewModel.selectedTasks.length ||
              viewModel.selectedTasks.length > 1 ||
              viewModel.currentData.filter(el => viewModel.selectedTasks.includes(el.id))[0]?.originalData
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
            onRowDoubleClick={params => viewModel.setCurrentOpenedTask(params.row.originalData)}
          />
        </div>
      </div>

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
    </>
  )
})
