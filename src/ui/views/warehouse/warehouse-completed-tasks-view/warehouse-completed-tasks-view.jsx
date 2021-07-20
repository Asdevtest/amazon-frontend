import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {COMPLETED_TASKS_DATA, WAREHOUSE_TASKS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {BrowseTaskModal} from '@components/screens/warehouse/browse-task-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/warehouse/tasks-views/table-body-row'
import {TableHeadRow} from '@components/table-rows/warehouse/tasks-views/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseCompletedViewModel} from './warehouse-completed-tasks-view.model'
import {styles} from './warehouse-completed-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseCompletedTasksView
const navbarActiveCategory = 2

@observer
export class WarehouseCompletedTasksViewRaw extends Component {
  viewModel = new WarehouseCompletedViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      curPage,
      showBrowseTaskModal,
      rowsPerPage,
      history,
      selectedTaskIndex,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerBrowseTaskModal,
      onSelectTaskIndex,
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
                  data={COMPLETED_TASKS_DATA}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(COMPLETED_TASKS_DATA.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={{
                    onSelectTaskIndex,
                    onTriggerBrowseTaskModal,
                  }}
                  type={'completed'}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showBrowseTaskModal} setOpenModal={onTriggerBrowseTaskModal}>
          <Typography variant="h5">{textConsts.taskModalTitle}</Typography>
          <BrowseTaskModal
            task={COMPLETED_TASKS_DATA[selectedTaskIndex]}
            onClickOpenCloseModal={onTriggerBrowseTaskModal}
          />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={WAREHOUSE_TASKS_HEAD_CELLS} />)
}

export const WarehouseCompletedTasksView = withStyles(styles)(WarehouseCompletedTasksViewRaw)
