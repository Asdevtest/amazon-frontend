/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Checkbox, Grid, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { MyProposalsListCard } from '@components/cards/my-proposals-list-card'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { MainContent } from '@components/layout/main-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkIsFreelancer } from '@utils/checks'
import {
  sortObjectsArrayByArrayObjectFiledDateWithParseISO,
  sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc,
} from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { MyProposalsViewModel } from './my-proposals-view.model'
import { styles } from './my-proposals-view.style'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { RequestResultModal } from '@components/modals/request-result-modal'

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

  const whiteList =
    !!viewModel.userInfo && checkIsFreelancer(viewModel.userRole)
      ? [
          String(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]),
          ...(Object.keys(freelanceRequestTypeByCode)
            ?.filter(spec => viewModel.requestsBase.some(item => Number(item?.typeTask) === Number(spec)))
            ?.map(item => String(item)) || []),
        ]
      : Object.keys(freelanceRequestTypeByCode)

  const getSortedData = mode => {
    switch (mode) {
      case tableSortMode.DESK:
        // return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
        return sortObjectsArrayByArrayObjectFiledDateWithParseISO(viewModel.currentData, 'updatedAt', 'proposals')

      case tableSortMode.ASC:
        // return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
        return sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc(viewModel.currentData, 'updatedAt', 'proposals')
    }
  }

  return (
    <React.Fragment>
      <MainContent>
        <div className={classNames.tablePanelWrapper}>
          <div className={classNames.taskTypeWrapper}>
            {Object.keys({
              ...getObjectFilteredByKeyArrayWhiteList(freelanceRequestTypeByCode, whiteList),
              // freelanceRequestTypeByCode
            }).map((taskType, taskIndex) => (
              <Button
                key={taskIndex}
                variant="text"
                disabled={taskType === viewModel.selectedTaskType}
                btnWrapperStyle={classNames.btnWrapperStyle}
                className={cx(classNames.button, {
                  [classNames.selectedBoxesBtn]: Number(taskType) === Number(viewModel.selectedTaskType),
                })}
                onClick={() => viewModel.onClickTaskType(taskType)}
              >
                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[taskType])}
              </Button>
            ))}
          </div>

          <div>
            <SearchInput
              inputClasses={classNames.searchInput}
              placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.ASIN)}, ${t(
                TranslationKey.Title,
              )}, User, ${t(TranslationKey.ID)}`}
              value={viewModel.nameSearchValue}
              onChange={viewModel.onChangeNameSearchValue}
            />
          </div>

          <div className={classNames.tablePanelSubWrapper}>
            <div className={classNames.tablePanelSortWrapper} onClick={viewModel.onTriggerSortMode}>
              <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

              {viewModel.sortMode === tableSortMode.DESK ? (
                <ArrowDropDownIcon color="primary" />
              ) : (
                <ArrowDropUpIcon color="primary" />
              )}
            </div>

            <div className={classNames.proposalSelect}>
              <WithSearchSelect
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
                          checked={
                            viewModel.selectedProposalFilters.length === Object.keys(RequestProposalStatus).length
                          }
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
            </div>
          </div>
        </div>

        {viewModel.requestStatus === loadingStatuses.isLoading ? (
          <div className={classNames.loadingWrapper}>
            <CircularProgressWithLabel />
          </div>
        ) : getSortedData(viewModel.sortMode)?.length ? (
          <Grid
            container
            classes={{ root: classNames.dashboardCardWrapper }}
            // spacing={4}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {getSortedData(viewModel.sortMode)?.map((item, index) =>
              viewModel.viewMode === tableViewMode.LIST ? (
                <MyProposalsListCard
                  key={item._id}
                  isFirst={index === 0}
                  item={item}
                  onClickEditBtn={viewModel.onClickEditBtn}
                  onClickDeleteBtn={viewModel.onClickDeleteBtn}
                  onClickOpenBtn={viewModel.onClickOpenBtn}
                  onClickResultBtn={viewModel.onClickResultBtn}
                />
              ) : null,
            )}
          </Grid>
        ) : (
          <div className={classNames.emptyTableWrapper}>
            <img src="/assets/icons/empty-table.svg" />
            <Typography variant="h5" className={classNames.emptyTableText}>
              {t(TranslationKey['No suggestions'])}
            </Typography>
          </div>
        )}
      </MainContent>

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
            // onClickSendAsResult={viewModel.onClickSendAsResult}
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
        <Modal
          openModal={viewModel.showRequestResultModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
        >
          <RequestResultModal
            request={{ request: viewModel.currentRequest }}
            proposal={viewModel.currentProposal}
            openModal={viewModel.showRequestResultModal}
            setOpenModal={() => viewModel.onTriggerOpenModal('showRequestResultModal')}
            onClickSendAsResult={viewModel.onClickSendAsResult}
          />
        </Modal>
      )}
    </React.Fragment>
  )
}

export const MyProposalsView = withStyles(observer(MyProposalsViewRaw), styles)
