import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {ProductSearchRequestContent} from '@components/product/product-request-content'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/researcherAvatar.jpg'
import {ResearcherRequestViewModel} from './researcher-request-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').ResearcherRequestView

@observer
export class ResearcherRequestView extends Component {
  viewModel = new ResearcherRequestViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

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
              <Typography variant="h3">{textConsts.mainTitle}</Typography>
              <ProductSearchRequestContent request={request} />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
