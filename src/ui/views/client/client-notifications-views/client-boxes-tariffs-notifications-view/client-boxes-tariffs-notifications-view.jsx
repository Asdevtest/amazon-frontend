import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BoxViewForm} from '@components/forms/box-view-form'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {MainContent} from '@components/layout/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientBoxesTariffsNotificationsViewModel} from './client-boxes-tariffs-notifications-view.model'
import {styles} from './client-boxes-tariffs-notifications-view.style'

@observer
class ClientBoxesTariffsNotificationsViewRaw extends Component {
  viewModel = new ClientBoxesTariffsNotificationsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      warningInfoModalSettings,
      userInfo,
      storekeepersData,
      volumeWeightCoefficient,
      curBox,
      showBoxViewModal,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      showEditHSCodeModal,
      hsCodeData,
      rowsPerPage,
      curPage,
      onClickHsCode,
      onClickSaveHsCode,
      onChangeCurPage,
      onChangeRowsPerPage,
      setCurrentOpenedBox,
      showConfirmModal,
      showSelectionStorekeeperAndTariffModal,
      showWarningInfoModal,
      confirmModalSettings,
      onTriggerOpenModal,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onClickConfirmTarrifChangeBtn,
      onSubmitChangeBoxFields,
      changeColumnsModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.tableWrapper}>
            <MemoDataGrid
              pagination
              useResizeContainer
              disableVirtualization
              localeText={getLocalizationByLanguageTag()}
              classes={{
                row: classNames.row,
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,
              }}
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
              componentsProps={{
                toolbar: {
                  columsBtnSettings: {columnsModel, changeColumnsModel},
                },
              }}
              onSelectionModelChange={newSelection => {
                onSelectionModel(newSelection[0])
              }}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onPageChange={onChangeCurPage}
              onStateChange={setDataGridState}
              onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
              onFilterModelChange={model => onChangeFilterModel(model)}
            />
          </div>
        </MainContent>

        <ConfirmationModal
          isWarning={confirmModalSettings.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => {
            confirmModalSettings.onClickOkBtn()
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <Modal
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')}
        >
          <SelectStorekeeperAndTariffForm
            inNotifications
            storekeepers={storekeepersData.filter(el => el._id === curBox?.storekeeper._id)}
            curStorekeeperId={curBox?.storekeeperId}
            curTariffId={curBox?.logicsTariffId}
            onSubmit={onClickConfirmTarrifChangeBtn}
          />
        </Modal>

        <Modal openModal={showBoxViewModal} setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}>
          <BoxViewForm
            userInfo={userInfo}
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
            onSubmitChangeFields={onSubmitChangeBoxFields}
            onClickHsCode={onClickHsCode}
          />
        </Modal>

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

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
      </React.Fragment>
    )
  }
}

export const ClientBoxesTariffsNotificationsView = withStyles(ClientBoxesTariffsNotificationsViewRaw, styles)
