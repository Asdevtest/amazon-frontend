import { observer } from 'mobx-react'
import { useState } from 'react'
import { BsDownload } from 'react-icons/bs'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
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
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by ASIN, Order ID, Item"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton
          type="primary"
          size="large"
          icon={<BsDownload />}
          disabled={viewModel.isDisabledDownload}
          onClick={viewModel.onClickReportBtn}
        >
          {t(TranslationKey['Download task file'])}
        </CustomButton>
      </div>

      <div className={styles.filters}>
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={getPriorityConfig()}
          defaultValue={viewModel.selectedPriority}
          onChange={el => viewModel.setFilters('selectedPriority', el)}
        />
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={getStatusConfig()}
          defaultValue={viewModel.selectedStatus}
          onChange={el => viewModel.setFilters('selectedStatus', el)}
        />
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={getTypeConfig()}
          defaultValue={viewModel.selectedType}
          onChange={el => viewModel.setFilters('selectedType', el)}
        />
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={getStorekeepersConfig(viewModel.storekeepersData)}
          defaultValue={viewModel.selectedStorekeeper}
          onChange={el => viewModel.setFilters('selectedStorekeeper', el)}
        />
      </div>

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

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
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
          cancelBtnText={t(TranslationKey.Close)}
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
    </div>
  )
})
