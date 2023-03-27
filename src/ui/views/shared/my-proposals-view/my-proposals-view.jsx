/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Grid, Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {tableSortMode, tableViewMode} from '@constants/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {MyProposalsListCard} from '@components/cards/my-proposals-list-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {
  sortObjectsArrayByArrayObjectFiledDateWithParseISO,
  sortObjectsArrayByArrayObjectFiledDateWithParseISOAsc,
  sortObjectsArrayByFiledDateWithParseISO,
  sortObjectsArrayByFiledDateWithParseISOAsc,
} from '@utils/date-time'
import {t} from '@utils/translations'

import {MyProposalsViewModel} from './my-proposals-view.model'
import {styles} from './my-proposals-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS

@observer
class MyProposalsViewRaw extends Component {
  viewModel = new MyProposalsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedTaskType,
      sortMode,
      viewMode,
      currentData,
      drawerOpen,
      showConfirmModal,
      nameSearchValue,

      onChangeNameSearchValue,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitDeleteProposal,
      onClickDeleteBtn,
      onClickEditBtn,
      onClickOpenBtn,
      onTriggerSortMode,
      onClickTaskType,
    } = this.viewModel
    const {classes: classNames} = this.props

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
                  {Object.keys(freelanceRequestTypeByCode).map((taskType, taskIndex) => (
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

                {/* <div className={classNames.tablePanelViewWrapper}>
                  <Typography className={classNames.tablePanelViewText}>{t(TranslationKey.Location)}</Typography>

                  <ToggleButtonGroup exclusive value={viewMode} onChange={onChangeViewMode}>
                    <ToggleButton value={tableViewMode.LIST}>
                      <TableRowsIcon color="primary" />
                    </ToggleButton>
                    <ToggleButton value={tableViewMode.BLOCKS}>
                      <ViewModuleIcon color="primary" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div> */}

                <div>
                  <SearchInput
                    inputClasses={classNames.searchInput}
                    placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.ASIN)}, ${t(
                      TranslationKey.Title,
                    )}, User`}
                    value={nameSearchValue}
                    onChange={onChangeNameSearchValue}
                  />
                </div>

                <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
                  <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

                  {sortMode === tableSortMode.DESK ? (
                    <ArrowDropDownIcon color="primary" />
                  ) : (
                    <ArrowDropUpIcon color="primary" />
                  )}
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
        </Main>
      </React.Fragment>
    )
  }
}

export const MyProposalsView = withStyles(MyProposalsViewRaw, styles)
