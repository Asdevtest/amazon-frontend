/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CustomSearchRequestForm } from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'

import { MyRequestsViewModel } from './my-requests-view.model'
import { styles } from './my-requests-view.style'

export const MyRequestsViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new MyRequestsViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const getCellClassName = params =>
    params.row.originalData.countProposalsByStatuses.waitedProposals &&
    params.field === 'waitedProposals' &&
    classNames.waitingCheckedBacklighting

  const getRowClassName = params => {
    if (getDistanceBetweenDatesInSeconds(params.row.originalData.timeoutAt) <= 86400 && viewModel.isRequestsAtWork) {
      return classNames.redBorder
    } else if (
      getDistanceBetweenDatesInSeconds(params.row.originalData.timeoutAt) <= 172800 &&
      viewModel.isRequestsAtWork
    ) {
      return classNames.yellowBorder
    }
  }

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.placeRequestBtnWrapper}>
          <div />

          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}, ${t(TranslationKey.ASIN)}, ${t(
              TranslationKey.ID,
            )}`}
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

        <div className={classNames.switchButtonWrapper}>
          <Button
            variant={'text'}
            btnWrapperStyle={classNames.btnWrapperStyle}
            className={cx(classNames.switchButton, {
              [classNames.switchButtonBorder]: viewModel.isRequestsAtWork,
              [classNames.selectedSwitchButton]: viewModel.isRequestsAtWork,
            })}
            onClick={() => viewModel.onClickChangeCatigory(true)}
          >
            {t(TranslationKey['Requests in progress'])}
          </Button>
          <Button
            variant={'text'}
            btnWrapperStyle={classNames.btnWrapperStyle}
            className={cx(classNames.switchButton, {
              [classNames.switchButtonBorder]: !viewModel.isRequestsAtWork,
              [classNames.selectedSwitchButton]: !viewModel.isRequestsAtWork,
            })}
            onClick={() => viewModel.onClickChangeCatigory(false)}
          >
            {t(TranslationKey['Completed requests'])}
          </Button>
        </div>

        <div className={classNames.datagridWrapper}>
          <MemoDataGrid
            disableVirtualization
            pagination
            sortingMode="server"
            paginationMode="server"
            propsToRerender={{ onHover: viewModel.onHover, currentData: viewModel.currentData }}
            localeText={getLocalizationByLanguageTag()}
            getCellClassName={getCellClassName}
            getRowClassName={getRowClassName}
            classes={{
              row: classNames.row,
              root: classNames.root,
              footerContainer: classNames.footerContainer,
              footerCell: classNames.footerCell,
              toolbarContainer: classNames.toolbarContainer,
            }}
            filterModel={viewModel.filterModel}
            columnVisibilityModel={viewModel.columnVisibilityModel}
            paginationModel={viewModel.paginationModel}
            rowCount={viewModel.rowCount}
            sortModel={viewModel.sortModel}
            rows={viewModel.currentData}
            pageSizeOptions={[15, 25, 50, 100]}
            rowHeight={130}
            slots={{
              toolbar: DataGridCustomToolbar,
              columnMenuIcon: FilterAltOutlinedIcon,
              columnMenu: DataGridCustomColumnMenuComponent,
            }}
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
            onColumnHeaderEnter={params => {
              viewModel.onHoverColumnField(params.field)
            }}
            onColumnHeaderLeave={viewModel.onLeaveColumnField}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
            onRowDoubleClick={e => viewModel.onClickTableRow(e.row)}
          />
        </div>
      </MainContent>

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
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Are you sure you want to cancel the search request?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={() => {
          viewModel.removeCustomSearchRequest()
        }}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />
      {viewModel.alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={viewModel?.alertShieldSettings?.showAlertShield}
          acceptMessage={viewModel?.alertShieldSettings?.alertShieldMessage}
          severity={viewModel?.alertShieldSettings?.error ? 'error' : 'success'}
        />
      )}
    </React.Fragment>
  )
}

export const MyRequestsView = withStyles(observer(MyRequestsViewRaw), styles)
