/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

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
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {EditTaskPriorityModal} from '@components/screens/warehouse/edit-task-priority-modal'
import {SearchInput} from '@components/search-input'
import {TaskPrioritySelector} from '@components/shared/task-priority-selector/task-priority-selector'

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
      currentStorekeeper,
      selectedStatus,
      operationType,
      nameSearchValue,
      requestStatus,
      onSearchSubmit,
      handleOperationType,
      handleSelectedStatus,
      onClickStorekeeperBtn,
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

              <div>
                <div className={classNames.filterHeader}>
                  <TaskPrioritySelector currentPriority={currentPriority} handleActivePriority={handleActivePriority} />
                  <div className={classNames.boxesFiltersWrapper}>
                    <Button
                      disabled={!selectedStatus}
                      className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !selectedStatus})}
                      variant="text"
                      onClick={() => handleSelectedStatus(null)}
                    >
                      {t(TranslationKey['All statuses'])}
                    </Button>

                    {Object.keys(mapTaskStatusKeyToEnum).map(el => (
                      <Button
                        key={el}
                        disabled={currentStorekeeper?._id === el}
                        className={cx(classNames.button, {
                          [classNames.selectedBoxesBtn]: selectedStatus === el,
                        })}
                        variant="text"
                        onClick={() => handleSelectedStatus(el)}
                      >
                        {TaskStatusTranslate(mapTaskStatusKeyToEnum[el])}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className={classNames.boxesFiltersWrapper}>
                  <Button
                    disabled={!currentStorekeeper?._id}
                    tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
                    className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !currentStorekeeper?._id})}
                    variant="text"
                    onClick={onClickStorekeeperBtn}
                  >
                    {t(TranslationKey['All warehouses'])}
                  </Button>

                  {storekeepersData
                    .slice()
                    .sort((a, b) => a.name?.localeCompare(b.name))
                    .map(storekeeper =>
                      storekeeper.boxesCount !== 0 ? (
                        <Button
                          key={storekeeper._id}
                          disabled={currentStorekeeper?._id === storekeeper._id}
                          className={cx(classNames.button, {
                            [classNames.selectedBoxesBtn]: currentStorekeeper?._id === storekeeper._id,
                          })}
                          variant="text"
                          onClick={() => onClickStorekeeperBtn(storekeeper)}
                        >
                          {storekeeper.name}
                        </Button>
                      ) : null,
                    )}
                </div>

                <div className={classNames.boxesFiltersWrapper}>
                  <Button
                    disabled={!operationType}
                    className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !operationType})}
                    variant="text"
                    onClick={() => handleOperationType(null)}
                  >
                    {t(TranslationKey['All tasks'])}
                  </Button>

                  {Object.keys(mapTaskOperationTypeKeyToEnum).map(el => (
                    <Button
                      key={el}
                      disabled={operationType === el}
                      className={cx(classNames.button, {
                        [classNames.selectedBoxesBtn]: operationType === el,
                      })}
                      variant="text"
                      onClick={() => handleOperationType(el)}
                    >
                      {taskOperationTypeTranslate(mapTaskOperationTypeEnumToKey[el])}
                    </Button>
                  ))}
                </div>
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
