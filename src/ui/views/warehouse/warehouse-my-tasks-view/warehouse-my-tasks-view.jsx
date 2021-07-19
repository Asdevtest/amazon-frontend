/* eslint-disable no-unused-vars */
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
import {Modal} from '@components/modal'
import {ErrorInfoModal} from '@components/modals/error-info-modal'
// import { SetBarcodeModal } from '@components/modals/set-barcode-modal'; опять же пригодится?
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/warehouse/tasks-views/table-body-row'
import {WarehouseTasksBodyRowViewMode} from '@components/table-rows/warehouse/tasks-views/table-body-row/table-body-row'
import {TableHeadRow} from '@components/table-rows/warehouse/tasks-views/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseVacantViewModel} from './warehouse-my-tasks-view.model'
import {styles} from './warehouse-my-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseVacantTasksView
const navbarActiveCategory = 1
const navBarActiveSubCategory = 1

@observer
export class WarehouseMyTasksViewRaw extends Component {
  viewModel = new WarehouseVacantViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      tasksMy,
      drawerOpen,
      curPage,
      showEditTaskModal,
      rowsPerPage,
      selectedTask,
      showEditBoxModal,
      showNoDimensionsErrorModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerEditTaskModal,
      onSelectTask,
      onTriggerShowBarcodeModal,
      onTriggerShowEditBoxModal,
      onCancelMergeBoxes,
      onCancelSplitBoxes,
      onClickSolveTask,
      onSubmitUpdateBoxes,
      onTriggerOpenModal,
      tmpBarCode,
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
          activeSubCategory={navBarActiveSubCategory}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc=""
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
                    onSelectTask,
                    onTriggerEditTaskModal,
                    onCancelMergeBoxes,
                    onCancelSplitBoxes,
                  }}
                  viewMode={WarehouseTasksBodyRowViewMode.MY}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showEditTaskModal} setOpenModal={onTriggerEditTaskModal}>
          <Typography variant="h5">{textConsts.taskModalTitle}</Typography>
          <EditTaskModal
            task={selectedTask}
            tmpBarCode={tmpBarCode}
            showEditBoxModal={showEditBoxModal}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onClickOpenCloseModal={onTriggerEditTaskModal}
            onSetBarcode={onTriggerShowBarcodeModal}
            onEditBox={onTriggerShowEditBoxModal}
            onClickSolveTask={onClickSolveTask}
            onSubmitUpdateBoxes={onSubmitUpdateBoxes}
          />
        </Modal>

        <ErrorInfoModal
          openModal={showNoDimensionsErrorModal}
          setOpenModal={() => onTriggerOpenModal('showNoDimensionsErrorModal')}
          title={textConsts.dimensionsMessage}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showNoDimensionsErrorModal')
          }}
        />

        {/* Наверно еще пригодится тут? */}
        {/* <Modal openModal={showBarcodeModal} setOpenModal={onTriggerShowBarcodeModal}>
          <SetBarcodeModal
            task={selectedTask}
            barCode={tmpBarCode}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={onTriggerShowBarcodeModal}
          />
        </Modal> */}
      </React.Fragment>
    )
  }

  renderHeadRow = (<TableHeadRow headCells={WAREHOUSE_TASKS_HEAD_CELLS} />)
}

export const WarehouseMyTasksView = withStyles(styles)(WarehouseMyTasksViewRaw)
