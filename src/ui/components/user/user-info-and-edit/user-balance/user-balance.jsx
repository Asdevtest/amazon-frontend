import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { DashboardBalance } from '@components/dashboards/dashboard-balance'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'
import { AdminBalanceModal } from '@components/user/users-views/sub-users-view/admin-balance-modal'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './user-balance.style'

import { UserBalanceModel } from './user-balance.model'

export const UserBalance = observer(({ userId }) => {
  const { classes: styles, cx } = useStyles()
  const history = useNavigate()
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

  const getRowClassName = params => (params.row.sum < 0 ? styles.redRow : params.row.sum > 0 && styles.greenRow)

  return (
    <div className={styles.mainWrapper}>
      <DashboardBalance user={user} />

      <div className={styles.btnsWrapper}>
        <Button className={cx(styles.button, styles.depositBtn)} onClick={onTriggerReplenishModal}>
          {t(TranslationKey.Deposit)}
        </Button>
        <Button
          className={cx(styles.button, styles.cancelBtn)}
          variant={ButtonVariant.OUTLINED}
          onClick={onTriggerWithdrawModal}
        >
          {t(TranslationKey.Withdraw)}
        </Button>
      </div>
      <div className={styles.tableWrapper}>
        <CustomDataGrid
          getRowClassName={getRowClassName}
          sortModel={sortModel}
          filterModel={filterModel}
          columnVisibilityModel={model.current.columnVisibilityModel}
          paginationModel={model.current.paginationModel}
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
          loading={requestStatus === loadingStatus.IS_LOADING}
          onSortModelChange={onChangeSortingModel}
          onPaginationModelChange={model.current.onPaginationModelChange}
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
