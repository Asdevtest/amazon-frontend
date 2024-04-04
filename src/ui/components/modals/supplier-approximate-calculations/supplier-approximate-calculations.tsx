import { observer } from 'mobx-react'
import { FC, useRef } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './supplier-approximate-calculations.style'

import { SupplierApproximateCalculationsModel } from './supplier-approximate-calculations.model'

interface SupplierApproximateCalculationsModalProps {
  openModal: boolean
  currentSupplierId: string
  setOpenModal: (value: boolean) => void
}

export const SupplierApproximateCalculationsModal: FC<SupplierApproximateCalculationsModalProps> = observer(
  ({ openModal, currentSupplierId, setOpenModal }) => {
    const { classes: styles } = useStyles()

    const viewModel = useRef(new SupplierApproximateCalculationsModel(currentSupplierId))

    return (
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className={styles.root}>
          <p className={styles.title}>{t(TranslationKey['Approximate calculation'])}</p>

          <CustomSwitcher
            fullWidth
            switchMode="medium"
            condition={viewModel?.current?.currentStorekeeperId}
            switcherSettings={viewModel?.current?.storekeepers}
            changeConditionHandler={value => viewModel?.current?.setCurrentStorekeeper(value as string)}
          />

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              disableRowSelectionOnClick
              rowCount={viewModel?.current.rowCount}
              sortModel={viewModel?.current.sortModel}
              filterModel={viewModel?.current.filterModel}
              columnVisibilityModel={viewModel?.current.columnVisibilityModel}
              paginationModel={viewModel?.current.paginationModel}
              rows={viewModel?.current.tableData}
              getRowHeight={() => 'auto'}
              getRowId={({ _id }: { _id: string }) => _id}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
                columnMenu: viewModel?.current.columnMenuSettings,

                toolbar: {
                  resetFiltersBtnSettings: {
                    onClickResetFilters: viewModel?.current.onClickResetFilters,
                    isSomeFilterOn: viewModel?.current.isSomeFilterOn,
                  },

                  columsBtnSettings: {
                    columnsModel: viewModel?.current.columnsModel,

                    columnVisibilityModel: viewModel?.current.columnVisibilityModel,
                    onColumnVisibilityModelChange: viewModel?.current.onColumnVisibilityModelChange,
                  },
                },
              }}
              rowSelectionModel={viewModel?.current.selectedRows}
              density={viewModel?.current.densityModel}
              columns={viewModel?.current.columnsModel}
              loading={viewModel?.current.requestStatus === loadingStatus.IS_LOADING}
              onRowSelectionModelChange={viewModel?.current.onSelectionModel}
              onSortModelChange={viewModel?.current.onChangeSortingModel}
              onColumnVisibilityModelChange={viewModel?.current.onColumnVisibilityModelChange}
              onPaginationModelChange={viewModel?.current.onPaginationModelChange}
              onFilterModelChange={viewModel?.current.onChangeFilterModel}
            />
          </div>
        </div>
      </Modal>
    )
  },
)
