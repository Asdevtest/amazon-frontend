import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestDesignerResultForm } from '@components/forms/request-designer-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './my-proposals-view.style'

import { customSwitcherSettings, searchInputPlaceholder } from './my-proposals-view.constants'
import { MyProposalsViewModel } from './my-proposals-view.model'

export const MyProposalsView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new MyProposalsViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.tablePanelWrapper}>
          <FreelanceTypeTaskSelect
            selectedSpec={viewModel.selectedSpec}
            specs={viewModel.userInfo?.allowedSpec}
            onClickSpec={viewModel.onClickSpec}
          />

          <SearchInput
            inputClasses={styles.searchInput}
            placeholder={searchInputPlaceholder}
            value={viewModel.currentSearchValue}
            onSubmit={viewModel.onChangeSearchValue}
          />

          <div />
          <div />
        </div>

        <CustomSwitcher
          fullWidth
          switchMode="big"
          condition={viewModel.switcherCondition}
          switcherSettings={customSwitcherSettings}
          changeConditionHandler={viewModel.onClickChangeCatigory}
        />

        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
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
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
            onSortModelChange={viewModel.onChangeSortingModel}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onPaginationModelChange}
            onRowClick={e => viewModel.onOpenRequestDetailModal(e.row._id)}
          />
        </div>
      </div>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
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
      ) : null}

      <Modal
        openModal={viewModel.showRequestDesignerResultClientModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
      >
        <RequestDesignerResultClientForm
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
          customProposal={viewModel.currentProposal}
          userInfo={viewModel.userInfo}
          openModal={viewModel.showMainRequestResultModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showMainRequestResultModal')}
        />
      ) : null}

      {viewModel.showRequestResultModal ? (
        <RequestResultModal
          // @ts-ignore
          request={viewModel.currentRequest}
          proposal={viewModel.currentProposal}
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        />
      ) : null}

      {viewModel.showRequestDetailModal ? (
        <FreelanceRequestDetailsModal
          // @ts-ignore
          openModal={viewModel.showRequestDetailModal}
          request={viewModel.currentRequest?.request}
          details={viewModel.currentRequest?.details}
          handleOpenModal={() => viewModel.onTriggerOpenModal('showRequestDetailModal')}
          onClickOpenNewTab={viewModel.onClickOpenBtn}
        />
      ) : null}
    </>
  )
})
