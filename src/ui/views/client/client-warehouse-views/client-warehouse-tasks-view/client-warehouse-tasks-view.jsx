import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { DownloadIcon } from '@components/shared/svg-icons'
import { EditTaskModal } from '@components/warehouse/edit-task-modal'
import { EditTaskPriorityModal } from '@components/warehouse/edit-task-priority-modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-warehouse-tasks-view.style'

import { ClientWarehouseTasksViewModel } from './client-warehouse-tasks-view.model'
import { getPriorityConfig, getStatusConfig, getStorekeepersConfig, getTypeConfig } from './helpers/get-configs'

export const ClientWarehouseTasksView = observer(() => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ClientWarehouseTasksViewModel())

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

        <Button
          сlassName={styles.downloadBtn}
          disabled={viewModel.isDisabledDownload}
          onClick={viewModel.onClickReportBtn}
        >
          {t(TranslationKey['Download task file'])}
          <DownloadIcon
            className={cx(styles.downloadIcon, { [styles.disabledDownloadIcon]: viewModel.isDisabledDownload })}
          />
        </Button>
      </div>

      <div className={styles.filters}>
        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.selectedPriority}
          switcherSettings={getPriorityConfig()}
          changeConditionHandler={el => viewModel.setFilters('selectedPriority', el)}
        />

        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.selectedStatus}
          switcherSettings={getStatusConfig()}
          changeConditionHandler={el => viewModel.setFilters('selectedStatus', el)}
        />

        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.selectedType}
          switcherSettings={getTypeConfig()}
          changeConditionHandler={el => viewModel.setFilters('selectedType', el)}
        />

        <CustomSwitcher
          switchMode="medium"
          condition={viewModel.selectedStorekeeper}
          switcherSettings={getStorekeepersConfig(viewModel.storekeepersData)}
          changeConditionHandler={el => viewModel.setFilters('selectedStorekeeper', el)}
        />
      </div>

      <div className={styles.tasksWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={row => row._id}
          pinnedColumns={viewModel.pinnedColumns}
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

              sortSettings: {
                sortModel: viewModel.sortModel,
                columnsModel: viewModel.columnsModel,
                onSortModelChange: viewModel.onChangeSortingModel,
              },
            },
          }}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          columns={viewModel.columnsModel}
          rowCount={viewModel.rowCount}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onPinnedColumnsChange={viewModel.handlePinColumn}
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
          volumeWeightCoefficient={viewModel.platformSettings?.volumeWeightCoefficient}
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

      {viewModel.showProgress && <CircularProgressWithLabel />}
    </>
  )
})
