/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { MyServicesInfoCustom } from '@components/my-services/my-services-info-custom'
import { CustomSearchRequestDetails } from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './services-detail-custom-view.style'

import { ServicesDetailCustomViewModel } from './services-detail-custom-view.model'

export const ServicesDetailCustomViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new ServicesDetailCustomViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.backBtnWrapper}>
          <Button variant="contained" color="primary" className={classNames.backBtn} onClick={viewModel.onClickBackBtn}>
            {t(TranslationKey.Back)}
          </Button>
        </div>

        <div className={classNames.requestInfoWrapper}>
          <MyServicesInfoCustom
            request={viewModel.request}
            announcementData={viewModel.announcementData}
            onClickSuggestDealBtn={viewModel.onClickSuggestDealBtn}
          />
        </div>

        {viewModel.request ? (
          <div className={classNames.detailsWrapper}>
            <CustomSearchRequestDetails request={viewModel.request} announcementData={viewModel.announcementData} />
          </div>
        ) : null}
      </div>

      {/* <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        /> */}

      {/* <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Reject the deal'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onClickCancelRequestProposal}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        /> */}
    </React.Fragment>
  )
}

export const ServicesDetailCustomView = withStyles(observer(ServicesDetailCustomViewRaw), styles)
