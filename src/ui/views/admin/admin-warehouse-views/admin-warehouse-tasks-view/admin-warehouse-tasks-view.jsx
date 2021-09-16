import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TaskInfoModal} from '@components/modals/task-info-modal'
import {Navbar} from '@components/navbar'
import {adminTasksViewColumns} from '@components/table-columns/admin/tasks-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AdminWarehouseTasksViewModel} from './admin-warehouse-tasks-view.model'
import {styles} from './admin-warehouse-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminTasksView

const activeCategory = 4
const activeSubCategory = 0

@observer
export class AdminWarehouseTasksViewRaw extends Component {
  viewModel = new AdminWarehouseTasksViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curOpenedTask,
      showTaskInfoModal,
      onTriggerOpenModal,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      drawerOpen,
      rowsPerPage,
      history,
      curPage,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc=""
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
            curUserRole={UserRole.ADMIN}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>

              <div className={classNames.tableWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  checkboxSelection
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
                  columns={adminTasksViewColumns(this.renderAdminBtns)}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection.selectionModel[0])
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => setDataGridState(e.state)}
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

  renderAdminBtns = params => (
    <React.Fragment>
      <Button variant="contained" onClick={() => this.viewModel.setCurrentOpenedTask(params.row)}>
        {textConsts.actionBtn}
      </Button>
    </React.Fragment>
  )
}

export const AdminWarehouseTasksView = withStyles(styles)(AdminWarehouseTasksViewRaw)
