import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'
import {GeneralRequestInfo} from '@components/requests-and-request-proposals/general-request-info'
import {CustomSearchRequestForm} from '@components/requests-and-request-proposals/requests/create-or-edit-forms/custom-search-request-form'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientRequestDetailCustomViewModel} from './client-requests-detail-custom-view.model'
import {styles} from './client-requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').CustomRequestView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0
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
              <GeneralRequestInfo request={request} />

              <div className={classNames.detailsWrapper}>
                <CustomSearchRequestDetails request={request} />
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
