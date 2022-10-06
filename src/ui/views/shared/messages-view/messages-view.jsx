import SearchIcon from '@mui/icons-material/Search'
import {Link} from '@mui/material'

import React, {Component} from 'react'

import {InputAdornment, Avatar, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {MultipleChats} from '@components/chat/multiple-chats'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

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
              <div className={clsx(classNames.chatHeaderWrapper, {[classNames.hideChatHeaderWrapper]: chatSelectedId})}>
                <div className={classNames.leftSide}>
                  <Field
                    containerClasses={classNames.searchContainer}
                    inputClasses={classNames.searchInput}
                    value={nameSearchValue}
                    endAdornment={
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    }
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
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const MessagesView = withStyles(styles)(MessagesViewRaw)
