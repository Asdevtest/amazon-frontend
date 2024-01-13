import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewsForm } from '@components/forms/reviews-form'
import { MyServicesInfoCustom } from '@components/my-services/my-services-info-custom'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './services-detail-custom-view.style'

import { ServicesDetailCustomViewModel } from './services-detail-custom-view.model'

export const ServicesDetailCustomView = observer(props => {
  const [viewModel] = useState(
    () =>
      new ServicesDetailCustomViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.backBtnWrapper}>
          <Button variant="contained" color="primary" className={styles.backBtn} onClick={viewModel.onClickBackBtn}>
            {t(TranslationKey.Back)}
          </Button>
        </div>

        <div className={styles.requestInfoWrapper}>
          <MyServicesInfoCustom
            request={viewModel.request}
            announcementData={viewModel.announcementData}
            onClickReview={viewModel.onClickReview}
            onClickSuggestDealBtn={viewModel.onClickSuggestDealBtn}
          />
        </div>

        {!!viewModel.request && (
          <div className={styles.detailsWrapper}>
            <CustomSearchRequestDetails request={viewModel.request} announcementData={viewModel.announcementData} />
          </div>
        )}
      </div>

      <Modal openModal={viewModel.showReviewModal} setOpenModal={() => viewModel.onTriggerOpenModal('showReviewModal')}>
        <ReviewsForm
          reviews={viewModel.currentReviews}
          user={viewModel.currentReviewModalUser}
          onClickCloseButton={() => viewModel.onTriggerOpenModal('showReviewModal')}
        />
      </Modal>
    </>
  )
})
