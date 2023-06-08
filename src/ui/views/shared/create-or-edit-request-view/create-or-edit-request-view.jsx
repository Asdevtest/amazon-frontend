import React, { useEffect, useRef, useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CreateOrEditRequestContent } from '@components/contents/create-or-edit-request-content'
import { MainContent } from '@components/layout/main-content'
import { BigImagesModal } from '@components/modals/big-images-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'

import { t } from '@utils/translations'

import { CreateOrEditRequestViewModel } from './create-or-edit-request-view.model'

export const CreateOrEditRequestView = observer(props => {
  const mainContentRef = useRef()
  const [viewModel] = useState(
    () =>
      new CreateOrEditRequestViewModel({
        history: props.history,
        location: props.location,
      }),
  )

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <MainContent ref={mainContentRef}>
        <CreateOrEditRequestContent
          mainContentRef={mainContentRef}
          choosenAnnouncements={viewModel.choosenAnnouncements}
          permissionsData={viewModel.permissionsData}
          announcements={viewModel.announcements}
          platformSettingsData={viewModel.platformSettingsData}
          progressValue={viewModel.progressValue}
          showProgress={viewModel.showProgress}
          requestToEdit={viewModel.requestToEdit}
          history={props.history}
          checkRequestByTypeExists={viewModel.checkRequestByTypeExists}
          onClickExistingRequest={viewModel.onClickExistingRequest}
          onCreateSubmit={viewModel.onSubmitCreateRequest}
          onEditSubmit={viewModel.onSubmitEditRequest}
          onClickChoosePerformer={viewModel.onClickChoosePerformer}
          onClickThumbnail={viewModel.onClickThumbnail}
        />
      </MainContent>

      <BigImagesModal
        openModal={viewModel.showImageModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showImageModal')}
        images={viewModel.bigImagesOptions.images}
        imgIndex={viewModel.bigImagesOptions.imgIndex}
        setImageIndex={imgIndex => viewModel.setBigImagesOptions(() => ({ ...viewModel.bigImagesOptions, imgIndex }))}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        smallMessage={viewModel.confirmModalSettings.smallMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
        onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
      />
    </React.Fragment>
  )
})
