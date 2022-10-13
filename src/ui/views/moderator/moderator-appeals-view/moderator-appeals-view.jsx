import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {AppealsListCard} from '@components/cards/appeals-list-card/appeals-list-card'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {ModeratorAppealsViewModel} from './moderator-appeals-view.model'
import {styles} from './moderator-appeals-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_APPEALS

@observer
class ModeratorAppealsViewRaw extends Component {
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
      onClickViewMore,
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
          <Appbar title={t(TranslationKey.Appeals)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <AppealsListCard onClickViewMore={onClickViewMore} />
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

export const ModeratorAppealsView = withStyles(ModeratorAppealsViewRaw, styles)
