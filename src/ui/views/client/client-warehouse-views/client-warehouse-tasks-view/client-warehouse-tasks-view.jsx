/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {DataGridCustomColumnMenuComponent} from '@components/data-grid-custom-components/data-grid-custom-column-component'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BoxViewForm} from '@components/forms/box-view-form'
import {EditBoxForm} from '@components/forms/edit-box-form'
import {EditMultipleBoxesForm} from '@components/forms/edit-multiple-boxes-form'
import {GroupingBoxesForm} from '@components/forms/grouping-boxes-form'
import {RequestToSendBatchForm} from '@components/forms/request-to-send-batch-form'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ConfirmWithCommentModal} from '@components/modals/confirmation-with-comment-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {MergeBoxesModal} from '@components/modals/merge-boxes-modal'
import {SetChipValueModal} from '@components/modals/set-chip-value-modal'
import {SetShippingLabelModal} from '@components/modals/set-shipping-label-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {RedistributeBox} from '@components/screens/warehouse/reditstribute-box-modal'
import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientWarehouseTasksViewModel} from './client-warehouse-tasks-view.model'
import {styles} from './client-warehouse-tasks-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES
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
