import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'

import { CreateOrEditRequestContent } from '@components/contents/create-or-edit-request-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { t } from '@utils/translations'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { CreateOrEditRequestViewModel } from './create-or-edit-request-view.model'

export const CreateOrEditRequestView = observer(({ history }) => {
  const mainContentRef = useRef()
  const [viewModel] = useState(() => new CreateOrEditRequestViewModel({ history }))
  const [useProductsPermissions] = useState(() => new UseProductsPermissions(ClientModel.getProductPermissionsData))

  useEffect(() => {
    viewModel.loadData()
    useProductsPermissions.getPermissionsData()
  }, [])

  return (
    <>
      <div ref={mainContentRef}>
        {viewModel.requestStatus === loadingStatuses.IS_LOADING ? (
          <CircularProgressWithLabel />
        ) : (
          <CreateOrEditRequestContent
            mainContentRef={mainContentRef}
            specs={viewModel.specs}
            executor={viewModel.executor}
            choosenAnnouncements={viewModel.choosenAnnouncements}
            permissionsData={useProductsPermissions.permissionsData}
            masterUsersData={viewModel.masterUsersData}
            announcements={viewModel.announcements}
            platformSettingsData={viewModel.platformSettingsData}
            progressValue={viewModel.progressValue}
            showProgress={viewModel.showProgress}
            requestToEdit={viewModel.requestToEdit}
            showGalleryModal={viewModel.showGalleryModal}
            productMedia={viewModel.productMedia}
            checkRequestByTypeExists={viewModel.checkRequestByTypeExists}
            createRequestForIdeaData={viewModel.createRequestForIdeaData}
            getMasterUsersData={viewModel.getMasterUsersData}
            loadMorePermissionsDataHadler={() => useProductsPermissions.loadMoreDataHadler()}
            onClickSubmitSearch={value => useProductsPermissions.onClickSubmitSearch(value)}
            onClickExistingRequest={viewModel.onClickExistingRequest}
            onCreateSubmit={viewModel.onSubmitCreateRequest}
            onEditSubmit={viewModel.onSubmitEditRequest}
            onClickChoosePerformer={viewModel.onClickChoosePerformer}
            onClickThumbnail={viewModel.onClickThumbnail}
            onClickAddMediaFromProduct={viewModel.onClickAddMediaFromProduct}
            onTriggerGalleryModal={() => viewModel.onTriggerOpenModal('showGalleryModal')}
          />
        )}
      </div>

      {viewModel.showImageModal ? (
        <ImageModal
          showPreviews
          files={viewModel.bigImagesOptions.images}
          currentFileIndex={viewModel.bigImagesOptions.imgIndex}
          isOpenModal={viewModel.showImageModal}
          onOpenModal={() => viewModel.onTriggerOpenModal('showImageModal')}
          onCurrentFileIndex={index =>
            viewModel.setBigImagesOptions({
              ...viewModel.bigImagesOptions,
              imgIndex: index,
            })
          }
        />
      ) : null}

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          isWarning={viewModel.confirmModalSettings?.isWarning}
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
      ) : null}
    </>
  )
})
