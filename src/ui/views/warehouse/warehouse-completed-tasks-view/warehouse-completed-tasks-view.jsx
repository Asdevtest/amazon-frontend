import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TaskInfoModal} from '@components/modals/task-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseCompletedViewModel} from './warehouse-completed-tasks-view.model'
import {styles} from './warehouse-completed-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseCompletedTasksView
const navbarActiveCategory = 3

@observer
export class WarehouseCompletedTasksViewRaw extends Component {
  viewModel = new WarehouseCompletedViewModel({history: this.props.history})

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
      showTaskInfoModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
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
            setDrawerOpen={onChangeTriggerDrawerOpen}
            curUserRole={UserRole.STOREKEEPER}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
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
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  rows={getCurrentData()}
                  rowHeight={200}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => e.state.containerSizes?.isVirtualized && setDataGridState(e.state)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
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

export const WarehouseCompletedTasksView = withStyles(styles)(WarehouseCompletedTasksViewRaw)
