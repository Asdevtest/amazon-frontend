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
import {warehouseCanceledTasksViewColumns} from '@components/table-columns/warehouse/canceled-tasks-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseCanceledTasksViewModel} from './warehouse-canceled-tasks-view.model'
import {styles} from './warehouse-canceled-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseCanceledTasksView
const navbarActiveCategory = 4

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

      // tasksMy,
      curOpenedTask,
      drawerOpen,
      curPage,
      rowsPerPage,
      history,
      showTaskInfoModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      // setCurrentOpenedTask,
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
            username={textConsts.appBarUsername}
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
                  columns={warehouseCanceledTasksViewColumns(this.renderBtns)}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection.selectionModel[0])
                  }}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={e => setDataGridState(e.state)}
                />

                {/* <Table
                  currentPage={curPage}
                  data={tasksMy}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(tasksMy.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={{
                    setCurrentOpenedTask,
                  }}
                  viewMode={WarehouseTasksBodyRowViewMode.MY}
                /> */}
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

  renderBtns = params => (
    <React.Fragment>
      <div>
        <Button onClick={() => this.viewModel.setCurrentOpenedTask(params.row)}>{textConsts.showBtn}</Button>
      </div>
    </React.Fragment>
  )
}

export const WarehouseCanceledTasksView = withStyles(styles)(WarehouseCanceledTasksViewRaw)
