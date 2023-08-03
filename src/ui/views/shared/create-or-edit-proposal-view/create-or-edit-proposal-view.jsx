/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import React, { Component, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CreateOrEditProposalContent } from '@components/contents/create-or-edit-proposal-content'
import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { t } from '@utils/translations'

import { styles } from './create-or-edit-proposal-view.style'

import { CreateOrEditProposalViewModel } from './create-or-edit-proposal-view.model'

export const CreateOrEditProposalViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new CreateOrEditProposalViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <div>
        {/* <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" className={classNames.backBtn} onClick={viewModel.onClickBackBtn}>
                  {t(TranslationKey.Back)}
                </Button>
              </div> */}

        <CreateOrEditProposalContent
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          request={viewModel.request}
          proposalToEdit={viewModel.proposalToEdit}
          onClickBackBtn={viewModel.onClickBackBtn}
          onCreateSubmit={viewModel.onSubmitCreateProposal}
          onEditSubmit={viewModel.onSubmitEditProposal}
        />
      </div>

      <TwoVerticalChoicesModal
        openModal={viewModel.showResultModal}
        setOpenModal={() => {
          viewModel.onTriggerOpenModal('showResultModal')
          viewModel.onClickResultModal({ goBack: true })
        }}
        title={viewModel.infoModalText}
        // topBtnText={t(TranslationKey['To vacant requests'])}
        // bottomBtnText={t(TranslationKey['To the list of proposals'])}
        // onClickTopBtn={() => onClickResultModal({goBack: true})}
        // onClickBottomBtn={() => onClickResultModal({goBack: false})}

        topBtnText={t(TranslationKey['Go to request'])}
        bottomBtnText={t(TranslationKey['To vacant requests'])}
        thirdBtnText={t(TranslationKey['To the list of proposals'])}
        onClickTopBtn={() => viewModel.goToMyRequest()}
        onClickBottomBtn={() => viewModel.onClickResultModal({ goBack: true })}
        onClickThirdBtn={() => viewModel.onClickResultModal({ goBack: false })}
      />

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showInfoModal')}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={viewModel.onClickOkInfoModal}
      />
    </React.Fragment>
  )
}

export const CreateOrEditProposalView = withStyles(observer(CreateOrEditProposalViewRaw), styles)
