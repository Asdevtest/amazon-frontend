import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { EditAsinCheckerModal } from '@components/modals/edit-asin-checker-modal'
import { FailedAsinsModal } from '@components/modals/failed-asins-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-settings-view.style'

import { switcherSettings } from './supervisor-settings-view.config'
import { SupervisorSettingsViewModel } from './supervisor-settings-view.model'

export const SupervisorSettingsView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new SupervisorSettingsViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.flexContainer}>
        <CustomRadioButton
          size="large"
          options={switcherSettings}
          defaultValue={viewModel.condition}
          onChange={event => viewModel.onChangeСondition(event.target.value)}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by ASIN, Reason"
          onSearch={viewModel.onChangeUnserverSearchValue}
        />

        <div className={styles.flexContainer}>
          <CustomButton
            danger
            size="large"
            type="primary"
            disabled={!viewModel.selectedRows.length}
            confirmText="Are you sure you want to delete the selected ASINs?"
            onClick={viewModel.onRemoveAsins}
          >
            {t(TranslationKey['Delete selected ASINs'])}
          </CustomButton>

          <CustomButton
            size="large"
            type="primary"
            onClick={() => viewModel.onTriggerOpenModal('showAsinCheckerModal')}
          >
            ASIN checker
          </CustomButton>
        </div>
      </div>

      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        sortingMode="client"
        paginationMode="client"
        rowCount={viewModel.currentData?.length}
        rows={viewModel.filteredData}
        sortModel={viewModel.sortModel}
        columns={viewModel.columnsModel}
        filterModel={viewModel.filterModel}
        pinnedColumns={viewModel.pinnedColumns}
        rowSelectionModel={viewModel.selectedRows}
        paginationModel={viewModel.paginationModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
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
          },
        }}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
      />

      <Modal
        openModal={viewModel.showEditAsinCheckerModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditAsinCheckerModal')}
      >
        <EditAsinCheckerModal
          asinsToEdit={viewModel.asinsToEdit}
          onSubmit={viewModel.onSubmitEditAsin}
          onClose={() => viewModel.onTriggerOpenModal('showEditAsinCheckerModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAsinCheckerModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAsinCheckerModal')}
      >
        <AsinProxyCheckerForm
          user={viewModel.userInfo}
          strategy={viewModel.condition}
          onSubmit={viewModel.onSubmitAsins}
          onClose={() => viewModel.onTriggerOpenModal('showAsinCheckerModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showFailedAsinsModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showFailedAsinsModal')}
      >
        <FailedAsinsModal
          failedData={viewModel.failedData}
          onClickSuccessBtn={() => viewModel.onTriggerOpenModal('showFailedAsinsModal')}
        />
      </Modal>
    </div>
  )
})
