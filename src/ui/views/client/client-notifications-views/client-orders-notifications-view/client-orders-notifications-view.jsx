import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientOrdersNotificationsViewModel} from './client-orders-notifications-view.model'
import {styles} from './client-orders-notifications-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersNotificationsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS
const navbarActiveSubCategory = 0

@observer
class ClientOrdersNotificationsViewRaw extends Component {
  viewModel = new ClientOrdersNotificationsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      rowsPerPage,
      curPage,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onClickTableRow,
      showConfirmModal,
      confirmModalSettings,
      onTriggerOpenModal,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  classes={{
                    row: classNames.row,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={100}
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
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={confirmModalSettings.message}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={() => {
            confirmModalSettings.onClickOkBtn()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ClientOrdersNotificationsView = withStyles(styles)(ClientOrdersNotificationsViewRaw)
