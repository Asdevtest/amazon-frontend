import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { AdminBalanceModal } from '@components/modals/admin-balance-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './user-balance.style'

import { UserBalanceModel } from './user-balance.model'

export const UserBalance = observer(({ userId }) => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new UserBalanceModel(userId), [])

  const getRowClassName = params => (params.row.sum < 0 ? styles.redRow : params.row.sum > 0 && styles.greenRow)

  return (
    <>
      {viewModel.user ? <DashboardBalance user={viewModel.user} /> : null}

      <div className={styles.buttons}>
        <Button onClick={viewModel.onTriggerReplenishModal}>{t(TranslationKey.Deposit)}</Button>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onTriggerWithdrawModal}>
          {t(TranslationKey.Withdraw)}
        </Button>
      </div>

      <div className={styles.tableWrapper}>
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

      <Modal openModal={viewModel.showReplenishModal} setOpenModal={viewModel.onTriggerReplenishModal}>
        <AdminBalanceModal
          user={viewModel.user}
          onTriggerParentModal={viewModel.onTriggerReplenishModal}
          onSubmit={viewModel.makePayment}
        />
      </Modal>

      <Modal openModal={viewModel.showWithdrawModal} setOpenModal={viewModel.onTriggerWithdrawModal}>
        <AdminBalanceModal
          isWithdraw
          user={viewModel.user}
          onTriggerParentModal={viewModel.onTriggerWithdrawModal}
          onSubmit={viewModel.makePayment}
        />
      </Modal>
    </>
  )
})
