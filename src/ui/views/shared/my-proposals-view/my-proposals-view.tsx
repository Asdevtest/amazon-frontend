import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridCellParams, GridRowParams } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestDesignerResultForm } from '@components/forms/request-designer-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProposal } from '@typings/models/proposals/proposal'

import { useStyles } from './my-proposals-view.style'

import { customSwitcherSettings } from './my-proposals-view.constants'
import { MyProposalsViewModel } from './my-proposals-view.model'

export const MyProposalsView = observer(({ allProposals }: { allProposals: boolean }) => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new MyProposalsViewModel({ allProposals }), [])

  const getRowClassName = (params: GridRowParams) => {
    if (params?.row?.request?.freelanceNotices > 0) {
      return styles.redBorder
    }
  }

  const getCellClassName = (params: GridCellParams) => {
    if (params?.field === 'freelanceNotices' && params.row?.request?.freelanceNotices > 0) {
      return styles.unreadMessages
    }
  }

  return (
    <>
      <div className={styles.tablePanelWrapper}>
        <CustomRadioButton
          size="large"
          options={customSwitcherSettings()}
          defaultValue={viewModel.switcherCondition}
          onChange={viewModel.onClickChangeCatigory}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Title, ASIN, SKU, ID"
          onSearch={viewModel.onSearchSubmit}
        />

        <FreelanceTypeTaskSelect
          specs={viewModel.userInfo?.allowedSpec}
          selectedSpec={viewModel.specOption}
          onChangeSpec={viewModel.onChangeSpec}
        />
      </div>

      <CustomDataGrid
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        pinnedColumns={viewModel.pinnedColumns}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        getRowId={({ _id }: IProposal) => _id}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          columnMenu: viewModel.columnMenuSettings,
          toolbar: {
            resetFiltersBtnSettings: {
              onClickResetFilters: viewModel.onClickResetFilters,
              isSomeFilterOn: viewModel.isSomeFilterOn,
            },

            columsBtnSettings: {
              columnsModel: viewModel.columnsModel,
              columnVisibilityModel: viewModel.columnVisibilityModel,
              onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
            },

            sortSettings: {
              sortModel: viewModel.sortModel,
              columnsModel: viewModel.columnsModel,
              onSortModelChange: viewModel.onChangeSortingModel,
            },

            tablePresets: {
              showPresetsSelect: viewModel.showPresetsSelect,
              presetsTableData: viewModel.presetsTableData,
              handleChangeSelectState: viewModel.onChangeShowPresetsSelect,
              handleSetPresetActive: viewModel.handleSetPresetActive,
              handleCreateTableSettingsPreset: viewModel.handleCreateTableSettingsPreset,
              handleDeleteTableSettingsPreset: viewModel.handleDeleteTableSettingsPreset,
              handleUpdateTableSettingsPreset: viewModel.handleUpdateTableSettingsPreset,
              onClickAddQuickAccess: viewModel.onClickAddQuickAccess,
              onClickSaveRenamedPreset: viewModel.onClickSaveRenamedPreset,
            },
          },
        }}
        getRowClassName={getRowClassName}
        getCellClassName={getCellClassName}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onSortModelChange={viewModel.onChangeSortingModel}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onRowClick={(params: GridRowParams) => viewModel.onOpenRequestDetailModal(params.row.request?._id)}
      />

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={viewModel.confirmModalSettings.title}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showRequestDesignerResultClientModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
      >
        <RequestDesignerResultClientForm
          // @ts-ignore
          onlyRead
          userInfo={viewModel.userInfo}
          request={viewModel.currentRequest}
          proposal={viewModel.currentProposal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
        />
      </Modal>

      <Modal
        openModal={viewModel.showRequestDesignerResultModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
      >
        <RequestDesignerResultForm
          proposal={viewModel.currentProposal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultModal')}
          onClickSendAsResult={viewModel.onClickSendAsResult}
        />
      </Modal>

      {viewModel.showMainRequestResultModal ? (
        <MainRequestResultModal
          readOnly
          // @ts-ignore
          customProposal={viewModel.currentProposal}
          // @ts-ignore
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
        />
      ) : null}

      {viewModel.showRequestResultModal ? (
        <RequestResultModal
          // @ts-ignore
          proposal={viewModel.currentProposal}
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        />
      ) : null}

      {viewModel.showRequestDetailModal ? (
        <FreelanceRequestDetailsModal
          // @ts-ignore
          openModal={viewModel.showRequestDetailModal}
          // @ts-ignore
          request={viewModel.currentRequest?.request}
          // @ts-ignore
          details={viewModel.currentRequest?.details}
          handleOpenModal={() => viewModel.onTriggerOpenModal('showRequestDetailModal')}
          onClickOpenNewTab={viewModel.onClickOpenBtn}
        />
      ) : null}
    </>
  )
})
