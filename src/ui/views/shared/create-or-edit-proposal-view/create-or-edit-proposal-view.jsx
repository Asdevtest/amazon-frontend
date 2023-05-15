/* eslint-disable no-unused-vars */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {CreateOrEditProposalContent} from '@components/contents/create-or-edit-proposal-content'
import {MainContent} from '@components/layout/main-content'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {t} from '@utils/translations'

import {CreateOrEditProposalViewModel} from './create-or-edit-proposal-view.model'
import {styles} from './create-or-edit-proposal-view.style'

@observer
export class CreateOrEditProposalViewRaw extends Component {
  viewModel = new CreateOrEditProposalViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      progressValue,
      showProgress,
      request,
      proposalToEdit,
      infoModalText,
      showInfoModal,
      showResultModal,
      onTriggerOpenModal,
      onSubmitCreateProposal,
      onClickBackBtn,
      onClickOkInfoModal,
      onSubmitEditProposal,
      onClickResultModal,
      goToMyRequest,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          {/* <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
                  {t(TranslationKey.Back)}
                </Button>
              </div> */}

          <CreateOrEditProposalContent
            progressValue={progressValue}
            showProgress={showProgress}
            request={request}
            proposalToEdit={proposalToEdit}
            onClickBackBtn={onClickBackBtn}
            onCreateSubmit={onSubmitCreateProposal}
            onEditSubmit={onSubmitEditProposal}
          />
        </MainContent>

        <TwoVerticalChoicesModal
          openModal={showResultModal}
          setOpenModal={() => {
            onTriggerOpenModal('showResultModal')
            onClickResultModal({goBack: true})
          }}
          title={infoModalText}
          // topBtnText={t(TranslationKey['To vacant requests'])}
          // bottomBtnText={t(TranslationKey['To the list of proposals'])}
          // onClickTopBtn={() => onClickResultModal({goBack: true})}
          // onClickBottomBtn={() => onClickResultModal({goBack: false})}

          topBtnText={t(TranslationKey['Go to request'])}
          bottomBtnText={t(TranslationKey['To vacant requests'])}
          thirdBtnText={t(TranslationKey['To the list of proposals'])}
          onClickTopBtn={() => goToMyRequest()}
          onClickBottomBtn={() => onClickResultModal({goBack: true})}
          onClickThirdBtn={() => onClickResultModal({goBack: false})}
        />

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={onClickOkInfoModal}
        />
      </React.Fragment>
    )
  }
}

export const CreateOrEditProposalView = withStyles(CreateOrEditProposalViewRaw, styles)
