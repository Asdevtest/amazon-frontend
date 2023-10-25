import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { styles } from './my-proposals-view.style'

import { MyProposalsViewModel } from './my-proposals-view.model'

export const MyProposalsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new MyProposalsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div className={classNames.root}>
        <div className={classNames.tablePanelWrapper}>
          <FreelanceTypeTaskSelect
            selectedTaskType={viewModel.selectedTaskType}
            onClickTaskType={viewModel.onClickTaskType}
          />

          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.ASIN)}, ${t(TranslationKey.Title)}, ${t(
              TranslationKey.ID,
            )}`}
            value={viewModel.currentSearchValue}
            onSubmit={viewModel.onChangeSearchValue}
          />

          <div />
        </div>

        <div className={classNames.dataGridWrapper}>
          <MemoDataGrid
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            pageSizeOptions={viewModel.pageSizeOptions}
            rows={viewModel.currentData}
            rowHeight={87}
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
              },
            }}
            columns={viewModel.columnsModel}
            loading={viewModel.requestStatus === loadingStatuses.isLoading}
            onSortModelChange={viewModel.onChangeSortingModel}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onRowDoubleClick={e => viewModel.setCurrentOpenedBatch(e.row?.originalData?.request?._id)}
          />
        </div>
      </div>

      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      {viewModel.currentRequest && viewModel.currentProposal && viewModel.showRequestDesignerResultClientModal && (
        <Modal
          openModal={viewModel.showRequestDesignerResultClientModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
        >
          <RequestDesignerResultClientForm
            userInfo={viewModel.userInfo}
            request={viewModel.currentRequest}
            proposal={viewModel.currentProposal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
          />
        </Modal>
      )}

      {viewModel.currentRequest && viewModel.currentProposal && viewModel.showRequestStandartResultModal && (
        <Modal
          openModal={viewModel.showRequestStandartResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestStandartResultModal')}
        >
          <RequestStandartResultForm
            request={viewModel.currentRequest}
            proposal={viewModel.currentProposal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestStandartResultModal')}
          />
        </Modal>
      )}

      {viewModel.currentRequest && viewModel.currentProposal && viewModel.showRequestResultModal && (
        <RequestResultModal
          request={viewModel.currentRequest}
          proposal={viewModel.currentProposal}
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        />
      )}
    </React.Fragment>
  )
}

export const MyProposalsView = withStyles(observer(MyProposalsViewRaw), styles)
