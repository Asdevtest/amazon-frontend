/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Checkbox, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {
  mapTaskOperationTypeEnumToKey,
  mapTaskOperationTypeKeyToEnum,
  taskOperationTypeTranslate,
} from '@constants/task-operation-type'
import {mapTaskPriorityStatusEnum, taskPriorityStatusTranslate} from '@constants/task-priority-status'
import {mapTaskStatusKeyToEnum, TaskStatusTranslate} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {EditTaskPriorityModal} from '@components/screens/warehouse/edit-task-priority-modal'
import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'
import {Modal} from '@components/shared/modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientWarehouseTasksViewModel} from './client-warehouse-tasks-view.model'
import {styles} from './client-warehouse-tasks-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_TASKS

@observer
export class ClientWarehouseTasksViewRaw extends Component {
  viewModel = new ClientWarehouseTasksViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedStorekeeperFilters,
      confirmModalSettings,
      volumeWeightCoefficient,
      columnsModel,
      getCurrentTaskData,

      curOpenedTask,
      drawerOpen,
      curPageForTask,
      rowsPerPageForTask,
      showConfirmModal,
      showTaskInfoModal,
      showProgress,
      showConfirmWithCommentModal,
      showWarningInfoModal,
      warningInfoModalSettings,
      rowsCount,
      showEditPriorityData,
      columnMenuSettings,
      editPriorityData,
      currentPriority,
      storekeepersData,
      selectFilterForField,
      activeFilters,
      nameSearchValue,
      requestStatus,
      onSearchSubmit,
      onSelectionModel,
      changeColumnsModel,
      onChangeFilterModel,
      onChangeSortingModel,
      onTriggerDrawer,
      onChangeCurPageForTask,
      onChangeRowsPerPageForTask,
      onTriggerOpenModal,
      onClickCancelAfterConfirm,
      handleActivePriority,
      updateTaskPriority,
      getTasksMy,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Tasks)}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput
                  // disabled
                  value={nameSearchValue}
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by ASIN, Order ID, Item'])}
                  onSubmit={onSearchSubmit}
                />
              </div>

              <div className={classNames.filters}>
                <WithSearchSelect
                  notCloseOneClick
                  isFlat
                  checkbox
                  getRowValue={el => taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[Number(el)])}
                  selectedItemName={t(TranslationKey['All priorities'])}
                  data={Object.keys(mapTaskPriorityStatusEnum).reverse()}
                  currentShops={activeFilters.priority}
                  firstItems={
                    <Button
                      className={classNames.filterBtn}
                      variant="text"
                      onClick={() => {
                        selectFilterForField(
                          'priority',
                          Object.keys(mapTaskPriorityStatusEnum).length === activeFilters.priority.length
                            ? []
                            : Object.keys(mapTaskPriorityStatusEnum),
                        )
                      }}
                    >
                      <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                        <>
                          <Checkbox
                            checked={Object.keys(mapTaskPriorityStatusEnum).length === activeFilters.priority.length}
                            color="primary"
                          />
                          <Typography className={classNames.fieldName}>
                            {t(TranslationKey['All priorities'])}
                          </Typography>
                        </>
                      </div>
                    </Button>
                  }
                  onClickSelect={el => selectFilterForField('priority', el)}
                  onClickSubmitBtn={getTasksMy}
                />

                <WithSearchSelect
                  notCloseOneClick
                  isFlat
                  checkbox
                  getRowValue={el => TaskStatusTranslate(mapTaskStatusKeyToEnum[el])}
                  selectedItemName={t(TranslationKey['All statuses'])}
                  data={Object.keys(mapTaskStatusKeyToEnum)}
                  currentShops={activeFilters.status}
                  firstItems={
                    <Button
                      className={classNames.filterBtn}
                      variant="text"
                      onClick={() => {
                        selectFilterForField(
                          'status',
                          Object.keys(mapTaskStatusKeyToEnum).length === activeFilters.status.length
                            ? []
                            : Object.keys(mapTaskStatusKeyToEnum),
                        )
                      }}
                    >
                      <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                        <>
                          <Checkbox
                            checked={Object.keys(mapTaskStatusKeyToEnum).length === activeFilters.status.length}
                            color="primary"
                          />
                          <Typography className={classNames.fieldName}>{t(TranslationKey['All statuses'])}</Typography>
                        </>
                      </div>
                    </Button>
                  }
                  onClickSelect={el => selectFilterForField('status', el)}
                  onClickSubmitBtn={getTasksMy}
                />

                <WithSearchSelect
                  checkbox
                  notCloseOneClick
                  selectedItemName={t(TranslationKey['All warehouses'])}
                  data={storekeepersData}
                  searchFields={['name']}
                  currentShops={activeFilters.storekeeper}
                  firstItems={
                    <Button
                      className={classNames.filterBtn}
                      variant="text"
                      onClick={() => {
                        selectFilterForField(
                          'storekeeper',
                          storekeepersData.length === activeFilters.storekeeper.length ? [] : storekeepersData,
                        )
                      }}
                    >
                      <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                        <>
                          <Checkbox
                            checked={storekeepersData.length === activeFilters.storekeeper.length}
                            color="primary"
                          />
                          <Typography className={classNames.fieldName}>
                            {t(TranslationKey['All warehouses'])}
                          </Typography>
                        </>
                      </div>
                    </Button>
                  }
                  onClickSelect={el => selectFilterForField('storekeeper', el, '_id')}
                  onClickSubmitBtn={getTasksMy}
                />

                <WithSearchSelect
                  notCloseOneClick
                  isFlat
                  checkbox
                  getRowValue={el => taskOperationTypeTranslate(mapTaskOperationTypeEnumToKey[el])}
                  selectedItemName={t(TranslationKey['All tasks'])}
                  data={Object.keys(mapTaskOperationTypeKeyToEnum)}
                  currentShops={activeFilters.type}
                  firstItems={
                    <Button
                      className={classNames.filterBtn}
                      variant="text"
                      onClick={() => {
                        selectFilterForField(
                          'type',
                          Object.keys(mapTaskOperationTypeKeyToEnum).length === activeFilters.type.length
                            ? []
                            : Object.keys(mapTaskOperationTypeKeyToEnum),
                        )
                      }}
                    >
                      <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                        <>
                          <Checkbox
                            checked={Object.keys(mapTaskOperationTypeKeyToEnum).length === activeFilters.type.length}
                            color="primary"
                          />
                          <Typography className={classNames.fieldName}>{t(TranslationKey['All tasks'])}</Typography>
                        </>
                      </div>
                    </Button>
                  }
                  onClickSelect={el => selectFilterForField('type', el)}
                  onClickSubmitBtn={getTasksMy}
                />
              </div>

              <div className={classNames.tasksWrapper}>
                <MemoDataGrid
                  // disableVirtualization
                  key={SettingsModel.languageTag}
                  pagination
                  classes={{
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                  }}
                  localeText={getLocalizationByLanguageTag()}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  page={curPageForTask}
                  pageSize={rowsPerPageForTask}
                  sortingMode="server"
                  rows={getCurrentTaskData()}
                  getRowHeight={() => 'auto'}
                  componentsProps={{
                    columnMenu: columnMenuSettings,
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                    ColumnMenu: DataGridCustomColumnMenuComponent,
                  }}
                  loading={requestStatus === loadingStatuses.isLoading}
                  columns={columnsModel}
                  paginationMode="server"
                  // pageSize={15}
                  rowCount={rowsCount}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageChange={onChangeCurPageForTask}
                  onFilterModelChange={onChangeFilterModel}
                  // onStateChange={setDataGridState}
                  onPageSizeChange={onChangeRowsPerPageForTask}
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

        <Modal openModal={showTaskInfoModal} setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}>
          <EditTaskModal
            readOnly
            volumeWeightCoefficient={volumeWeightCoefficient}
            task={curOpenedTask}
            onClickOpenCloseModal={() => onTriggerOpenModal('showTaskInfoModal')}
          />
        </Modal>

        <ConfirmWithCommentModal
          isWarning
          openModal={showConfirmWithCommentModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmWithCommentModal')}
          titleText={t(TranslationKey.Attention)}
          commentLabelText={t(TranslationKey['Are you sure you want to cancel the task?'])}
          okBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onSubmit={onClickCancelAfterConfirm}
        />

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningInfoModal}
          setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningInfoModal')
          }}
        />

        {showProgress && <CircularProgressWithLabel />}
      </React.Fragment>
    )
  }
}

export const ClientWarehouseTasksView = withStyles(ClientWarehouseTasksViewRaw, styles)
