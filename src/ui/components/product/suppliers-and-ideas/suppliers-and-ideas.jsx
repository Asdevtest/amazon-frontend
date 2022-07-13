import React, {useEffect, useRef} from 'react'

import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {IdeaViewAndEditCard} from '@components/cards/idea-view-and-edit-card'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'

import {t} from '@utils/translations'

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
    progressValue,
    showProgress,
    showConfirmModal,
    showSuccessModal,
    confirmModalSettings,
    successModalTitle,
    onTriggerOpenModal,
    onClickRemoveIdea,
    onCreateIdea,
    onClickCancelBtn,
    onClickSaveBtn,
    onSetCurIdea,
    onEditIdea,
    onClickCreateProduct,
  } = model.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.btnsWrapper}>
        <Button success variant="contained" onClick={onCreateIdea}>
          {t(TranslationKey['Add a product idea'])}{' '}
        </Button>
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

      {SettingsModel.languageTag &&
        ideasData.map((idea, index) => (
          <IdeaViewAndEditCard
            key={index}
            curIdea={curIdea}
            inEdit={inEdit}
            idea={idea}
            onCreateProduct={onClickCreateProduct}
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

      <SuccessInfoModal
        openModal={showSuccessModal}
        setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
        title={successModalTitle}
        successBtnText={t(TranslationKey.Ok)}
        onClickSuccessBtn={() => {
          onTriggerOpenModal('showSuccessModal')
        }}
      />

      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
    </div>
  )
})
