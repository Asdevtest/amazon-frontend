import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CreateOrEditRequestContent } from '@components/contents/create-or-edit-request-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { CreateOrEditRequestViewModel } from './create-or-edit-request-view.model'

export const CreateOrEditRequestView = observer(({ history }) => {
  const mainContentRef = useRef()
  const viewModel = useMemo(() => new CreateOrEditRequestViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div ref={mainContentRef} style={{ height: '100%' }}>
        {viewModel.requestStatus === loadingStatus.IS_LOADING ? (
          <CircularProgressWithLabel />
        ) : (
          <CreateOrEditRequestContent
            mainContentRef={mainContentRef}
            specs={viewModel.specs}
            executor={viewModel.executor}
            choosenAnnouncements={viewModel.choosenAnnouncements}
            masterUsersData={viewModel.masterUsersData}
            announcements={viewModel.announcements}
            platformSettingsData={viewModel.platformSettings}
            requestToEdit={viewModel.requestToEdit}
            showGalleryModal={viewModel.showGalleryModal}
            productMedia={viewModel.productMedia}
            checkRequestByTypeExists={viewModel.checkRequestByTypeExists}
            createRequestForIdeaData={viewModel.createRequestForIdeaData}
            getMasterUsersData={viewModel.getMasterUsersData}
            onClickExistingRequest={viewModel.onClickExistingRequest}
            onCreateSubmit={viewModel.onSubmitCreateRequest}
            onEditSubmit={viewModel.onSubmitEditRequest}
            onClickChoosePerformer={viewModel.onClickChoosePerformer}
            onClickAddMediaFromProduct={viewModel.onClickAddMediaFromProduct}
            onTriggerGalleryModal={() => viewModel.onTriggerOpenModal('showGalleryModal')}
          />
        )}
      </div>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => {
            viewModel.onTriggerOpenModal('showConfirmModal')
            viewModel.pushSuccess()
          }}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          smallMessage={viewModel.confirmModalSettings.smallMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onSubmit}
          onClickCancelBtn={viewModel.confirmModalSettings.onCancel}
        />
      ) : null}
    </>
  )
})
