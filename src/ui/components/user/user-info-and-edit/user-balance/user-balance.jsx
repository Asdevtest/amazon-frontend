import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { AdminBalanceModal } from '@components/user/users-views/sub-users-view/admin-balance-modal'

import { t } from '@utils/translations'

import { useClassNames } from './user-balance.style'

import { UserBalanceModel } from './user-balance.model'

export const UserBalance = observer(({ userId }) => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const model = useRef(new UserBalanceModel({ history, userId }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    user,
    showReplenishModal,
    showWithdrawModal,
    makePayment,
    onTriggerReplenishModal,
    onTriggerWithdrawModal,

    requestStatus,
    getCurrentData,
    sortModel,
    filterModel,
    densityModel,
    columnsModel,

    onChangeSortingModel,
    onChangeFilterModel,
  } = model.current

  const getRowClassName = params => (params.row.sum < 0 ? classNames.redRow : params.row.sum > 0 && classNames.greenRow)

  return (
    <div className={classNames.mainWrapper}>
      <DashboardBalance user={user} title={t(TranslationKey.Balance) + ', $'} />

      <div className={classNames.btnsWrapper}>
        <Button
          disableElevation
          className={[classNames.button, classNames.depositBtn]}
          color="primary"
          variant="contained"
          onClick={onTriggerReplenishModal}
        >
          {t(TranslationKey.Deposit)}
        </Button>
        <Button
          disableElevation
          className={[classNames.button, classNames.cancelBtn]}
          color="primary"
          variant="text"
          onClick={onTriggerWithdrawModal}
        >
          {t(TranslationKey.Withdraw)}
        </Button>
      </div>
      <div className={classNames.tableWrapper}>
        <MemoDataGrid
          useResizeContainer
          getRowClassName={getRowClassName}
          sortModel={sortModel}
          filterModel={filterModel}
          columnVisibilityModel={model.current.columnVisibilityModel}
          paginationModel={model.current.paginationModel}
          pageSizeOptions={[15, 25, 50, 100]}
          rows={getCurrentData()}
          rowHeight={75}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              columsBtnSettings: {
                columnsModel: model.current.columnsModel,
                columnVisibilityModel: model.current.columnVisibilityModel,
                onColumnVisibilityModelChange: model.current.onColumnVisibilityModelChange,
              },
            },
          }}
          density={densityModel}
          columns={columnsModel}
          loading={requestStatus === loadingStatuses.isLoading}
          onSortModelChange={onChangeSortingModel}
          onPaginationModelChange={model.current.onChangePaginationModelChange}
          onFilterModelChange={onChangeFilterModel}
        />
      </div>
      <Modal openModal={showReplenishModal} setOpenModal={onTriggerReplenishModal}>
        <AdminBalanceModal user={user} onTriggerParentModal={onTriggerReplenishModal} onSubmit={makePayment} />
      </Modal>
      <Modal openModal={showWithdrawModal} setOpenModal={onTriggerWithdrawModal}>
        <AdminBalanceModal
          isWithdraw
          user={user}
          onTriggerParentModal={onTriggerWithdrawModal}
          onSubmit={makePayment}
        />
      </Modal>
    </div>
  )
})
