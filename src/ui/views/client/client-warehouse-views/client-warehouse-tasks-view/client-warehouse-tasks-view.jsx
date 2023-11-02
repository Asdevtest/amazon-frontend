/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Checkbox, Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import {
  TaskOperationType,
  mapTaskOperationTypeEnumToKey,
  mapTaskOperationTypeKeyToEnum,
  mapTaskOperationTypeToLabel,
  taskOperationTypeTranslate,
} from '@constants/task/task-operation-type'
import { mapTaskPriorityStatusEnum, taskPriorityStatusTranslate } from '@constants/task/task-priority-status'
import { TaskStatusTranslate, mapTaskStatusKeyToEnum } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { DownloadIcon } from '@components/shared/svg-icons'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './client-warehouse-tasks-view.style'

import { ClientWarehouseTasksViewModel } from './client-warehouse-tasks-view.model'

export const ClientWarehouseTasksViewRaw = props => {
  const [viewModel] = useState(() => new ClientWarehouseTasksViewModel({ history: props.history }))
  const { classes: classNames } = props
  const [isDisabledDownload, setIsDisabledDownload] = useState(true)

  useEffect(() => {
    viewModel.loadData()
  }, [])

  useEffect(() => {
    setIsDisabledDownload(
      !viewModel.selectedBoxes?.length ||
        viewModel.selectedBoxes?.length > 1 ||
        viewModel.tasksMy
          .filter(el => viewModel.selectedBoxes.includes(el.id))
          .some(box => {
            return box.operationType !== mapTaskOperationTypeToLabel[TaskOperationType.RECEIVE]
          }),
    )
  }, [viewModel.selectedBoxes])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.headerWrapper}>
          <SearchInput
            // disabled
            value={viewModel.nameSearchValue}
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by ASIN, Order ID, Item'])}
            onSubmit={viewModel.onSearchSubmit}
          />
        </div>

        <div className={classNames.controls}>
          <div className={classNames.filters}>
            <WithSearchSelect
              notCloseOneClick
              isFlat
              checkbox
              getRowValue={el => taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[Number(el)])}
              selectedItemName={t(TranslationKey['All priorities'])}
              data={Object.keys(mapTaskPriorityStatusEnum).reverse()}
              currentShops={viewModel.activeFilters.priority}
              firstItems={
                <Button
                  className={classNames.filterBtn}
                  variant="text"
                  onClick={() => {
                    viewModel.selectFilterForField(
                      'priority',
                      Object.keys(mapTaskPriorityStatusEnum).length === viewModel.activeFilters.priority.length
                        ? []
                        : Object.keys(mapTaskPriorityStatusEnum),
                    )
                  }}
                >
                  <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                    <>
                      <Checkbox
                        checked={
                          Object.keys(mapTaskPriorityStatusEnum).length === viewModel.activeFilters.priority.length
                        }
                        color="primary"
                      />
                      <Typography className={classNames.fieldName}>{t(TranslationKey['All priorities'])}</Typography>
                    </>
                  </div>
                </Button>
              }
              onClickSelect={el => viewModel.selectFilterForField('priority', el)}
              onClickSubmitBtn={viewModel.getTasksMy}
            />

            <WithSearchSelect
              notCloseOneClick
              isFlat
              checkbox
              getRowValue={el => TaskStatusTranslate(mapTaskStatusKeyToEnum[el])}
              selectedItemName={t(TranslationKey['All statuses'])}
              data={Object.keys(mapTaskStatusKeyToEnum)}
              currentShops={viewModel.activeFilters.status}
              firstItems={
                <Button
                  className={classNames.filterBtn}
                  variant="text"
                  onClick={() => {
                    viewModel.selectFilterForField(
                      'status',
                      Object.keys(mapTaskStatusKeyToEnum).length === viewModel.activeFilters.status.length
                        ? []
                        : Object.keys(mapTaskStatusKeyToEnum),
                    )
                  }}
                >
                  <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                    <>
                      <Checkbox
                        checked={Object.keys(mapTaskStatusKeyToEnum).length === viewModel.activeFilters.status.length}
                        color="primary"
                      />
                      <Typography className={classNames.fieldName}>{t(TranslationKey['All statuses'])}</Typography>
                    </>
                  </div>
                </Button>
              }
              onClickSelect={el => viewModel.selectFilterForField('status', el)}
              onClickSubmitBtn={viewModel.getTasksMy}
            />

            <WithSearchSelect
              checkbox
              notCloseOneClick
              selectedItemName={t(TranslationKey['All warehouses'])}
              data={viewModel.storekeepersData}
              searchFields={['name']}
              currentShops={viewModel.activeFilters.storekeeper}
              firstItems={
                <Button
                  className={classNames.filterBtn}
                  variant="text"
                  onClick={() => {
                    viewModel.selectFilterForField(
                      'storekeeper',
                      viewModel.storekeepersData.length === viewModel.activeFilters.storekeeper.length
                        ? []
                        : viewModel.storekeepersData,
                    )
                  }}
                >
                  <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                    <>
                      <Checkbox
                        checked={viewModel.storekeepersData.length === viewModel.activeFilters.storekeeper.length}
                        color="primary"
                      />
                      <Typography className={classNames.fieldName}>{t(TranslationKey['All warehouses'])}</Typography>
                    </>
                  </div>
                </Button>
              }
              onClickSelect={el => viewModel.selectFilterForField('storekeeper', el, '_id')}
              onClickSubmitBtn={viewModel.getTasksMy}
            />

            <WithSearchSelect
              notCloseOneClick
              isFlat
              checkbox
              getRowValue={el => taskOperationTypeTranslate(mapTaskOperationTypeEnumToKey[el])}
              selectedItemName={t(TranslationKey['All tasks'])}
              data={Object.keys(mapTaskOperationTypeKeyToEnum)}
              currentShops={viewModel.activeFilters.type}
              firstItems={
                <Button
                  className={classNames.filterBtn}
                  variant="text"
                  onClick={() => {
                    viewModel.selectFilterForField(
                      'type',
                      Object.keys(mapTaskOperationTypeKeyToEnum).length === viewModel.activeFilters.type.length
                        ? []
                        : Object.keys(mapTaskOperationTypeKeyToEnum),
                    )
                  }}
                >
                  <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                    <>
                      <Checkbox
                        checked={
                          Object.keys(mapTaskOperationTypeKeyToEnum).length === viewModel.activeFilters.type.length
                        }
                        color="primary"
                      />
                      <Typography className={classNames.fieldName}>{t(TranslationKey['All tasks'])}</Typography>
                    </>
                  </div>
                </Button>
              }
              onClickSelect={el => viewModel.selectFilterForField('type', el)}
              onClickSubmitBtn={viewModel.getTasksMy}
            />
          </div>

          <Button
            // key={viewModel.selectedBoxes?.length}
            disabled={isDisabledDownload}
            className={classNames.pickupOrdersButton}
            onClick={viewModel.onClickReportBtn}
          >
            {t(TranslationKey['Download task file'])}
            <DownloadIcon
              className={cx(classNames.downloadIcon, { [classNames.disabledDownloadIcon]: isDisabledDownload })}
            />
          </Button>
        </div>

        <div className={classNames.tasksWrapper}>
          <MemoDataGrid
            // disableVirtualization
            // key={SettingsModel.languageTag}
            checkboxSelection
            pagination
            // propsToRerender={{ onHover: viewModel.onHover }}
            classes={{
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            localeText={getLocalizationByLanguageTag()}
            pageSizeOptions={[15, 25, 50, 100]}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            sortingMode="server"
            rows={viewModel.getCurrentTaskData()}
            getRowHeight={() => 'auto'}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
              columnMenu: viewModel.columnMenuSettings,

              toolbar: {
                columsBtnSettings: {
                  columnsModel: viewModel.columnsModel,
                  columnVisibilityModel: viewModel.columnVisibilityModel,
                  onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
                },
              },
            }}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            columns={viewModel.columnsModel}
            paginationMode="server"
            rowCount={viewModel.rowsCount}
            onRowHover={viewModel.onHover}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
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

      <ConfirmationModal
        withComment
        isWarning
        asCommentModalDefault
        openModal={viewModel.showConfirmWithCommentModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
        title={t(TranslationKey.Attention)}
        commentLabelText={t(TranslationKey['Are you sure you want to cancel the task?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.onClickCancelAfterConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <WarningInfoModal
        isWarning={viewModel.warningInfoModalSettings.isWarning}
        openModal={viewModel.showWarningInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        title={viewModel.warningInfoModalSettings.title}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          viewModel.onTriggerOpenModal('showWarningInfoModal')
        }}
      />

      {viewModel.showProgress && <CircularProgressWithLabel />}
    </React.Fragment>
  )
}

export const ClientWarehouseTasksView = withStyles(observer(ClientWarehouseTasksViewRaw), styles)
