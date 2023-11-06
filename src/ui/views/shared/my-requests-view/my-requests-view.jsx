import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { FreelanceRequestDetailsModal } from '@components/modals/freelance-request-details-modal'
import { CustomSearchRequestForm } from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './my-requests-view.style'

import { MyRequestsViewModel } from './my-requests-view.model'

export const MyRequestsView = observer(({ history, location }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new MyRequestsViewModel({ history, location }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getCellClassName = params =>
    params.row.originalData.countProposalsByStatuses.waitedProposals &&
    params.field === 'waitedProposals' &&
    styles.waitingCheckedBacklighting

  const getRowClassName = params => {
    if (getDistanceBetweenDatesInSeconds(params.row.originalData.timeoutAt) <= 86400 && viewModel.isRequestsAtWork) {
      return [styles.deadlineBorder, styles.redBorder]
    } else if (
      getDistanceBetweenDatesInSeconds(params.row.originalData.timeoutAt) <= 172800 &&
      viewModel.isRequestsAtWork
    ) {
      return [styles.deadlineBorder, styles.yellowBorder]
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className={styles.header}>
          <div />

          <SearchInput
            inputClasses={styles.searchInput}
            placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.SEARCH_BY_TITLE)}, ${t(
              TranslationKey.ASIN,
            )}, ${t(TranslationKey.ID)}`}
            value={viewModel.nameSearchValue}
            onSubmit={viewModel.onSearchSubmit}
          />

          <Button
            success
            tooltipInfoContent={t(TranslationKey['Opens the form to create a request'])}
            onClick={() => viewModel.onClickAddBtn()}
          >
            {t(TranslationKey['Create a request'])}
          </Button>
        </div>

        <CustomSwitcher
          fullWidth
          switchMode={'big'}
          condition={viewModel.isRequestsAtWork}
          switcherSettings={[
            { label: () => t(TranslationKey['Requests in progress']), value: true },
            { label: () => t(TranslationKey['Completed requests']), value: false },
          ]}
          changeConditionHandler={viewModel.onClickChangeCatigory}
        />

        <div className={styles.datagridWrapper}>
          {viewModel.requestStatus === loadingStatuses.success ? (
            <CustomDataGrid
              propsToRerender={{ onHover: viewModel.onHover, currentData: viewModel.currentData }}
              localeText={getLocalizationByLanguageTag()}
              getCellClassName={getCellClassName}
              getRowClassName={getRowClassName}
              filterModel={viewModel.filterModel}
              columnVisibilityModel={viewModel.columnVisibilityModel}
              paginationModel={viewModel.paginationModel}
              rowCount={viewModel.rowCount}
              sortModel={viewModel.sortModel}
              rows={viewModel.currentData}
              pageSizeOptions={[15, 25, 50, 100]}
              rowHeight={130}
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
              density={viewModel.densityModel}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatuses.isLoading}
              onColumnHeaderEnter={params => viewModel.onHoverColumnField(params.field)}
              onColumnHeaderLeave={viewModel.onLeaveColumnField}
              onSortModelChange={viewModel.onChangeSortingModel}
              onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
              onPaginationModelChange={viewModel.onChangePaginationModel}
              onFilterModelChange={viewModel.onChangeFilterModel}
              onRowClick={e => viewModel.handleOpenRequestDetailModal(e.row._id)}
            />
          ) : (
            <CircularProgressWithLabel />
          )}
        </div>
      </div>

      <Modal openModal={viewModel.showRequestForm} setOpenModal={() => viewModel.onTriggerOpenModal('showRequestForm')}>
        <Typography variant="h5">{t(TranslationKey['New request'])}</Typography>
        <CustomSearchRequestForm
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestForm')}
          requestToEdit={viewModel.requestFormSettings.request}
          isEdit={viewModel.requestFormSettings.isEdit}
          onSubmit={viewModel.requestFormSettings.onSubmit}
        />
      </Modal>

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        smallMessage={viewModel.confirmModalSettings.smallMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <ConfirmationModal
        withComment
        asCommentModalDefault
        openModal={viewModel.showConfirmWithCommentModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
        title={t(TranslationKey['Suspend the acceptance of proposals?'])}
        commentLabelText={`${t(TranslationKey['State the reason for stopping'])}: `}
        successBtnText={t(TranslationKey.Ok)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.onSubmitAbortRequest}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmWithCommentModal')}
      />

      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
          severity={viewModel?.alertShieldSettings?.error ? 'error' : 'success'}
        />
      )}

      <FreelanceRequestDetailsModal
        isRequestOwner
        isOpenModal={viewModel.showRequestDetailModal}
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
      />
    </React.Fragment>
  )
})
