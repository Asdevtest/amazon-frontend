import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { AppealsListCard } from '@components/cards/appeals-list-card/appeals-list-card'

import { styles } from './moderator-appeals-view.style'

// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import { ModeratorAppealsViewModel } from './moderator-appeals-view.model'

export const ModeratorAppealsViewRaw = props => {
  const [viewModel] = useState(() => new ModeratorAppealsViewModel({ history: props.history }))

  return (
    <React.Fragment>
      <div>
        <AppealsListCard onClickViewMore={viewModel.onClickViewMore} />
      </div>

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
