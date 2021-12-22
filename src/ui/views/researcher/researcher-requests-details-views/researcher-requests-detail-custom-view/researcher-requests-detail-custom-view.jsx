import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {GeneralRequestInfo} from '@components/requests-and-request-proposals/general-request-info'
import {RequestProposalCustomForm} from '@components/requests-and-request-proposals/request-proposals/forms/request-proposal-custom-from'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/researcherAvatar.jpg'
import {ResearcherRequestDetailCustomViewModel} from './researcher-requests-detail-custom-view.model'
import {styles} from './researcher-requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

@observer
export class ResearcherRequestDetailCustomViewRaw extends Component {
  viewModel = new ResearcherRequestDetailCustomViewModel({
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
      requestProposal,
      showWarningModal,
      warningInfoModalSettings,
      onTriggerDrawerOpen,
      onSubmitRequestProposalForm,
      onTriggerOpenModal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.RESEARCHER}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.RESEARCHER}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.customTitle}</Typography>
              <Typography variant="h5">{`Заявка # ${request.request._id}`}</Typography>
              <GeneralRequestInfo request={request.request} />
              <CustomSearchRequestDetails request={request.details} />
              <div className={classNames.proposalFormWrapper}>
                <RequestProposalCustomForm
                  isEdit={requestProposal}
                  details={requestProposal?.details}
                  onSubmit={onSubmitRequestProposalForm}
                />
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

export const ResearcherRequestDetailCustomView = withStyles(styles)(ResearcherRequestDetailCustomViewRaw)
