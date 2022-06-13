/* eslint-disable no-unused-vars */
import React, {useEffect, useRef} from 'react'

import {Typography, Divider, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {IdeaViewAndEditCard} from '@components/cards/idea-view-and-edit-card'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

import {t} from '@utils/translations'

import {Button} from '../../buttons/button'
import {SuppliersAndIdeasModel} from './suppliers-and-ideas.model'
import {useClassNames} from './suppliers-and-ideas.style'

export const SuppliersAndIdeas = observer(({productId}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new SuppliersAndIdeasModel({history, productId}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    curIdea,
    inEdit,
    inCreate,
    ideasData,
    showConfirmModal,
    confirmModalSettings,
    onTriggerOpenModal,
    onClickRemoveIdea,
    onCreateIdea,
    onClickCancelBtn,
    onClickSaveBtn,
    onSetCurIdea,
    onEditIdea,
  } = model.current

  console.log('ideasData', ideasData)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.btnsWrapper}>
        <SuccessButton variant="contained" onClick={onCreateIdea}>
          {t(TranslationKey['Add a product idea'])}{' '}
        </SuccessButton>
      </div>

      {inCreate ? (
        <IdeaViewAndEditCard
          inCreate
          curIdea={curIdea}
          onClickSaveBtn={onClickSaveBtn}
          onClickCancelBtn={onClickCancelBtn}
          onSetCurIdea={onSetCurIdea}
        />
      ) : null}

      {ideasData.map((idea, index) => (
        <IdeaViewAndEditCard
          key={index}
          curIdea={curIdea}
          inEdit={inEdit}
          idea={idea}
          onClickSaveBtn={onClickSaveBtn}
          onClickCancelBtn={onClickCancelBtn}
          onRemove={onClickRemoveIdea}
          onSetCurIdea={onSetCurIdea}
          onEditIdea={onEditIdea}
        />
      ))}

      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />
    </div>
  )
})
