import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {AppealDetailsCard} from '@components/cards/appeal-details-card'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/layout/navbar'

import {t} from '@utils/translations'

import {ModeratorAppealsViewModel} from './moderator-appeal-view.model'
import {styles} from './moderator-appeal-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_APPEALS

@observer
class ModeratorAppealViewRaw extends Component {
  viewModel = new ModeratorAppealsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {
      drawerOpen,
      // showConfirmModal,
      // deals,
      onTriggerDrawerOpen,
      // onClickViewMore,
      // onTriggerOpenModal,
      // onClickGetToWorkModal,
      // onClickGetToWork,
      // requestId,
      // proposalId,
    } = this.viewModel
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Appeal)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <AppealDetailsCard />
            </MainContent>
          </Appbar>
        </Main>

        {/* <ConfirmationModal
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Taking the deal check to work?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={() => onClickGetToWork(proposalId, requestId)}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        /> */}
      </React.Fragment>
    )
  }
}

export const ModeratorAppealView = withStyles(ModeratorAppealViewRaw, styles)
