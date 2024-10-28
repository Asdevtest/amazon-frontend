import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { VerticalChoicesModal } from '@components/modals/vertical-choices-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'

import { BuyerFreeOrdersViewModel } from './buyer-free-orders-view.model'

export const BuyerFreeOrdersView = observer(() => {
  const viewModel = useMemo(() => new BuyerFreeOrdersViewModel(), [])

  return (
    <div className="viewWrapper">
      <div>
        <CustomButton
          type="primary"
          size="large"
          disabled={viewModel.selectedRows.length === 0}
          onClick={viewModel.onPickupSomeItems}
        >
          {t(TranslationKey['Take on the work of the selected'])}
        </CustomButton>
      </div>
      <CustomDataGrid
        checkboxSelection
        disableRowSelectionOnClick
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        pinnedColumns={viewModel.pinnedColumns}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        getRowId={(row: IOrder) => row._id}
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
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
      />

      <Modal
        openModal={viewModel.showVerticalChoicesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showVerticalChoicesModal')}
      >
        <VerticalChoicesModal
          title="Order picked up"
          firstButtonText="Go to order"
          secondButtonText="Free orders"
          onClickFirstButton={viewModel.goToMyOrders}
          onClickSecondButton={viewModel.onClickContinueWorkButton}
        />
      </Modal>
    </div>
  )
})
