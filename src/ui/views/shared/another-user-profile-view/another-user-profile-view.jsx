import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {UserProfile} from '@components/screens/users-views/user-profile-view/user-profile'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AnotherProfileViewModel} from './another-user-profile-view.model'
import {styles} from './another-user-profile-view.style'

const textConsts = getLocalizedTexts(texts, 'en').userProfileView

@observer
class AnotherUserProfileViewRaw extends Component {
  viewModel = new AnotherProfileViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {drawerOpen, tabHistory, tabReview, user, headerInfoData, onTriggerDrawerOpen} = this.viewModel

    return (
      <>
        <Navbar drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {user && (
                <UserProfile
                  isAnotherUser
                  user={user}
                  timer={textConsts.timer}
                  headerInfoData={headerInfoData}
                  tabReview={tabReview}
                  tabHistory={tabHistory}
                />
              )}
            </MainContent>
          </Appbar>
        </Main>
      </>
    )
  }
}

export const AnotherUserProfileView = withStyles(styles)(AnotherUserProfileViewRaw)
