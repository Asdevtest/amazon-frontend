import SearchIcon from '@mui/icons-material/Search'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {InputAdornment} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {MultipleChats} from '@components/chat/multiple-chats'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

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
      onChangeNameSearchValue,
      onTriggerNoticeOfSimpleChats,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey.Messages)} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.chatHeaderWrapper}>
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

                <div className={classNames.tooltipWrapper} onClick={onTriggerNoticeOfSimpleChats}>
                  {noticeOfSimpleChats ? (
                    <VolumeUpRoundedIcon className={classNames.noticesIcon} />
                  ) : (
                    <VolumeOffRoundedIcon
                      className={clsx(classNames.noticesIcon, {[classNames.noticesIconOff]: !noticeOfSimpleChats})}
                    />
                  )}
                  {noticeOfSimpleChats ? (
                    <Typography className={classNames.noticesTextActive}>
                      {t(TranslationKey['Notices included'])}
                    </Typography>
                  ) : (
                    <Typography className={classNames.noticesTextNoActive}>
                      {t(TranslationKey['Notices are off'])}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={classNames.chatWrapper}>
                <MultipleChats
                  ref={this.chatRef}
                  typingUsers={typingUsers}
                  searchFilter={nameSearchValue}
                  chats={simpleChats}
                  userId={user._id}
                  chatSelectedId={chatSelectedId}
                  updateData={this.viewModel.loadData}
                  onTypingMessage={onTypingMessage}
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
