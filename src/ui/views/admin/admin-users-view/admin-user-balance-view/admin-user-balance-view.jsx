import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import {Component} from 'react'

import {Button, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {AdminBalanceModal} from '@components/screens/users-views/sub-users-view/admin-balance-modal'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {AdminUserBalanceViewModel} from './admin-user-balance-view.model'
import {styles} from './admin-user-balance-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_USERS

@observer
class AdminUserBalanceViewRaw extends Component {
  viewModel = new AdminUserBalanceViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      user,
      drawerOpen,
      showReplenishModal,
      showWithdrawModal,
      makePayment,
      onTriggerReplenishModal,
      onTriggerWithdrawModal,
      onTriggerDrawer,

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
    } = this.viewModel
    const {classes: classNames} = this.props

    const getRowClassName = params =>
      params.getValue(params.id, 'sum') < 0
        ? classNames.redRow
        : params.getValue(params.id, 'sum') > 0 && classNames.greenRow

    return (
      <>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['User balance'])}>
            <MainContent>
              <Typography variant="h5">{`${t(TranslationKey.Balance)}  ${user.email}`}</Typography>
              <Typography className={classNames.balanceTitle}>{toFixedWithDollarSign(user.balance, 2)}</Typography>
              {user.balanceFreeze !== 0 && (
                <Typography className={classNames.balanceFreeze}>{`${toFixedWithDollarSign(
                  user.balanceFreeze,
                  2,
                )} -freeze`}</Typography>
              )}
              <Button
                disableElevation
                className={classNames.mr2}
                color="primary"
                variant="contained"
                onClick={onTriggerReplenishModal}
              >
                {t(TranslationKey.Deposit)}
              </Button>
              <Button disableElevation color="primary" onClick={onTriggerWithdrawModal}>
                {t(TranslationKey.Withdraw)}
              </Button>

              <div className={classNames.tableWrapper}>
                <Typography variant="h6">{t(TranslationKey['Balance changes'])}</Typography>

                <DataGrid
                  pagination
                  useResizeContainer
                  getRowClassName={getRowClassName}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={75}
                  components={{
                    Toolbar: GridToolbar,
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
            </MainContent>
          </Appbar>
        </Main>
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
      </>
    )
  }
}

export const AdminUserBalanceView = withStyles(styles)(AdminUserBalanceViewRaw)
