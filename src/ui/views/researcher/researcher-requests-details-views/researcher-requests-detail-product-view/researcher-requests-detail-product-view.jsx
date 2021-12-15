import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {ProductSearchRequestDetails} from '@components/requests/requests-details/product-request-details'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/researcherAvatar.jpg'
import {ResearcherRequestDetailProductViewModel} from './researcher-requests-detail-product-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').ClientRequestView

@observer
export class ResearcherRequestDetailProductView extends Component {
  viewModel = new ResearcherRequestDetailProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {drawerOpen, request, onTriggerDrawerOpen} = this.viewModel

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
              <ProductSearchRequestDetails request={request} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
