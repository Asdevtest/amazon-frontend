import {cx} from '@emotion/css'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {
  mapTaskOperationTypeKeyToEnum,
  TaskOperationType,
  taskOperationTypeTranslate,
} from '@constants/task-operation-type'
import {
  mapTaskPriorityStatusEnum,
  TaskPriorityStatus,
  taskPriorityStatusTranslate,
} from '@constants/task-priority-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {EditTaskPriorityModal} from '@components/screens/warehouse/edit-task-priority-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseMyTasksViewModel} from './warehouse-my-tasks-view.model'
import {styles} from './warehouse-my-tasks-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TASKS
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_MY_TASKS

@observer
export class WarehouseMyTasksViewRaw extends Component {
  viewModel = new WarehouseMyTasksViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedTasks,
      curTaskType,
      curTaskPriority,
      rowCount,
      nameSearchValue,
      volumeWeightCoefficient,
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
      showProgress,
      showEditBoxModal,
      showNoDimensionsErrorModal,
      showCancelTaskModal,
      showConfirmModal,
      showEditPriorityData,
      editPriorityData,
      updateTaskPriority,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerEditTaskModal,
      onTriggerShowBarcodeModal,
      onTriggerShowEditBoxModal,
      onClickSolveTask,
      onTriggerOpenModal,
      onClickConfirmCancelTask,
      onSelectionModel,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onClickResolveBtn,

      onSearchSubmit,
      onClickOperationTypeBtn,
      onClickReportBtn,
      onClickTaskPriorityBtn,
      changeColumnsModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params =>
      params.row.originalData.operationType === TaskOperationType.RECEIVE && params.row.barcode && classNames.successRow

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My tasks'])} setDrawerOpen={onChangeTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <div className={classNames.boxesFiltersWrapper}>
                  <Button
                    disabled={curTaskPriority === null}
                    className={cx(classNames.button, {[classNames.selectedBoxesBtn]: curTaskPriority === null})}
                    variant="text"
                    onClick={() => onClickTaskPriorityBtn(null)}
                  >
                    {t(TranslationKey['All priorities'])}
                  </Button>

                  {Object.keys(mapTaskPriorityStatusEnum)
                    .reverse()
                    .map(type => (
                      <Button
                        key={type}
                        disabled={curTaskPriority === type}
                        className={cx(classNames.button, {
                          [classNames.selectedBoxesBtn]: curTaskPriority === type,
                        })}
                        variant="text"
                        onClick={() => onClickTaskPriorityBtn(type)}
                      >
                        {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[type])}

                        {TaskPriorityStatus.URGENT === mapTaskPriorityStatusEnum[type] && (
                          <img className={classNames.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
                        )}
                      </Button>
                    ))}
                </div>
                <Button
                  variant="contained"
                  disabled={
                    !selectedTasks.length ||
                    selectedTasks.length > 1 ||
                    getCurrentData().filter(el => selectedTasks.includes(el.id))[0]?.originalData.operationType !==
                      TaskOperationType.RECEIVE
                  }
                  className={classNames.pickupOrdersButton}
                  onClick={onClickReportBtn}
                >
                  {t(TranslationKey['Download task file'])}
                  <FileDownloadIcon />
                </Button>
              </div>

              <div className={classNames.headerWrapper}>
                <div className={classNames.boxesFiltersWrapper}>
                  <Button
                    disabled={curTaskType === null}
                    className={cx(classNames.button, {[classNames.selectedBoxesBtn]: curTaskType === null})}
                    variant="text"
                    onClick={() => onClickOperationTypeBtn(null)}
                  >
                    {t(TranslationKey['All tasks'])}
                  </Button>

                  {Object.keys(mapTaskOperationTypeKeyToEnum)
                    .filter(el => el !== TaskOperationType.EDIT_BY_STOREKEEPER)
                    .map(type => (
                      <Button
                        key={type}
                        disabled={curTaskType === type}
                        className={cx(classNames.button, {
                          [classNames.selectedBoxesBtn]: curTaskType === type,
                        })}
                        variant="text"
                        onClick={() => onClickOperationTypeBtn(type)}
                      >
                        {taskOperationTypeTranslate(type)}
                      </Button>
                    ))}
                </div>

                <SearchInput
                  value={nameSearchValue}
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by ASIN, Order ID, Item, Track number'])}
                  onSubmit={onSearchSubmit}
                />
              </div>
              <div className={classNames.tableWrapper}>
                <MemoDataGrid
                  pagination
                  checkboxSelection
                  disableVirtualization
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                    filterForm: classNames.filterForm,
                  }}
                  getRowClassName={getRowClassName}
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  getRowHeight={() => '147px'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  componentsProps={{
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onFilterModelChange={onChangeFilterModel}
                  onRowDoubleClick={params => onClickResolveBtn(params.row.originalData)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showEditPriorityData} setOpenModal={() => onTriggerOpenModal('showEditPriorityData')}>
          <EditTaskPriorityModal
            data={editPriorityData}
            handleClose={() => onTriggerOpenModal('showEditPriorityData')}
            onSubmitHandler={updateTaskPriority}
          />
        </Modal>

        <Modal
          missClickModalOn
          dialogContextClassName={classNames.resolveTaskModalContent}
          openModal={showEditTaskModal}
          setOpenModal={onTriggerEditTaskModal}
        >
          <EditTaskModal
            requestStatus={requestStatus}
            volumeWeightCoefficient={volumeWeightCoefficient}
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

        <ConfirmWithCommentModal
          isWarning
          openModal={showCancelTaskModal}
          setOpenModal={() => {
            onTriggerOpenModal('showCancelTaskModal')
            onTriggerOpenModal('showConfirmModal')
          }}
          titleText={t(TranslationKey['Cancel task'])}
          commentLabelText={t(TranslationKey['Reason for canceling the task'])}
          okBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onSubmit={onClickConfirmCancelTask}
        />

        <WarningInfoModal
          openModal={showNoDimensionsErrorModal}
          setOpenModal={() => onTriggerOpenModal('showNoDimensionsErrorModal')}
          title={t(TranslationKey['Enter dimensions'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showNoDimensionsErrorModal')
          }}
        />

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey['Confirm action'])}
          message={t(TranslationKey['After confirmation, the task will be cancelled. Confirm?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showCancelTaskModal')
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseMyTasksView = withStyles(WarehouseMyTasksViewRaw, styles)
