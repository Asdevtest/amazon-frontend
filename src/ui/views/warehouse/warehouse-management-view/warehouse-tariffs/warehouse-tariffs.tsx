import { observer } from 'mobx-react'
import { useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditWarehouseTariffForm } from '@components/forms/add-or-edit-warehouse-tariff-form'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './warehouse-tariffs.style'

import { WarehouseTariffModel } from './warehouse-tariffs.model'

export const WarehouseTariffs = observer(() => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseTariffModel())

  return (
    <div className={styles.mainWrapper}>
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
          onCreateSubmit={viewModel.onCreateTariff}
          onEditSubmit={viewModel.onEditTariff}
        />
      </Modal>
    </div>
  )
})
