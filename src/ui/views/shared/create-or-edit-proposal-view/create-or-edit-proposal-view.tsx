import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { CreateOrEditProposalContent } from '@components/contents/create-or-edit-proposal-content'
import { VerticalChoicesModal } from '@components/modals/vertical-choices-modal'
import { Modal } from '@components/shared/modal'

import { HistoryType } from '@typings/types/history'

import { CreateOrEditProposalViewModel } from './create-or-edit-proposal-view.model'

export const CreateOrEditProposalView = observer(({ history }: { history: HistoryType }) => {
  const viewModel = useMemo(() => new CreateOrEditProposalViewModel(history), [])

  return (
    <>
      <CreateOrEditProposalContent
        // @ts-ignore
        progressValue={viewModel.progressValue}
        showProgress={viewModel.showProgress}
        request={viewModel.request}
        proposalToEdit={viewModel.proposalToEdit}
        onClickBackBtn={viewModel.onClickBackBtn}
        onCreateSubmit={viewModel.onSubmitCreateProposal}
        onEditSubmit={viewModel.onSubmitEditProposal}
      />

      <Modal
        openModal={viewModel.showResultModal}
        setOpenModal={() => {
          viewModel.onTriggerOpenModal('showResultModal')
          viewModel.onClickResultModal({ goBack: true })
        }}
      >
        <VerticalChoicesModal
          firstButtonText="Go to request"
          secondButtonText="To vacant requests"
          thirdButtonText="To the list of proposals"
          onClickFirstButton={viewModel.goToMyRequest}
          onClickSecondButton={() => viewModel.onClickResultModal({ goBack: true })}
          onClickThirdButton={() => viewModel.onClickResultModal({ goBack: false })}
        />
      </Modal>
    </>
  )
})
