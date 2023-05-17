import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {AppealDetailsCard} from '@components/cards/appeal-details-card'
import {MainContent} from '@components/layout/main-content'

// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ModeratorAppealsViewModel} from './moderator-appeal-view.model'
import {styles} from './moderator-appeal-view.style'

@observer
class ModeratorAppealViewRaw extends Component {
  viewModel = new ModeratorAppealsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <AppealDetailsCard />
        </MainContent>

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
