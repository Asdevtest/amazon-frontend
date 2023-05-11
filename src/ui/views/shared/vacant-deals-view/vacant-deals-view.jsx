import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {tableSortMode, tableViewMode} from '@constants/table/table-view-modes'
import {TranslationKey} from '@constants/translations/translation-key'

import {VacantDealsListCard} from '@components/cards/vacant-deals-list-card'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {sortObjectsArrayByFiledDateWithParseISO, sortObjectsArrayByFiledDateWithParseISOAsc} from '@utils/date-time'
import {t} from '@utils/translations'

import {VacantDealsViewModel} from './vacant-deals-view.model'
import {styles} from './vacant-deals-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_VACANT_DEALS

@observer
class VacantDealsViewRaw extends Component {
  viewModel = new VacantDealsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      showConfirmModal,
      getCurrentData,
      sortMode,
      viewMode,
      onTriggerSortMode,
      onTriggerDrawerOpen,
      onClickViewMore,
      onTriggerOpenModal,
      onClickGetToWorkModal,
      onClickGetToWork,
      requestId,
      proposalId,
    } = this.viewModel
    const {classes: classNames} = this.props

    const getSortedData = mode => {
      switch (mode) {
        case tableSortMode.DESK:
          return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))

        case tableSortMode.ASC:
          return getCurrentData().sort(sortObjectsArrayByFiledDateWithParseISOAsc('updatedAt'))
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
          <Appbar title={t(TranslationKey['Vacant deals'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.tablePanelWrapper}>
                <div className={classNames.tablePanelSortWrapper} onClick={onTriggerSortMode}>
                  <Typography className={classNames.tablePanelViewText}>{t(TranslationKey['Sort by date'])}</Typography>

                  {sortMode === tableSortMode.DESK ? (
                    <ArrowDropDownIcon color="primary" />
                  ) : (
                    <ArrowDropUpIcon color="primary" />
                  )}
                </div>
              </div>
              <div className={classNames.vacantDealsWrapper}>
                {getSortedData(sortMode).length ? (
                  <>
                    {getSortedData(sortMode).map((deal, index) =>
                      viewMode === tableViewMode.LIST ? (
                        <VacantDealsListCard
                          key={index}
                          item={deal}
                          onClickViewMore={onClickViewMore}
                          onClickGetToWorkModal={onClickGetToWorkModal}
                        />
                      ) : null,
                    )}
                  </>
                ) : (
                  <div className={classNames.emptyTableWrapper}>
                    <img src="/assets/icons/empty-table.svg" />
                    <Typography variant="h5" className={classNames.emptyTableText}>
                      {t(TranslationKey['No deals yet'])}
                    </Typography>
                  </div>
                )}
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Taking the deal check to work?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => onClickGetToWork(proposalId, requestId)}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const VacantDealsView = withStyles(VacantDealsViewRaw, styles)
