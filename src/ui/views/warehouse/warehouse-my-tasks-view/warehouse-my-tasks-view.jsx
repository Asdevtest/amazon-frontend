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
import {Field} from '@components/field/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'

import {onStateChangeHandler} from '@utils/for-data-grid'
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
      densityModel,
      columnsModel,

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
      showConfirmModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerEditTaskModal,
      onTriggerShowBarcodeModal,
      onTriggerShowEditBoxModal,
      onClickSolveTask,
      onTriggerOpenModal,
      setTmpWarehouseComment,
      onClickConfirmCancelTask,

      onSelectionModel,
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
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showEditTaskModal} setOpenModal={onTriggerEditTaskModal}>
          <Typography variant="h5">{textConsts.taskModalTitle}</Typography>
          <EditTaskModal
            requestStatus={requestStatus}
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

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showCancelTaskModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseMyTasksView = withStyles(styles)(WarehouseMyTasksViewRaw)
