import { cx } from '@emotion/css'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import {
  mapTaskOperationTypeKeyToEnum,
  TaskOperationType,
  taskOperationTypeTranslate,
} from '@constants/task/task-operation-type'
import { mapTaskPriorityStatusEnum, taskPriorityStatusTranslate } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { WarehouseCanceledTasksViewModel } from './warehouse-canceled-tasks-view.model'
import { styles } from './warehouse-canceled-tasks-view.style'

export const WarehouseCanceledTasksViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseCanceledTasksViewModel({ history: props.history }))
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.headerWrapper}>
          <div className={classNames.boxesFiltersWrapper}>
            <Button
              disabled={viewModel.curTaskPriority === null}
              className={cx(classNames.button, { [classNames.selectedBoxesBtn]: viewModel.curTaskPriority === null })}
              variant="text"
              onClick={() => viewModel.onClickTaskPriorityBtn(null)}
            >
              {t(TranslationKey['All priorities'])}
            </Button>

            {Object.keys(mapTaskPriorityStatusEnum)
              .reverse()
              .map(type => (
                <Button
                  key={type}
                  disabled={viewModel.curTaskPriority === type}
                  className={cx(classNames.button, {
                    [classNames.selectedBoxesBtn]: viewModel.curTaskPriority === type,
                  })}
                  variant="text"
                  onClick={() => viewModel.onClickTaskPriorityBtn(type)}
                >
                  {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[type])}
                </Button>
              ))}
          </div>
          <Button
            variant="contained"
            disabled={
              !viewModel.selectedTasks.length ||
              viewModel.selectedTasks.length > 1 ||
              viewModel.getCurrentData().filter(el => viewModel.selectedTasks.includes(el.id))[0]?.originalData
                .operationType !== TaskOperationType.RECEIVE
            }
            className={classNames.pickupOrdersButton}
            onClick={viewModel.onClickReportBtn}
          >
            {t(TranslationKey['Download task file'])}
            <FileDownloadIcon />
          </Button>
        </div>

        <div className={classNames.headerWrapper}>
          <div className={classNames.boxesFiltersWrapper}>
            <Button
              disabled={viewModel.curTaskType === null}
              className={cx(classNames.button, { [classNames.selectedBoxesBtn]: viewModel.curTaskType === null })}
              variant="text"
              onClick={() => viewModel.onClickOperationTypeBtn(null)}
            >
              {t(TranslationKey['All tasks'])}
            </Button>

            {Object.keys(mapTaskOperationTypeKeyToEnum)
              .filter(el => el !== TaskOperationType.EDIT_BY_STOREKEEPER)
              .map(type => (
                <Button
                  key={type}
                  disabled={viewModel.curTaskType === type}
                  className={cx(classNames.button, {
                    [classNames.selectedBoxesBtn]: viewModel.curTaskType === type,
                  })}
                  variant="text"
                  onClick={() => viewModel.onClickOperationTypeBtn(type)}
                >
                  {taskOperationTypeTranslate(type)}
                </Button>
              ))}
          </div>

          <SearchInput
            value={viewModel.nameSearchValue}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by ASIN, Order ID, Item, Track number'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={classNames.tableWrapper}>
          <MemoDataGrid
            pagination
            checkboxSelection
            useResizeContainer
            disableVirtualization
            localeText={getLocalizationByLanguageTag()}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
              filterForm: classNames.filterForm,
            }}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            getRowHeight={() => 'auto'}
            // rowHeight={200}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
            }}
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
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={params => viewModel.setCurrentOpenedTask(params.row.originalData)}
          />
        </div>
      </MainContent>

      <Modal
        openModal={viewModel.showTaskInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
      >
        <EditTaskModal
          readOnly
          volumeWeightCoefficient={viewModel.volumeWeightCoefficient}
          task={viewModel.curOpenedTask}
          onClickOpenCloseModal={() => viewModel.onTriggerOpenModal('showTaskInfoModal')}
        />
      </Modal>
    </React.Fragment>
  )
}

export const WarehouseCanceledTasksView = withStyles(observer(WarehouseCanceledTasksViewRaw), styles)
