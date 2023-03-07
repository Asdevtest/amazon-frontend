/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {MyServicesInfoCustom} from '@components/my-services/my-services-info-custom'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {t} from '@utils/translations'

import {ServicesDetailCustomViewModel} from './services-detail-custom-view.model'
import {styles} from './services-detail-custom-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES

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
      drawerOpen,
      request,
      showWarningModal,
      showConfirmModal,
      warningInfoModalSettings,

      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickBackBtn,
      onClickSuggestDealBtn,
      onClickCancelRequestProposal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Request)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>

              <div className={classNames.requestInfoWrapper}>
                <MyServicesInfoCustom request={request} onClickSuggestDealBtn={onClickSuggestDealBtn} />
              </div>

              {request ? (
                <div className={classNames.detailsWrapper}>
                  <CustomSearchRequestDetails request={request} />
                </div>
              ) : null}
            </MainContent>
          </Appbar>
        </Main>

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
