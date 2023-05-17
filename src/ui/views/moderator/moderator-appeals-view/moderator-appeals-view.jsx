import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {AppealsListCard} from '@components/cards/appeals-list-card/appeals-list-card'
import {MainContent} from '@components/layout/main-content'

// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {ModeratorAppealsViewModel} from './moderator-appeals-view.model'
import {styles} from './moderator-appeals-view.style'

@observer
class ModeratorAppealsViewRaw extends Component {
  viewModel = new ModeratorAppealsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {
      // showConfirmModal,
      // deals,
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
        <MainContent>
          <AppealsListCard onClickViewMore={onClickViewMore} />
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

export const ModeratorAppealsView = withStyles(ModeratorAppealsViewRaw, styles)
