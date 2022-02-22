import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'
import {ServantGeneralRequestInfo} from '@components/requests-and-request-proposals/servant-general-request-info'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {RequestDetailCustomViewModel} from './requests-detail-custom-view.model'
import {styles} from './requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0

@observer
export class RequestDetailCustomViewRaw extends Component {
  viewModel = new RequestDetailCustomViewModel({
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
      warningInfoModalSettings,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickBackBtn,
      onSubmitOfferDeal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={''}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" onClick={onClickBackBtn}>
                  {'Назад'}
                </Button>
              </div>

              <ServantGeneralRequestInfo request={request} onSubmit={onSubmitOfferDeal} />

              <div className={classNames.detailsWrapper}>
                <CustomSearchRequestDetails request={request} />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const RequestDetailCustomView = withStyles(styles)(RequestDetailCustomViewRaw)
