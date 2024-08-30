import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewsForm } from '@components/forms/reviews-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MyServicesInfo } from '@components/my-services/my-services-info'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './services-detail-view.style'

import { ServiceDetailsViewModel } from './services-detail-view.model'

export const ServiceDetailsView = observer(props => {
  const [viewModel] = useState(
    () =>
      new ServiceDetailsViewModel({
        history: props.history,
      }),
  )
  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className="viewWrapper">
      <MyServicesInfo
        announcementData={viewModel.announcementData}
        onClickReview={viewModel.onClickReview}
        onClickEditBtn={viewModel.onClickEditBtn}
        onClickBackBtn={viewModel.onClickBackBtn}
        onClickCloseAnnouncementBtn={viewModel.onClickCloseAnnouncementBtn}
      />

      <CustomDataGrid
        rowCount={viewModel.rowCount}
        columnVisibilityModel={viewModel.columnVisibilityModel}
        paginationModel={viewModel.paginationModel}
        sortModel={viewModel.sortModel}
        filterModel={viewModel.filterModel}
        rows={viewModel.currentData}
        rowHeight={143}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
          toolbar: {
            columsBtnSettings: {
              columnsModel: viewModel.columnsModel,
              columnVisibilityModel: viewModel.columnVisibilityModel,
              onColumnVisibilityModelChange: viewModel.onColumnVisibilityModelChange,
            },
          },
        }}
        density={viewModel.densityModel}
        columns={viewModel.columnsModel}
        loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        onSortModelChange={viewModel.onChangeSortingModel}
        onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
        onPaginationModelChange={viewModel.onPaginationModelChange}
        onFilterModelChange={viewModel.onChangeFilterModel}
      />

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={viewModel.showConfirmModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
          isWarning={viewModel.confirmModalSettings?.isWarning}
          title={viewModel.confirmModalSettings.confirmTitle}
          message={viewModel.confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal openModal={viewModel.showReviewModal} setOpenModal={() => viewModel.onTriggerOpenModal('showReviewModal')}>
        <ReviewsForm
          reviews={viewModel.currentReviews}
          user={viewModel.currentReviewModalUser}
          onClickCloseButton={() => viewModel.onTriggerOpenModal('showReviewModal')}
        />
      </Modal>
    </div>
  )
})
