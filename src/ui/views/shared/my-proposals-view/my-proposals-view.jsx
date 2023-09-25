import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Checkbox, Typography } from '@mui/material'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { MyProposalsListCard } from '@components/cards/my-proposals-list-card'
import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { MemoDataGrid } from '@components/shared/memo-data-grid'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import {
  sortObjectsArrayByArrayObjectFiledDateWithParseISO,
  sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc,
} from '@utils/date-time'
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

  const getSortedData = mode => {
    switch (mode) {
      case tableSortMode.DESK:
        return sortObjectsArrayByArrayObjectFiledDateWithParseISO(viewModel.currentData, 'updatedAt', 'proposals')

      case tableSortMode.ASC:
        return sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc(viewModel.currentData, 'updatedAt', 'proposals')
    }
  }

  console.log('viewModel.viewMode', viewModel.viewMode)

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
            placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.ASIN)}, ${t(
              TranslationKey.Title,
            )}, User, ${t(TranslationKey.ID)}`}
            value={viewModel.nameSearchValue}
            onChange={viewModel.onChangeNameSearchValue}
          />

          <div className={classNames.tablePanelSubWrapper}>
            <div className={classNames.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
              <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

              {viewModel.sortMode === tableSortMode.DESK ? (
                <ArrowDropDownIcon color="primary" />
              ) : (
                <ArrowDropUpIcon color="primary" />
              )}
            </div>

            <WithSearchSelect
              isWithoutItemsTooltip
              checkbox
              notCloseOneClick
              width={350}
              widthPopover={350}
              firstItems={
                <Button
                  className={classNames.filterBtn}
                  variant="text"
                  onClick={viewModel.handleSelectAllProposalStatuses}
                >
                  <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                    <>
                      <Checkbox
                        checked={viewModel.selectedProposalFilters.length === Object.keys(RequestProposalStatus).length}
                        color="primary"
                      />
                      <Typography className={classNames.fieldName}>
                        {t(TranslationKey['All proposal statuses'])}
                      </Typography>
                    </>
                  </div>
                </Button>
              }
              currentShops={viewModel.selectedProposalFilters}
              data={Object.keys(RequestProposalStatus).map(el => ({
                name: RequestProposalStatusTranslate(el),
                _id: el,
              }))}
              searchFields={['name']}
              selectedItemName={t(TranslationKey['All proposal statuses'])}
              changeColorById={RequestProposalStatusColor}
              onClickSelect={viewModel.onSelectProposalFilter}
            />

            <ViewCardsSelect
              withTabelView
              withoutBlockCardView
              viewMode={viewModel.viewMode}
              onChangeViewMode={viewModel.onChangeViewMode}
            />
          </div>
        </div>

        {viewModel.requestStatus === loadingStatuses.isLoading ? (
          <div className={classNames.loadingWrapper}>
            <CircularProgressWithLabel />
          </div>
        ) : viewModel.currentData?.length ? (
          viewModel.viewMode === tableViewMode.TABLE ? (
            <div className={classNames.dataGridWrapper}>
              <MemoDataGrid
                disableVirtualization
                pagination
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
                sortingMode="server"
                paginationMode="server"
                rowCount={viewModel.rowCount}
                sortModel={viewModel.sortModel}
                filterModel={viewModel.filterModel}
                columnVisibilityModel={viewModel.columnVisibilityModel}
                paginationModel={viewModel.paginationModel}
                // pageSizeOptions={pageSizeOptions}
                rows={viewModel.currentData}
                rowHeight={75}
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
                columns={viewModel.columnsModel}
                loading={viewModel.requestStatus === loadingStatuses.isLoading}
                onSortModelChange={viewModel.onChangeSortingModel}
                onFilterModelChange={viewModel.onChangeFilterModel}
                onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
                onPaginationModelChange={viewModel.onChangePaginationModelChange}
                onRowClick={e => viewModel.handleOpenRequestDetailModal(e.row._id)}
              />
            </div>
          ) : (
            <div className={classNames.cardsWrapper}>
              {getSortedData(viewModel.sortMode)?.map((item, index) => (
                <MyProposalsListCard
                  key={item._id}
                  isFirst={index === 0}
                  item={item}
                  onClickEditBtn={viewModel.onClickEditBtn}
                  onClickDeleteBtn={viewModel.onClickDeleteBtn}
                  onClickOpenBtn={viewModel.onClickOpenBtn}
                  onClickResultBtn={viewModel.onClickResultBtn}
                />
              ))}
            </div>
          )
        ) : (
          <div className={classNames.emptyTableWrapper}>
            <img src="/assets/icons/empty-table.svg" />
            <Typography variant="h5" className={classNames.emptyTableText}>
              {t(TranslationKey['No suggestions'])}
            </Typography>
          </div>
        )}
      </div>

      <ConfirmationModal
        isWarning
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={t(TranslationKey['Are you sure you want to cancel the proposal?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.onSubmitDeleteProposal}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      {viewModel.currentRequest && viewModel.currentProposal && (
        <Modal
          openModal={viewModel.showRequestDesignerResultClientModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
        >
          <RequestDesignerResultClientForm
            userInfo={viewModel.userInfo}
            request={{ request: viewModel.currentRequest }}
            proposal={viewModel.currentProposal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestDesignerResultClientModal')}
          />
        </Modal>
      )}

      {viewModel.currentRequest && viewModel.currentProposal && (
        <Modal
          openModal={viewModel.showRequestStandartResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestStandartResultModal')}
        >
          <RequestStandartResultForm
            request={{ request: viewModel.currentRequest }}
            proposal={viewModel.currentProposal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestStandartResultModal')}
          />
        </Modal>
      )}

      {viewModel.currentRequest && viewModel.currentProposal && (
        <RequestResultModal
          request={{ request: viewModel.currentRequest }}
          proposal={viewModel.currentProposal}
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        />
      )}
    </React.Fragment>
  )
}

export const MyProposalsView = withStyles(observer(MyProposalsViewRaw), styles)
