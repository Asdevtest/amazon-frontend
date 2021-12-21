import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TaskInfoModal} from '@components/modals/task-info-modal'
import {Navbar} from '@components/navbar'

import {onStateChangeHandler} from '@utils/for-data-grid'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseCanceledTasksViewModel} from './warehouse-canceled-tasks-view.model'
import {styles} from './warehouse-canceled-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseCanceledTasksView
const navbarActiveCategory = navBarActiveCategory.NAVBAR_CANCELED_TASKS

@observer
export class WarehouseCanceledTasksViewRaw extends Component {
  viewModel = new WarehouseCanceledTasksViewModel({history: this.props.history})

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

      curOpenedTask,
      drawerOpen,
      curPage,
      rowsPerPage,
      history,
      showTaskInfoModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.STOREKEEPER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc=""
            history={history}
            setDrawerOpen={onChangeTriggerDrawerOpen}
            curUserRole={UserRole.STOREKEEPER}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  autoHeight
                  classes={{
                    row: classNames.row,
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={200}
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
                  onStateChange={e => onStateChangeHandler(e, setDataGridState)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <TaskInfoModal
          openModal={showTaskInfoModal}
          setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}
          task={curOpenedTask}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseCanceledTasksView = withStyles(styles)(WarehouseCanceledTasksViewRaw)
