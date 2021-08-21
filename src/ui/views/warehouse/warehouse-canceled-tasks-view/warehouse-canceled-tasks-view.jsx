import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {WAREHOUSE_TASKS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TaskInfoModal} from '@components/modals/task-info-modal'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/warehouse/tasks-views/table-body-row'
import {WarehouseTasksBodyRowViewMode} from '@components/table-rows/warehouse/tasks-views/table-body-row/table-body-row'
import {TableHeadRow} from '@components/table-rows/warehouse/tasks-views/table-head-row'

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
  }

  render() {
    const {
      tasksMy,
      curOpenedTask,
      drawerOpen,
      curPage,
      rowsPerPage,
      history,
      showTaskInfoModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      setCurrentOpenedTask,
      onTriggerOpenModal,
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
                <Table
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

  renderHeadRow = (<TableHeadRow headCells={WAREHOUSE_TASKS_HEAD_CELLS} />)
}

export const WarehouseCanceledTasksView = withStyles(styles)(WarehouseCanceledTasksViewRaw)
