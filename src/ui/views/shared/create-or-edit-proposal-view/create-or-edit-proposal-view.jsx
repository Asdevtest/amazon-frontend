import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CreateOrEditProposalContent } from '@components/contents/create-or-edit-proposal-content'
import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'

import { t } from '@utils/translations'

import { CreateOrEditProposalViewModel } from './create-or-edit-proposal-view.model'

export const CreateOrEditProposalView = observer(({ history }) => {
  const [viewModel] = useState(() => new CreateOrEditProposalViewModel({ history }))

  return (
    <>
      <CreateOrEditProposalContent
        progressValue={viewModel.progressValue}
        showProgress={viewModel.showProgress}
        request={viewModel.request}
        proposalToEdit={viewModel.proposalToEdit}
        onClickBackBtn={viewModel.onClickBackBtn}
        onCreateSubmit={viewModel.onSubmitCreateProposal}
        onEditSubmit={viewModel.onSubmitEditProposal}
      />

      {viewModel.showResultModal ? (
        <TwoVerticalChoicesModal
          // @ts-ignore
          openModal={viewModel.showResultModal}
          setOpenModal={() => {
            viewModel.onTriggerOpenModal('showResultModal')
            viewModel.onClickResultModal({ goBack: true })
          }}
          title={viewModel.infoModalText}
          topBtnText={t(TranslationKey['Go to request'])}
          bottomBtnText={t(TranslationKey['To vacant requests'])}
          thirdBtnText={t(TranslationKey['To the list of proposals'])}
          onClickTopBtn={() => viewModel.goToMyRequest()}
          onClickBottomBtn={() => viewModel.onClickResultModal({ goBack: true })}
          onClickThirdBtn={() => viewModel.onClickResultModal({ goBack: false })}
        />
      ) : null}

      {viewModel.showInfoModal ? (
        <WarningInfoModal
          // @ts-ignore
          openModal={viewModel.showInfoModal}
          setOpenModal={viewModel.onClickOkInfoModal}
          title={viewModel.infoModalText}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={viewModel.onClickOkInfoModal}
        />
      ) : null}
    </>
  )
})
