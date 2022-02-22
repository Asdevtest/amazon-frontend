import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {NicheSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/niche-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/researcherAvatar.jpg'
import {ResearcherRequestDetailNicheViewModel} from './researcher-requests-detail-niche-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').ClientRequestView

@observer
export class ResearcherRequestDetailNicheView extends Component {
  viewModel = new ResearcherRequestDetailNicheViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {drawerOpen, request, onTriggerDrawerOpen} = this.viewModel

    return (
      <React.Fragment>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawerOpen}
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
