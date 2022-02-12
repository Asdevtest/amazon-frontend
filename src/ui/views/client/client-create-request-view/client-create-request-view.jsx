import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {CreateRequestContent} from '@components/contents/create-request-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientCreateRequestViewModel} from './client-create-request-view.model'

const textConsts = getLocalizedTexts(texts, 'en').clientCreateRequestView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0
@observer
export class ClientCreateRequestView extends Component {
  viewModel = new ClientCreateRequestViewModel({
    history: this.props.history,
  })

  render() {
    const {infoModalText, drawerOpen, showInfoModal, onTriggerDrawerOpen, onTriggerOpenModal, onSubmitCreateRequest} =
      this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <CreateRequestContent history={this.props.history} onSubmit={onSubmitCreateRequest} />
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}
