import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { GridCellParams, GridRowModel, useGridApiRef } from '@mui/x-data-grid-premium'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestProposalAcceptOrRejectResultForm } from '@components/forms/request-proposal-accept-or-reject-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { CustomSearchRequestForm } from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'

import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './my-requests-view.style'

import { radioButtonOptions } from './my-requests-view.constants'
import { MyRequestsViewModel } from './my-requests-view.model'

export const MyRequestsView = observer(() => {
  const { classes: styles, cx } = useStyles()
  const apiRef = useGridApiRef()
  const viewModel = useMemo(() => new MyRequestsViewModel({ dataGridApi: apiRef }), [])

  const getCellClassName = (params: GridCellParams) => {
    if (params.row?.countProposalsByStatuses?.waitedProposals && params.field === 'waitedProposals') {
      return styles.waitingCheckedBacklighting
    }

    if (params.field === 'freelanceNotices' && params.row.freelanceNotices > 0) {
      return styles.unreadMessages
    }
  }
  const getRowClassName = (params: GridCellParams) => {
    if (getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= ONE_DAY_IN_SECONDS && viewModel.isRequestsAtWork) {
      return cx(styles.deadlineBorder, styles.redBorder)
    } else if (
      getDistanceBetweenDatesInSeconds(params.row.timeoutAt) <= ONE_DAY_IN_SECONDS * 2 &&
      viewModel.isRequestsAtWork
    ) {
      return cx(styles.deadlineBorder, styles.yellowBorder)
    }
  }

  const isReworkAndReceive =
    viewModel.curProposal?.proposal?.status &&
    [RequestProposalStatus.READY_TO_VERIFY, RequestProposalStatus.CORRECTED].includes(
      viewModel.curProposal?.proposal?.status,
    )

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={radioButtonOptions()}
          defaultValue={viewModel.radioButtonOption}
          onChange={viewModel.onChangeRadioButtonOption}
        />

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title"
          onSearch={viewModel.onSearchSubmit}
        />

        <CustomButton size="large" type="primary" onClick={viewModel.onClickAddBtn}>
          {t(TranslationKey['Create request'])}
        </CustomButton>
      </div>

      <CustomDataGrid
        apiRef={viewModel.dataGridApi}
        getCellClassName={getCellClassName}
        getRowClassName={getRowClassName}
        pinnedColumns={viewModel.pinnedColumns}
        filterModel={viewModel.filterModel}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        rowCount={viewModel.rowCount}
        sortModel={viewModel.sortModel}
        rows={viewModel.currentData}
        getRowHeight={() => 'auto'}
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
        getRowId={({ _id }: GridRowModel) => _id}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
        onPinnedColumnsChange={viewModel.handlePinColumn}
        onRowDoubleClick={(row: GridRowModel) => viewModel.handleOpenRequestDetailModal(row)}
      />

      <Modal openModal={viewModel.showRequestForm} setOpenModal={() => viewModel.onTriggerOpenModal('showRequestForm')}>
        <h5>{t(TranslationKey['New request'])}</h5>
        <CustomSearchRequestForm
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestForm')}
          requestToEdit={viewModel.requestFormSettings.request}
          isEdit={viewModel.requestFormSettings.isEdit}
          onSubmit={viewModel.requestFormSettings.onSubmit}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      {viewModel.showConfirmWithCommentModal ? (
        <ConfirmationModal
          // @ts-ignore
          withComment
          asCommentModalDefault
          openModal={viewModel.showConfirmWithCommentModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
          title={t(TranslationKey['Suspend the acceptance of proposals?'])}
          commentLabelText={`${t(TranslationKey['State the reason for stopping'])}: `}
          successBtnText={t(TranslationKey.Ok)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.onSubmitAbortRequest}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
        />
      ) : null}

      {viewModel.showRequestDetailModal ? (
        <FreelanceRequestDetailsModal
          // @ts-ignore
          isRequestOwner
          userInfo={viewModel.userInfo}
          isAcceptedProposals={viewModel.isAcceptedProposals}
          openModal={viewModel.showRequestDetailModal}
          requestProposals={viewModel.curProposal}
          request={viewModel.currentRequestDetails?.request}
          details={viewModel.currentRequestDetails?.details}
          handleOpenModal={() => viewModel.onTriggerOpenModal('showRequestDetailModal')}
          onClickAbortBtn={viewModel.onClickAbortBtn}
          onClickOpenNewTab={viewModel.onClickOpenInNewTab}
          onClickPublishBtn={viewModel.onClickPublishBtn}
          onClickEditBtn={viewModel.onClickEditBtn}
          onRecoverRequest={viewModel.onRecoverRequest}
          onClickCancelBtn={viewModel.onClickCancelBtn}
          onToggleUploadedToListing={viewModel.onToggleUploadedToListing}
          onClickMarkAsCompletedBtn={viewModel.onClickMarkAsCompletedBtn}
          onClickResultBtn={viewModel.handleClickResultBtn}
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
          request={viewModel.currentRequestDetails}
          proposal={viewModel.curProposal}
          curResultMedia={viewModel.curProposal?.proposal.media}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
        />
      </Modal>

      {viewModel.showMainRequestResultModal && viewModel.curProposal ? (
        <MainRequestResultModal
          readOnly={!isReworkAndReceive}
          customProposal={viewModel.curProposal}
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
          onEditCustomProposal={viewModel.onSendInForRework}
          onReceiveCustomProposal={() => viewModel.onClickProposalResultAccept(viewModel.curProposal?.proposal?._id)}
        />
      ) : null}

      {viewModel.showRequestResultModal ? (
        <RequestResultModal
          // @ts-ignore
          proposal={viewModel.curProposal}
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        />
      ) : null}

      {viewModel.showConfirmWorkResultFormModal ? (
        <RequestProposalAcceptOrRejectResultForm
          // @ts-ignore
          openModal={viewModel.showConfirmWorkResultFormModal}
          title={t(TranslationKey['Confirm acceptance of the work result'])}
          rateLabel={t(TranslationKey['Rate the performer'])}
          reviewLabel={t(TranslationKey["Review of the performer's work"])}
          confirmButtonText={t(TranslationKey.Confirm)}
          cancelBtnText={t(TranslationKey.Reject)}
          onSubmit={viewModel.acceptProposalResultSetting.onSubmit}
          onClose={() => viewModel.onTriggerOpenModal('showConfirmWorkResultFormModal')}
        />
      ) : null}
    </div>
  )
})
