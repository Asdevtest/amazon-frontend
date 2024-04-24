import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskOperationType, mapTaskOperationTypeToLabel } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { DownloadIcon } from '@components/shared/svg-icons'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './client-warehouse-tasks-view.style'

import { ClientWarehouseTasksViewModel } from './client-warehouse-tasks-view.model'
import { getPriorityConfig, getStatusConfig, getStorekeepersConfig, getTypeConfig } from './helpers/get-configs'

export const ClientWarehouseTasksView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ClientWarehouseTasksViewModel({ history }))

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
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.downloadBtn} />

        <SearchInput
          value={viewModel.nameSearchValue}
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by ASIN, Order ID, Item'])}
          onSubmit={viewModel.onSearchSubmit}
        />

        <Button сlassName={styles.downloadBtn} disabled={isDisabledDownload} onClick={viewModel.onClickReportBtn}>
          {t(TranslationKey['Download task file'])}
          <DownloadIcon className={cx(styles.downloadIcon, { [styles.disabledDownloadIcon]: isDisabledDownload })} />
        </Button>
      </div>

      <div className={styles.filters}>
        <CustomSwitcher
          switchMode={'medium'}
          condition={viewModel.selectedPriority}
          switcherSettings={getPriorityConfig()}
          changeConditionHandler={el => viewModel.setFilters('selectedPriority', el)}
        />

        <CustomSwitcher
          switchMode={'medium'}
          condition={viewModel.selectedStatus}
          switcherSettings={getStatusConfig()}
          changeConditionHandler={el => viewModel.setFilters('selectedStatus', el)}
        />

        <CustomSwitcher
          switchMode={'medium'}
          condition={viewModel.selectedType}
          switcherSettings={getTypeConfig()}
          changeConditionHandler={el => viewModel.setFilters('selectedType', el)}
        />

        <CustomSwitcher
          switchMode={'medium'}
          condition={viewModel.selectedStorekeeper}
          switcherSettings={getStorekeepersConfig(viewModel.storekeepersData)}
          changeConditionHandler={el => viewModel.setFilters('selectedStorekeeper', el)}
        />
      </div>

      <div className={styles.tasksWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          localeText={getLocalizationByLanguageTag()}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.getCurrentTaskData()}
          getRowHeight={() => 'auto'}
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
          loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
          columns={viewModel.columnsModel}
          rowCount={viewModel.rowsCount}
          onRowHover={viewModel.onHover}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
        />
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

      {viewModel.showConfirmWithCommentModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      {viewModel.showWarningInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        />
      ) : null}

      {viewModel.showProgress && <CircularProgressWithLabel />}
    </>
  )
})
