import {cx} from '@emotion/css'
import {Avatar, Typography, Link} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {MultipleChats} from '@components/chat/multiple-chats'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {t} from '@utils/translations'

import {MessagesViewModel} from './messages-view.model'
import {styles} from './messages-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MESSAGES

@observer
class MessagesViewRaw extends Component {
  viewModel = new MessagesViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showProgress,
      typingUsers,
      noticeOfSimpleChats,
      nameSearchValue,
      user,
      chatSelectedId,
      simpleChats,
      drawerOpen,

      onTypingMessage,
      onClickChat,
      onTriggerDrawerOpen,
      onSubmitMessage,
      onClickBackButton,
      onChangeNameSearchValue,
      onTriggerNoticeOfSimpleChats,
    } = this.viewModel
    const {classes: classNames} = this.props

    const currentOpponent = simpleChats.find(el => el._id === chatSelectedId)?.users.find(el => el._id !== user._id)

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Messages)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={cx(classNames.chatHeaderWrapper, {[classNames.hideChatHeaderWrapper]: chatSelectedId})}>
                <div className={classNames.leftSide}>
                  <SearchInput
                    inputClasses={classNames.searchInput}
                    value={nameSearchValue}
                    onChange={onChangeNameSearchValue}
                  />

                  {chatSelectedId && simpleChats.length ? (
                    <Link
                      target="_blank"
                      href={`${window.location.origin}/another-user?${currentOpponent?._id}`}
                      underline="none"
                    >
                      <div className={classNames.opponentWrapper}>
                        <Avatar src={getUserAvatarSrc(currentOpponent?._id)} className={classNames.avatarWrapper} />
                        <Typography className={classNames.opponentName}>{currentOpponent?.name}</Typography>
                      </div>
                    </Link>
                  ) : null}
                </div>

                <div className={classNames.rightSide}>
                  <div className={classNames.tooltipWrapper} onClick={onTriggerNoticeOfSimpleChats}>
                    {noticeOfSimpleChats ? (
                      <Typography className={classNames.noticesTextActive}>
                        {t(TranslationKey['Notices included'])}
                      </Typography>
                    ) : (
                      <Typography className={classNames.noticesTextNoActive}>
                        {t(TranslationKey['Notices are off'])}
                      </Typography>
                    )}

                    <img src={noticeOfSimpleChats ? '/assets/icons/sound-on.svg' : '/assets/icons/sound-off.svg'} />
                  </div>

                  <Button disabled className={classNames.newDialogBtn}>
                    {t(TranslationKey['New Dialogue'])}
                  </Button>
                </div>
              </div>
              <div className={classNames.chatWrapper}>
                <MultipleChats
                  ref={this.chatRef}
                  typingUsers={typingUsers}
                  searchFilter={nameSearchValue}
                  currentOpponent={currentOpponent}
                  chats={simpleChats}
                  userId={user._id}
                  chatSelectedId={chatSelectedId}
                  updateData={this.viewModel.loadData}
                  onTypingMessage={onTypingMessage}
                  onSubmitMessage={onSubmitMessage}
                  onClickChat={onClickChat}
                  onClickBackButton={onClickBackButton}
                />
              </div>
              {showProgress && <CircularProgressWithLabel title={t(TranslationKey['Creating a Chat']) + '...'} />}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const MessagesView = withStyles(MessagesViewRaw, styles)
