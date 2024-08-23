import { Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinProxyCheckerForm } from '@components/forms/asin-proxy-checker-form'
import { EditAsinCheckerModal } from '@components/modals/edit-asin-checker-modal'
import { FailedAsinsModal } from '@components/modals/failed-asins-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supervisor-settings-view.style'

import { switcherSettings } from './supervisor-settings-view.config'
import { SupervisorSettingsViewModel } from './supervisor-settings-view.model'

export const SupervisorSettingsView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new SupervisorSettingsViewModel())

  return (
    <>
      <CustomSwitcher
        switchMode="medium"
        condition={viewModel.condition}
        switcherSettings={switcherSettings}
        changeConditionHandler={viewModel.onChangeСondition}
      />

      <div className={styles.flexContainer}>
        <SearchInput
          inputClasses={styles.searchInput}
          value={viewModel.currentSearchValue}
          placeholder={t(TranslationKey['Search by ASIN, Reason'])}
          onChange={viewModel.onChangeUnserverSearchValue}
        />

        <div className={styles.flexContainer}>
          <Popconfirm
            title={t(TranslationKey['Are you sure you want to delete the selected ASINs?'])}
            okText={t(TranslationKey.Yes)}
            cancelText={t(TranslationKey.No)}
            onConfirm={viewModel.onRemoveAsins}
          >
            <Button styleType={ButtonStyle.DANGER} disabled={!viewModel.selectedRows.length}>
              {t(TranslationKey['Delete selected ASINs'])}
            </Button>
          </Popconfirm>

          <Button styleType={ButtonStyle.SUCCESS} onClick={() => viewModel.onTriggerOpenModal('showAsinCheckerModal')}>
            ASIN checker
          </Button>
        </div>
      </div>

      <div className={styles.dataGridWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          rowCount={viewModel.rowCount}
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
      </div>

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
    </>
  )
})
