/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {MainContent} from '@components/layout/main-content'
import {MyServicesInfoCustom} from '@components/my-services/my-services-info-custom'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {ServicesDetailCustomViewModel} from './services-detail-custom-view.model'
import {styles} from './services-detail-custom-view.style'

@observer
export class ServicesDetailCustomViewRaw extends Component {
  viewModel = new ServicesDetailCustomViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {classes: classNames} = this.props
    const {
      request,
      announcementData,
      showWarningModal,
      showConfirmModal,
      warningInfoModalSettings,
      onTriggerOpenModal,
      onClickBackBtn,
      onClickSuggestDealBtn,
      onClickCancelRequestProposal,
    } = this.viewModel

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.backBtnWrapper}>
            <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
              {t(TranslationKey.Back)}
            </Button>
          </div>

          <div className={classNames.requestInfoWrapper}>
            <MyServicesInfoCustom
              request={request}
              announcementData={announcementData}
              onClickSuggestDealBtn={onClickSuggestDealBtn}
            />
          </div>

          {request ? (
            <div className={classNames.detailsWrapper}>
              <CustomSearchRequestDetails request={request} announcementData={announcementData} />
            </div>
          ) : null}
        </MainContent>

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
}

export const ServicesDetailCustomView = withStyles(ServicesDetailCustomViewRaw, styles)
