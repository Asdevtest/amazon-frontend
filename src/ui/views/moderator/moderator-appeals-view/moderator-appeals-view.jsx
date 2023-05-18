import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { AppealsListCard } from '@components/cards/appeals-list-card/appeals-list-card'
import { MainContent } from '@components/layout/main-content'

// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import { ModeratorAppealsViewModel } from './moderator-appeals-view.model'
import { styles } from './moderator-appeals-view.style'

export const ModeratorAppealsViewRaw = props => {
  const [viewModel] = useState(() => new ModeratorAppealsViewModel({ history: props.history }))

  return (
    <React.Fragment>
      <MainContent>
        <AppealsListCard onClickViewMore={viewModel.onClickViewMore} />
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

export const ModeratorAppealsView = withStyles(observer(ModeratorAppealsViewRaw), styles)
