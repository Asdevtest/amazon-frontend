import {cx} from '@emotion/css'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Alert, Button} from '@mui/material'

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
import {mapTaskPriorityStatusEnum, taskPriorityStatusTranslate} from '@constants/task-priority-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseVacantViewModel} from './warehouse-vacant-tasks-view.model'
import {styles} from './warehouse-vacant-tasks-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TASKS
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_VAC_TASKS

@observer
export class WarehouseVacantTasksViewRaw extends Component {
  viewModel = new WarehouseVacantViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curTaskType,
      curTaskPriority,
      rowCount,
      selectedTasks,
      showAcceptMessage,
      acceptMessage,
      nameSearchValue,
      volumeWeightCoefficient,
      curOpenedTask,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      showTwoVerticalChoicesModal,
      showTaskInfoModal,

      drawerOpen,
      curPage,
      rowsPerPage,

      goToMyTasks,
      onClickPickupManyTasksBtn,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      setCurrentOpenedTask,

      onSearchSubmit,
      onClickOperationTypeBtn,
      onClickTaskPriorityBtn,
      onClickReportBtn,
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
          <Appbar title={t(TranslationKey['New tasks'])} setDrawerOpen={onChangeTriggerDrawerOpen}>
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
                      </Button>
                    ))}
                </div>

                {window.innerWidth < 1282 && (
                  <Button
                    variant="contained"
                    disabled={!selectedTasks.length}
                    className={classNames.pickupOrdersButton}
                    onClick={onClickPickupManyTasksBtn}
                  >
                    {t(TranslationKey['Take on the work of the selected'])}
                  </Button>
                )}

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
                {window.innerWidth > 1281 && (
                  <Button
                    variant="contained"
                    disabled={!selectedTasks.length}
                    className={classNames.pickupOrdersButton}
                    onClick={onClickPickupManyTasksBtn}
                  >
                    {t(TranslationKey['Take on the work of the selected'])}
                  </Button>
                )}

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
                  useResizeContainer
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

                    columnHeaderDraggableContainer: classNames.columnHeaderDraggableContainer,
                    columnHeaderTitleContainer: classNames.columnHeaderTitleContainer,
                    iconSeparator: classNames.iconSeparator,
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
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                  onRowDoubleClick={params => setCurrentOpenedTask(params.row.originalData)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showTaskInfoModal} setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}>
          <EditTaskModal
            readOnly
            volumeWeightCoefficient={volumeWeightCoefficient}
            task={curOpenedTask}
            onClickOpenCloseModal={() => onTriggerOpenModal('showTaskInfoModal')}
          />
        </Modal>

        <TwoVerticalChoicesModal
          openModal={showTwoVerticalChoicesModal}
          setOpenModal={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Task picked up'])}
          topBtnText={t(TranslationKey['Go to task'])}
          bottomBtnText={t(TranslationKey['Continue to work with new tasks'])}
          onClickTopBtn={() => goToMyTasks()}
          onClickBottomBtn={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
        />

        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const WarehouseVacantTasksView = withStyles(WarehouseVacantTasksViewRaw, styles)
