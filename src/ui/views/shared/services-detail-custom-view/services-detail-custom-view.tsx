import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ReviewsForm } from '@components/forms/reviews-form'
import { MyServicesInfoCustom } from '@components/my-services/my-services-info-custom'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './services-detail-custom-view.style'

import { ServicesDetailCustomViewModel } from './services-detail-custom-view.model'

export const ServicesDetailCustomView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ServicesDetailCustomViewModel(history), [])

  return (
    <>
      <div className={styles.backBtnWrapper}>
        <CustomButton type="primary" size="large" onClick={viewModel.onClickBackBtn}>
          {t(TranslationKey.Back)}
        </CustomButton>
      </div>

      <MyServicesInfoCustom
        request={viewModel.request}
        announcementData={viewModel.announcementData}
        // @ts-ignore
        onClickReview={viewModel.onClickReview}
        onClickSuggestDealBtn={viewModel.onClickSuggestDealBtn}
      />

      {!!viewModel.request && (
        <CustomSearchRequestDetails
          request={viewModel.request}
          // @ts-ignore
          announcementData={viewModel.announcementData}
        />
      )}

      <Modal openModal={viewModel.showReviewModal} setOpenModal={viewModel.onTriggerReviewModal}>
        <ReviewsForm user={viewModel.currentReviewModalUser} onClose={viewModel.onTriggerReviewModal} />
      </Modal>
    </>
  )
})
