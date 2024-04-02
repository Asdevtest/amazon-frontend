import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supplier-approximate-calculations.style'

import { SupplierApproximateCalculationsModel } from './supplier-approximate-calculations.model'

export const SupplierApproximateCalculations = observer(({ openModal, setOpenModal }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new SupplierApproximateCalculationsModel())

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <p className={styles.title}>{t(TranslationKey['Approximate calculation'])}</p>

        <CustomSwitcher
          fullWidth
          condition={viewModel?.currentStorekeeperId}
          switcherSettings={viewModel?.storekeepers}
          changeConditionHandler={value => {
            viewModel.currentStorekeeperId = value as string
          }}
        />

        <div className={styles.tableWrapper}>
          <CustomDataGrid
            disableRowSelectionOnClick
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rows={viewModel.tableData}
            getRowHeight={() => 'auto'}
            getRowId={({ _id }: { _id: string }) => _id}
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
              },
            }}
            rowSelectionModel={viewModel.selectedRows}
            density={viewModel.densityModel}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onRowSelectionModelChange={viewModel.onSelectionModel}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>
    </Modal>
  )
})
