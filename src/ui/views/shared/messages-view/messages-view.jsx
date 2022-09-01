import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {MultipleChats} from '@components/chat/multiple-chats'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {MessagesViewModel} from './messages-view.model'
import {styles} from './messages-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MESSAGES

@observer
class MessagesViewRaw extends Component {
  viewModel = new MessagesViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {
      user,
      chatSelectedId,
      chats,
      drawerOpen,

      onClickChat,
      onTriggerDrawerOpen,
      onSubmitMessage,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Messages)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.chatWrapper}>
                <MultipleChats
                  ref={this.chatRef}
                  chats={chats}
                  userId={user._id}
                  chatSelectedId={chatSelectedId}
                  updateData={this.viewModel.loadData}
                  onSubmitMessage={onSubmitMessage}
                  onClickChat={onClickChat}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const MessagesView = withStyles(styles)(MessagesViewRaw)
