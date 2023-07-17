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
import {
  mapTaskPriorityStatusEnum,
  TaskPriorityStatus,
  taskPriorityStatusTranslate,
} from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { WarehouseMyTasksViewModel } from './warehouse-my-tasks-view.model'
import { styles } from './warehouse-my-tasks-view.style'

export const WarehouseMyTasksViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new WarehouseMyTasksViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getRowClassName = params =>
    params.row.originalData.operationType === TaskOperationType.RECEIVE && params.row.barcode && classNames.successRow

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

                  {TaskPriorityStatus.URGENT === mapTaskPriorityStatusEnum[type] && (
                    <img className={classNames.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
                  )}
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
            getRowClassName={getRowClassName}
            sortingMode="server"
            paginationMode="server"
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={[15, 25, 50, 100]}
            rows={viewModel.getCurrentData()}
            getRowHeight={() => 147}
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
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={params => viewModel.onClickResolveBtn(params.row.originalData._id)}
          />
        </div>
      </MainContent>

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
        dialogContextClassName={classNames.resolveTaskModalContent}
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
}

export const WarehouseMyTasksView = withStyles(observer(WarehouseMyTasksViewRaw), styles)
