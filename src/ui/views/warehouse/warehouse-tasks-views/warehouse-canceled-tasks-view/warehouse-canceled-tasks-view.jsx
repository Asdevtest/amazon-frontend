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
import {mapTaskPriorityStatusEnum, taskPriorityStatusTranslate} from '@constants/task-priority-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
// import {TaskInfoModal} from '@components/modals/task-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseCanceledTasksViewModel} from './warehouse-canceled-tasks-view.model'
import {styles} from './warehouse-canceled-tasks-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TASKS
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_CANCELED_TASKS

@observer
export class WarehouseCanceledTasksViewRaw extends Component {
  viewModel = new WarehouseCanceledTasksViewModel({history: this.props.history})

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
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      volumeWeightCoefficient,

      curOpenedTask,
      drawerOpen,
      curPage,
      rowsPerPage,
      history,
      showTaskInfoModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      setDataGridState,
      onChangeSortingModel,
      setCurrentOpenedTask,
      onSearchSubmit,
      onClickOperationTypeBtn,
      onClickTaskPriorityBtn,
      onSelectionModel,
      onClickReportBtn,
      changeColumnsModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={t(TranslationKey['Canceled tasks'])}
            history={history}
            setDrawerOpen={onChangeTriggerDrawerOpen}
          >
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
                  useResizeContainer
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
                  // rowHeight={200}
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
      </React.Fragment>
    )
  }
}

export const WarehouseCanceledTasksView = withStyles(WarehouseCanceledTasksViewRaw, styles)
