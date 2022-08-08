import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {VacantDealsListCard} from '@components/cards/vacant-deals-list-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

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
      deals,
      onTriggerDrawerOpen,
      onClickViewMore,
      onTriggerOpenModal,
      onClickGetToWorkModal,
      onClickGetToWork,
      requestId,
      proposalId,
    } = this.viewModel
    const {classes: classNames} = this.props

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
              <div className={classNames.vacantDealsWrapper}>
                {deals.length ? (
                  <>
                    {deals.map((deal, index) => (
                      <VacantDealsListCard
                        key={index}
                        item={deal}
                        onClickViewMore={onClickViewMore}
                        onClickGetToWorkModal={onClickGetToWorkModal}
                      />
                    ))}
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

export const VacantDealsView = withStyles(styles)(VacantDealsViewRaw)
