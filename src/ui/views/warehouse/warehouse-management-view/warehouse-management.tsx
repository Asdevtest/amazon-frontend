import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditDestinationForm } from '@components/forms/add-or-edit-destination-form'
import { AddOrEditWarehouseTariffForm } from '@components/forms/add-or-edit-warehouse-tariff-form'
import { AddOrEditWeightBasedLogisticsTariffForm } from '@components/forms/add-or-edit-weight-based-logistics-tariff-form'
import { Button } from '@components/shared/button'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-management.style'

import { createSwitcherConfig } from './warehouse-management.config'
import { WarehouseTariffModel } from './warehouse-management.model'
import { WarehouseTabs } from './warehouse-management.types'

export const WarehouseManagementView = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseTariffModel())

  const currentAddress = useMemo(
    () =>
      `${t(TranslationKey['Warehouse address'])}: ${viewModel.storekeeperDestination?.name}: ${
        viewModel.storekeeperDestination?.zipCode
      }, ${viewModel.storekeeperDestination?.country}, ${viewModel.storekeeperDestination?.state}, ${
        viewModel.storekeeperDestination?.city
      }, ${viewModel.storekeeperDestination?.address}`,
    [viewModel.storekeeperDestination],
  )

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={createSwitcherConfig()}
          defaultValue={viewModel.tabIndex}
          onChange={viewModel.onChangeTabIndex}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Destination, Tariff name"
          onSearch={viewModel.onChangeUnserverSearchValue}
        />

        {viewModel.tabIndex === WarehouseTabs.WAREHOUSE_SERVICES ? (
          <Button styleType={ButtonStyle.SUCCESS} onClick={viewModel.onClickAddWarehouseTariff}>
            {t(TranslationKey['Create a tariff'])}
          </Button>
        ) : (
          <div className={styles.flexRow}>
            {viewModel.storekeeperDestination ? (
              <p className={styles.currentAddress} title={currentAddress}>
                {currentAddress}
              </p>
            ) : null}

            <CustomButton
              size="large"
              type="primary"
              onClick={() => viewModel.onTriggerOpenModal('showAddOrEditDestinationModal')}
            >
              {t(TranslationKey[viewModel.storekeeperDestination ? 'Edit address' : 'Add address'])}
            </CustomButton>

            <CustomButton size="large" onClick={viewModel.onToggleArchive}>
              {t(TranslationKey[viewModel.isArchive ? 'Current tariffs' : 'Open archive'])}
            </CustomButton>
          </div>
        )}
      </div>

      <CustomDataGrid
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
        getRowId={({ _id }: GridRowModel) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
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
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onRowSelectionModelChange={viewModel.onSelectionModel}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
      />

      <Modal
        openModal={viewModel.showAddOrEditWarehouseTariffModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')}
      >
        <AddOrEditWarehouseTariffForm
          tariffToEdit={viewModel.tariffToEdit}
          onCloseModal={() => viewModel.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')}
          onCreateSubmit={viewModel.onCreateWarehouseTariff}
          onEditSubmit={viewModel.onEditWarehouseTariff}
        />
      </Modal>

      <Modal
        openModal={viewModel.showAddOrEditDestinationModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditDestinationModal')}
      >
        <AddOrEditDestinationForm
          destinationToEdit={viewModel.storekeeperDestination}
          onCloseModal={() => viewModel.onTriggerOpenModal('showAddOrEditDestinationModal')}
          onCreateSubmit={viewModel.onChangeDestination}
          onEditSubmit={viewModel.onChangeDestination}
          onClickAddBtn={() => viewModel.onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
        />
      </Modal>

      <Modal
        missClickModalOn
        openModal={viewModel.showAddOrEditLogisticTariffModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
      >
        <AddOrEditWeightBasedLogisticsTariffForm
          sourceYuanToDollarRate={viewModel.platformSettings?.yuanToDollarRate}
          tariffToEdit={viewModel.tariffToEdit}
          logisticsTariffsData={viewModel.filteredData}
          destinationData={viewModel.destinationData}
          setDestinationsFavouritesItem={viewModel.setDestinationsFavouritesItem}
          destinationsFavourites={viewModel.destinationsFavourites}
          onCreateSubmit={viewModel.onCreateLogicticTariff}
          onEditSubmit={viewModel.onEditLogisticTariff}
          onClickClose={() => viewModel.onTriggerOpenModal('showAddOrEditLogisticTariffModal')}
        />
      </Modal>
    </div>
  )
})
