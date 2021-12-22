import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {NicheSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/niche-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientRequestDetailNicheViewModel} from './client-requests-detail-niche-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').ClientRequestView

@observer
export class ClientRequestDetailNicheView extends Component {
  viewModel = new ClientRequestDetailNicheViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {drawerOpen, request, onTriggerDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
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
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <NicheSearchRequestDetails request={request} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
