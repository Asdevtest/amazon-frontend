import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {UserProfile} from '@components/screens/users-views/user-profile-view/user-profile'

import {t} from '@utils/translations'

import {AnotherProfileViewModel} from './another-user-profile-view.model'
import {styles} from './another-user-profile-view.style'

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
          <Appbar title={t(TranslationKey.User)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              {user && (
                <UserProfile
                  isAnotherUser
                  user={user}
                  timer={'14 минут'}
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
