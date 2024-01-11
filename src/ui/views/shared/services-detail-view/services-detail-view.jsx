import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewsForm } from '@components/forms/reviews-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MyServicesInfo } from '@components/my-services/my-services-info'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

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
    <React.Fragment>
      <div>
        <MyServicesInfo
          announcementData={viewModel.announcementData}
          onClickReview={viewModel.onClickReview}
          onClickEditBtn={viewModel.onClickEditBtn}
          onClickBackBtn={viewModel.onClickBackBtn}
          onClickCloseAnnouncementBtn={viewModel.onClickCloseAnnouncementBtn}
        />

        <div className={styles.dataGridWrapper}>
          <CustomDataGrid
            useResizeContainer
            localeText={getLocalizationByLanguageTag()}
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
            loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
            onSortModelChange={viewModel.onChangeSortingModel}
            onColumnVisibilityModelChange={viewModel.onColumnVisibilityModelChange}
            onPaginationModelChange={viewModel.onChangePaginationModelChange}
            onFilterModelChange={viewModel.onChangeFilterModel}
          />
        </div>
      </div>

      <ConfirmationModal
        openModal={viewModel.showConfirmModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showConfirmModal')}
        isWarning={viewModel.confirmModalSettings?.isWarning}
        title={viewModel.confirmModalSettings.confirmTitle}
        message={viewModel.confirmModalSettings.confirmMessage}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickConfirm}
        onClickCancelBtn={() => viewModel.onTriggerOpenModal('showConfirmModal')}
      />

      <Modal openModal={viewModel.showReviewModal} setOpenModal={() => viewModel.onTriggerOpenModal('showReviewModal')}>
        <ReviewsForm
          reviews={viewModel.currentReviews}
          user={viewModel.currentReviewModalUser}
          onClickCloseButton={() => viewModel.onTriggerOpenModal('showReviewModal')}
        />
      </Modal>
    </React.Fragment>
  )
})
