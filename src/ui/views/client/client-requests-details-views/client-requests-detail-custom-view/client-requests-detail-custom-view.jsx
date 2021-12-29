import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {RequestStatus} from '@constants/request-status'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button/error-button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {GeneralRequestInfo} from '@components/requests-and-request-proposals/general-request-info'
import {RequestProposalsDetailsCustom} from '@components/requests-and-request-proposals/request-proposals/request-proposals-details/request-proposals-details-custom'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientRequestDetailCustomViewModel} from './client-requests-detail-custom-view.model'
import {styles} from './client-requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 2
@observer
export class ClientRequestDetailCustomViewRaw extends Component {
  viewModel = new ClientRequestDetailCustomViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,
      request,
      showRequestForm,
      showConfirmModal,
      requestProposals,
      onCLickAcceptProposals,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      removeCustomSearchRequest,
      onSubmitEditCustomSearchRequest,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
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
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Typography variant="h3">{textConsts.customTitle}</Typography>
              <Typography variant="h5">{`Заявка # ${request.request._id}`}</Typography>
              <GeneralRequestInfo request={request.request} />
              <CustomSearchRequestDetails request={request.details} />
              <div className={classNames.requestProposalsWrapper}>
                <RequestProposalsDetailsCustom requestProposals={requestProposals} />
              </div>
              <div className={classNames.btnsWrapper}>
                <div className={classNames.btnsLeftSide}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classNames.button}
                    onClick={() => this.props.history.goBack()}
                  >
                    {textConsts.backBtn}
                  </Button>
                </div>
                <div className={classNames.btnsRightSide}>
                  {requestProposals.length ? (
                    request.request.status !== RequestStatus.COMPLETE ? (
                      <SuccessButton className={classNames.button} onClick={onCLickAcceptProposals}>
                        {textConsts.acceptProposal}
                      </SuccessButton>
                    ) : undefined
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={request.request.status !== RequestStatus.CREATED}
                        className={classNames.button}
                        onClick={() => onTriggerOpenModal('showRequestForm')}
                      >
                        {textConsts.editBtn}
                      </Button>

                      <ErrorButton
                        disabled={request.request.status !== RequestStatus.CREATED}
                        className={classNames.button}
                        onClick={() => onTriggerOpenModal('showConfirmModal')}
                      >
                        {textConsts.removeBtn}
                      </ErrorButton>
                    </>
                  )}
                </div>
              </div>
            </MainContent>
          </Appbar>

          <Modal openModal={showRequestForm} setOpenModal={() => onTriggerOpenModal('showRequestForm')}>
            <Typography variant="h5">{textConsts.modalNewRequestTitle}</Typography>
            <CustomSearchRequestForm
              isEdit
              setOpenModal={() => onTriggerOpenModal('showRequestForm')}
              requestToEdit={request}
              onSubmit={onSubmitEditCustomSearchRequest}
            />
          </Modal>

          <ConfirmationModal
            isWarning
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={textConsts.confirmTitle}
            message={textConsts.confirmMessage}
            successBtnText={textConsts.yesBtn}
            cancelBtnText={textConsts.noBtn}
            onClickSuccessBtn={() => {
              removeCustomSearchRequest()
            }}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />
        </Main>
      </React.Fragment>
    )
  }
}

export const ClientRequestDetailCustomView = withStyles(styles)(ClientRequestDetailCustomViewRaw)
