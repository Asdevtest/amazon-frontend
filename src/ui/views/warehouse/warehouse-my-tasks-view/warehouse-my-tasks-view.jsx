import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button/error-button'
import {Field} from '@components/field/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {warehouseMyTasksViewColumns} from '@components/table-columns/warehouse/my-tasks-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseVacantViewModel} from './warehouse-my-tasks-view.model'
import {styles} from './warehouse-my-tasks-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseMyTasksView
const navbarActiveCategory = 2

@observer
export class WarehouseMyTasksViewRaw extends Component {
  viewModel = new WarehouseVacantViewModel({history: this.props.history})

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

      drawerOpen,
      curPage,
      showEditTaskModal,
      rowsPerPage,
      selectedTask,
      progressValue,
      tmpWarehouseComment,
      showProgress,
      showEditBoxModal,
      showNoDimensionsErrorModal,
      showCancelTaskModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerEditTaskModal,
      onTriggerShowBarcodeModal,
      onTriggerShowEditBoxModal,
      onClickSolveTask,
      onTriggerOpenModal,
      setTmpWarehouseComment,
      // onClickCancelTask,
      onClickConfirmCancelTask,

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
                  columns={warehouseMyTasksViewColumns(this.renderBtns)}
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
        <Modal openModal={showEditTaskModal} setOpenModal={onTriggerEditTaskModal}>
          <Typography variant="h5">{textConsts.taskModalTitle}</Typography>
          <EditTaskModal
            task={selectedTask}
            showEditBoxModal={showEditBoxModal}
            progressValue={progressValue}
            showProgress={showProgress}
            onTriggerShowEditBoxModal={onTriggerShowEditBoxModal}
            onClickOpenCloseModal={onTriggerEditTaskModal}
            onSetBarcode={onTriggerShowBarcodeModal}
            onEditBox={onTriggerShowEditBoxModal}
            onClickSolveTask={onClickSolveTask}
          />
        </Modal>

        <Modal openModal={showCancelTaskModal} setOpenModal={() => onTriggerOpenModal('showCancelTaskModal')}>
          <Typography variant="h5">{textConsts.modalMergeTitle}</Typography>
          <Field
            multiline
            className={classNames.heightFieldAuto}
            rows={4}
            rowsMax={6}
            label={textConsts.modalCancelTaskLabel}
            value={tmpWarehouseComment}
            onChange={e => setTmpWarehouseComment(e)}
          />
          <div className={classNames.buttonsWrapper}>
            <Button
              color="primary"
              variant="contained"
              className={classNames.button}
              onClick={() => onClickConfirmCancelTask()}
            >
              {textConsts.okBtn}
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classNames.button}
              onClick={() => onTriggerOpenModal('showCancelTaskModal')}
            >
              {textConsts.cancelBtn}
            </Button>
          </div>
        </Modal>

        <WarningInfoModal
          openModal={showNoDimensionsErrorModal}
          setOpenModal={() => onTriggerOpenModal('showNoDimensionsErrorModal')}
          title={textConsts.dimensionsMessage}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showNoDimensionsErrorModal')
          }}
        />
      </React.Fragment>
    )
  }

  renderBtns = params => (
    <React.Fragment>
      <div>
        <Button onClick={() => this.viewModel.onClickResolveBtn(params.row)}>{textConsts.resolveBtn}</Button>

        {params.row.operationType !== TaskOperationType.RECEIVE && (
          <ErrorButton
            className={this.props.classes.rowCancelBtn}
            onClick={() => {
              this.viewModel.onClickCancelTask(params.row.boxes[0]._id, params.row.id, params.row.operationType)
            }}
          >
            {textConsts.cancelBtn}
          </ErrorButton>
        )}
      </div>
    </React.Fragment>
  )
}

export const WarehouseMyTasksView = withStyles(styles)(WarehouseMyTasksViewRaw)
