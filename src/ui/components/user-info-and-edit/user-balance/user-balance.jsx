import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DashboardBalance} from '@components/dashboards/dashboard-balance'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {AdminBalanceModal} from '@components/screens/users-views/sub-users-view/admin-balance-modal'

import {t} from '@utils/translations'

import {UserBalanceModel} from './user-balance.model'
import {useClassNames} from './user-balance.style'

export const UserBalance = observer(({userId}) => {
  const {classes: classNames} = useClassNames()
  const history = useHistory()
  const model = useRef(new UserBalanceModel({history, userId}))

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

    rowsPerPage,
    curPage,
    onChangeCurPage,
    onChangeRowsPerPage,
    onSelectionModel,

    setDataGridState,
    onChangeSortingModel,
    onChangeFilterModel,
  } = model.current

  const getRowClassName = params => (params.row.sum < 0 ? classNames.redRow : params.row.sum > 0 && classNames.greenRow)

  return (
    <div className={classNames.mainWrapper}>
      <DashboardBalance user={user} title={t(TranslationKey.Balance)} />

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
      <div className={classNames.tableWrapper}>
        <MemoDataGrid
          pagination
          useResizeContainer
          // sx={{
          //   border: 0,
          //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
          //   backgroundColor: theme.palette.background.general,
          // }}
          getRowClassName={getRowClassName}
          sortModel={sortModel}
          filterModel={filterModel}
          page={curPage}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[15, 25, 50, 100]}
          rows={getCurrentData()}
          rowHeight={75}
          components={{
            Toolbar: DataGridCustomToolbar,
            ColumnMenuIcon: FilterAltOutlinedIcon,
          }}
          density={densityModel}
          columns={columnsModel}
          loading={requestStatus === loadingStatuses.isLoading}
          onSelectionModelChange={newSelection => {
            onSelectionModel(newSelection[0])
          }}
          onSortModelChange={onChangeSortingModel}
          onPageSizeChange={onChangeRowsPerPage}
          onPageChange={onChangeCurPage}
          onStateChange={setDataGridState}
          onFilterModelChange={model => onChangeFilterModel(model)}
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
