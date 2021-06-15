import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {VACANT_TASKS_DATA, WAREHOUSE_TASKS_HEAD_CELLS} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {SetBarcodeModal} from '@components/screens/set-barcode-modal'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {EditBoxModal} from '@components/screens/warehouse/edit-task-modal/edit-box-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/warehouse/tasks-views/table-body-row'
import {TableHeadRow} from '@components/table-rows/warehouse/tasks-views/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseVacantViewModel} from './warehouse-vacant-tasks-view.model'
import {styles} from './warehouse-vacant-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseVacantTasksView
const navbarActiveCategory = 1

@observer
export class WarehouseVacantTasksViewRaw extends Component {
  viewModel = new WarehouseVacantViewModel({history: this.props.history})

  render() {
    const {
      drawerOpen,
      curPage,
      showEditTaskModal,
      rowsPerPage,
      selectedTaskIndex,
      showBarcodeModal,
      showEditBoxModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerEditTaskModal,
      onSelectTaskIndex,
      onTriggerShowBarcodeModal,
      onTriggerShowEditBoxModal,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.WAREHOUSE}
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
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeTriggerDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <Table
                  currentPage={curPage}
                  data={VACANT_TASKS_DATA}
                  handlerPageChange={onChangeCurPage}
                  handlerRowsPerPage={onChangeRowsPerPage}
                  pageCount={Math.ceil(VACANT_TASKS_DATA.length / rowsPerPage)}
                  BodyRow={TableBodyRow}
                  renderHeadRow={this.renderHeadRow}
                  rowsPerPage={rowsPerPage}
                  rowsHandlers={{
                    onSelectTaskIndex,
                    onTriggerEditTaskModal,
                  }}
                  type={'vacant'}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showEditTaskModal} setOpenModal={onTriggerEditTaskModal}>
          <Typography variant="h5">{textConsts.taskModalTitle}</Typography>
          <EditTaskModal
            task={VACANT_TASKS_DATA[selectedTaskIndex]}
            onClickOpenCloseModal={onTriggerEditTaskModal}
            onSetBarcode={onTriggerShowBarcodeModal}
            onEditBox={onTriggerShowEditBoxModal}
          />
        </Modal>
        <Modal openModal={showBarcodeModal} setOpenModal={onTriggerShowBarcodeModal}>
          <SetBarcodeModal setModalBarcode={onTriggerShowBarcodeModal} />
        </Modal>
        <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
          <EditBoxModal setEditModal={onTriggerShowEditBoxModal} />
        </Modal>
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={WAREHOUSE_TASKS_HEAD_CELLS} />)
}

export const WarehouseVacantTasksView = withStyles(styles)(WarehouseVacantTasksViewRaw)
