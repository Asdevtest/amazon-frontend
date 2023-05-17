import React from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {AppealDetailsCard} from '@components/cards/appeal-details-card'
import {MainContent} from '@components/layout/main-content'
import {styles} from './moderator-appeal-view.style'

export const ModeratorAppealViewRaw = () => (
  // const [viewModel] = useState(() => new ModeratorAppealsViewModel({history: props.history}))

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

export const ModeratorAppealView = withStyles(observer(ModeratorAppealViewRaw), styles)
