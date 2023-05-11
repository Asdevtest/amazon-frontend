/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Checkbox, Grid, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
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
import {tableSortMode, tableViewMode} from '@constants/table/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {MyProposalsListCard} from '@components/cards/my-proposals-list-card'
import {RequestDesignerResultClientForm} from '@components/forms/request-designer-result-client-form'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Button} from '@components/shared/buttons/button'
import {Modal} from '@components/shared/modal'
import {SearchInput} from '@components/shared/search-input'
import {WithSearchSelect} from '@components/shared/selects/with-search-select'

import {checkIsFreelancer} from '@utils/checks'
import {
  sortObjectsArrayByArrayObjectFiledDateWithParseISO,
  sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc,
  sortObjectsArrayByFiledDateWithParseISO,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

import {MyProposalsViewModel} from './my-proposals-view.model'
import {styles} from './my-proposals-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS

@observer
class MyProposalsViewRaw extends Component {
  viewModel = new MyProposalsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedProposalFilters,
      currentRequest,
      currentProposal,
      selectedTaskType,
      sortMode,
      viewMode,
      currentData,
      drawerOpen,
      showConfirmModal,
      showRequestDesignerResultClientModal,
      nameSearchValue,
      userInfo,
      userRole,
      requestsBase,

      onChangeNameSearchValue,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitDeleteProposal,
      onClickDeleteBtn,
      onClickEditBtn,
      onClickOpenBtn,
      onTriggerSortMode,
      onClickTaskType,
      onClickResultBtn,
      onSelectProposalFilter,
      handleSelectAllProposalStatuses,
    } = this.viewModel
    const {classes: classNames} = this.props

    const whiteList =
      !!userInfo && checkIsFreelancer(userRole)
        ? [
            String(freelanceRequestTypeByKey[freelanceRequestType.DEFAULT]),
            ...(Object.keys(freelanceRequestTypeByCode)
              ?.filter(spec => requestsBase.some(item => Number(item?.typeTask) === Number(spec)))
              ?.map(item => String(item)) || []),
          ]
        : Object.keys(freelanceRequestTypeByCode)

    const getSortedData = mode => {
      switch (mode) {
        case tableSortMode.DESK:
          // return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
          return sortObjectsArrayByArrayObjectFiledDateWithParseISO(currentData, 'updatedAt', 'proposals')

        case tableSortMode.ASC:
          // return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
          return sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc(currentData, 'updatedAt', 'proposals')
      }
    }

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My proposals'])} setDrawerOpen={onTriggerDrawerOpen}>
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
                      disabled={taskType === selectedTaskType}
                      btnWrapperStyle={classNames.btnWrapperStyle}
                      className={cx(classNames.button, {
                        [classNames.selectedBoxesBtn]: Number(taskType) === Number(selectedTaskType),
                      })}
                      onClick={() => onClickTaskType(taskType)}
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
                    value={nameSearchValue}
                    onChange={onChangeNameSearchValue}
                  />
                </div>

                <div className={classNames.tablePanelSubWrapper}>
                  <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
                    <Typography className={classNames.tablePanelViewText}>
                      {t(TranslationKey['Sort by date'])}
                    </Typography>

                    {sortMode === tableSortMode.DESK ? (
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
                          onClick={handleSelectAllProposalStatuses}
                        >
                          <div className={cx(classNames.fieldNamesWrapper, classNames.fieldNamesWrapperWithCheckbox)}>
                            <>
                              <Checkbox
                                checked={selectedProposalFilters.length === Object.keys(RequestProposalStatus).length}
                                color="primary"
                              />
                              <Typography className={classNames.fieldName}>
                                {t(TranslationKey['All proposal statuses'])}
                              </Typography>
                            </>
                          </div>
                        </Button>
                      }
                      currentShops={selectedProposalFilters}
                      data={Object.keys(RequestProposalStatus).map(el => ({
                        name: RequestProposalStatusTranslate(el),
                        _id: el,
                      }))}
                      searchFields={['name']}
                      selectedItemName={t(TranslationKey['All proposal statuses'])}
                      changeColorById={RequestProposalStatusColor}
                      onClickSelect={onSelectProposalFilter}
                    />
                  </div>
                </div>
              </div>

              {getSortedData(sortMode)?.length ? (
                <Grid
                  container
                  classes={{root: classNames.dashboardCardWrapper}}
                  // spacing={4}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {getSortedData(sortMode)?.map((item, index) =>
                    viewMode === tableViewMode.LIST ? (
                      <MyProposalsListCard
                        key={item._id}
                        isFirst={index === 0}
                        item={item}
                        onClickEditBtn={onClickEditBtn}
                        onClickDeleteBtn={onClickDeleteBtn}
                        onClickOpenBtn={onClickOpenBtn}
                        onClickResultBtn={onClickResultBtn}
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
          </Appbar>

          <ConfirmationModal
            isWarning
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={t(TranslationKey['Are you sure you want to cancel the proposal?'])}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={onSubmitDeleteProposal}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />

          {currentRequest && currentProposal && (
            <Modal
              openModal={showRequestDesignerResultClientModal}
              setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}
            >
              <RequestDesignerResultClientForm
                userInfo={userInfo}
                request={{request: currentRequest}}
                proposal={currentProposal}
                setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultClientModal')}
                // onClickSendAsResult={onClickSendAsResult}
              />
            </Modal>
          )}
        </Main>
      </React.Fragment>
    )
  }
}

export const MyProposalsView = withStyles(MyProposalsViewRaw, styles)
