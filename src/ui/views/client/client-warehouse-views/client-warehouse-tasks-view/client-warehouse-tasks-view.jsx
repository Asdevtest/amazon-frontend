/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
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
import {SearchInput} from '@components/search-input'

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
      taskColumnsModel,
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
      onTriggerDrawer,
      onChangeCurPageForTask,
      onChangeRowsPerPageForTask,
      onTriggerOpenModal,
      onClickCancelAfterConfirm,
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
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['Boxes in stock'])}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput
                  disabled
                  // value={nameSearchValue}
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by ASIN, Order ID, Item, Track number'])}
                  // onSubmit={onSearchSubmit}
                />
              </div>

              <div className={classNames.tasksWrapper}>
                <MemoDataGrid
                  // disableVirtualization
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
                  // pageSize={15}
                  rows={getCurrentTaskData()}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  columns={taskColumnsModel}
                  onPageSizeChange={onChangeRowsPerPageForTask}
                  onPageChange={onChangeCurPageForTask}
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
