import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { BatchInfoModal } from '@components/modals/batch-info-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { ArchiveIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './client-sent-batches-view.style'

import { ClientSentBatchesViewModel } from './client-sent-batches-view.model'

export const ClientSentBatchesView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ClientSentBatchesViewModel({ history }))

  return (
    <div className="viewWrapper">
      <div className={styles.btnsWrapper}>
        <CustomButton size="large" onClick={viewModel.onTriggerArchive}>
          {t(TranslationKey[viewModel.isArchive ? 'Actual batches' : 'Open archive'])}
        </CustomButton>

        <CustomInputSearch
          enterButton
          allowClear
          wrapperClassName={styles.searchInput}
          size="large"
          placeholder="Search by ASIN, Title, Batch ID, Order ID"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton
          danger
          size="large"
          type="primary"
          icon={<ArchiveIcon />}
          disabled={!viewModel.selectedRows.length}
          onClick={viewModel.onClickTriggerArchOrResetProducts}
        >
          {t(TranslationKey[viewModel.isArchive ? 'Relocate from archive' : 'Move to archive'])}
        </CustomButton>
      </div>

      <CustomRadioButton
        size="large"
        buttonStyle="solid"
        options={[
          ...viewModel.storekeepersData
            .filter(storekeeper => storekeeper.boxesCount !== 0)
            .map(storekeeper => ({ label: storekeeper.name, value: storekeeper._id })),
          { label: t(TranslationKey['All warehouses']), value: '' },
        ]}
        defaultValue={viewModel.currentStorekeeperId}
        onChange={viewModel.onClickStorekeeperBtn}
      />

      <div className="tableWrapper">
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rowCount={viewModel.rowCount}
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          paginationModel={viewModel.paginationModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
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
              },
            },
          }}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onRowSelectionModelChange={viewModel.onSelectionModel}
          onSortModelChange={viewModel.onChangeSortingModel}
          onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
          onPaginationModelChange={viewModel.onPaginationModelChange}
          onFilterModelChange={viewModel.onChangeFilterModel}
          onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row._id)}
          onPinnedColumnsChange={viewModel.handlePinColumn}
        />
      </div>

      {viewModel.showBatchInfoModal ? (
        <BatchInfoModal
          // @ts-ignore
          openModal={viewModel.showBatchInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showBatchInfoModal')}
          batch={viewModel.curBatch}
          patchActualShippingCostBatch={viewModel.patchActualShippingCostBatch}
          onSubmitChangeBoxFields={viewModel.onSubmitChangeBoxFields}
          onClickHsCode={viewModel.onClickHsCode}
        />
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.title}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}
    </div>
  )
})
