import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Listing} from '@components/product/listing'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientListingViewModel} from './listing-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').clientListingView

@observer
export class ClientListingView extends Component {
  viewModel = new ClientListingViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {product, drawerOpen, onTriggerDrawerOpen, history} = this.viewModel

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
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Listing product={product} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
