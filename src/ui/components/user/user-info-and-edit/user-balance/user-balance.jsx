import { observer } from 'mobx-react'
import { useState } from 'react'

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
  const [viewModel] = useState(() => new UserBalanceModel(userId))

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
          sortModel={viewModel.sortModel}
          filterModel={viewModel.filterModel}
          pinnedColumns={viewModel.pinnedColumns}
          paginationModel={viewModel.paginationModel}
          columnVisibilityModel={viewModel.columnVisibilityModel}
          rows={viewModel.currentData}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: viewModel.columnsModel,
                columnVisibilityModel: viewModel.columnVisibilityModel,
                onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
              },
            },
          }}
          rowCount={viewModel.rowCount}
          getRowClassName={getRowClassName}
          columns={viewModel.columnsModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          onPinnedColumnsChange={viewModel.handlePinColumn}
          onSortModelChange={viewModel.onChangeSortingModel}
          onFilterModelChange={viewModel.onChangeFilterModel}
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
