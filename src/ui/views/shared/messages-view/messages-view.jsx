import {cx} from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {Avatar, Typography, Link} from '@mui/material'

import React, {Component} from 'react'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {MultipleChats} from '@components/chat/multiple-chats'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {AddNewChatByEmailForm} from '@components/forms/add-new-chat-by-email-form'
import {AddUsersToGroupChatForm} from '@components/forms/add-users-to-group-chat-form'
import {EditGroupChatInfoForm} from '@components/forms/edit-group-chat-info-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
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
      warningInfoModalSettings,
      curFoundedMessage,
      messagesFound,
      mesSearchValue,
      usersData,
      showAddNewChatByEmailModal,
      showAddUsersToGroupChatModal,
      showEditGroupChatInfoModal,
      showWarningInfoModal,
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
      onChangeMesSearchValue,
      onTriggerNoticeOfSimpleChats,
      onTriggerOpenModal,
      onClickAddNewChatByEmail,
      onSubmitAddNewChat,
      onChangeCurFoundedMessage,
      onClickAddUsersToGroupChat,
      onSubmitAddUsersToGroupChat,
      onRemoveUsersFromGroupChat,
      onClickEditGroupChatInfo,
      onSubmitPatchInfoGroupChat,
    } = this.viewModel
    const {classes: classNames} = this.props

    const currentOpponent = simpleChats.find(el => el._id === chatSelectedId)?.users.find(el => el._id !== user._id)

    const currentChat = simpleChats.find(el => el._id === chatSelectedId)

    // console.log('messagesFound', messagesFound)

    const curFoundedMessageIndex = messagesFound?.findIndex(el => curFoundedMessage?._id === el._id)

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
                    <div className={classNames.chatSelectedWrapper}>
                      {currentChat.users.length <= 2 ? (
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
                      ) : (
                        <div className={classNames.opponentWrapper}>
                          <Avatar src={currentChat.info.image} className={classNames.avatarWrapper} />
                          <div>
                            <Typography className={classNames.opponentName}>{currentChat.info.title}</Typography>
                            <Typography className={classNames.usersCount}>{`${currentChat.users.length} ${t(
                              TranslationKey.Members,
                            ).toLocaleLowerCase()}`}</Typography>
                          </div>
                        </div>
                      )}

                      <SearchInput
                        inputClasses={classNames.searchInput}
                        placeholder={t(TranslationKey['Message Search'])}
                        value={mesSearchValue}
                        onChange={onChangeMesSearchValue}
                      />

                      {messagesFound.length ? (
                        <div className={classNames.searchResultWrapper}>
                          <Typography className={classNames.searchResult}>
                            {t(TranslationKey['Search results']) + ':'}
                          </Typography>

                          <Typography className={classNames.searchResultNum}>{`${curFoundedMessageIndex + 1} ${t(
                            TranslationKey['out of'],
                          )} ${messagesFound.length}`}</Typography>

                          <div className={classNames.dropUpOrDownWrapper}>
                            <ArrowDropUpIcon
                              className={cx(classNames.searchIconBtn, {
                                [classNames.searchDisabledIconBtn]: curFoundedMessageIndex === 0,
                              })}
                              onClick={() =>
                                curFoundedMessageIndex !== 0 && onChangeCurFoundedMessage(curFoundedMessageIndex - 1)
                              }
                            />

                            <ArrowDropDownIcon
                              className={cx(classNames.searchIconBtn, {
                                [classNames.searchDisabledIconBtn]: curFoundedMessageIndex + 1 === messagesFound.length,
                              })}
                              onClick={() =>
                                curFoundedMessageIndex + 1 !== messagesFound.length &&
                                onChangeCurFoundedMessage(curFoundedMessageIndex + 1)
                              }
                            />
                          </div>

                          <CloseOutlinedIcon
                            className={classNames.searchIconBtn}
                            onClick={() => onChangeMesSearchValue({target: {value: ''}})}
                          />
                        </div>
                      ) : null}
                    </div>
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

                  <Button className={classNames.newDialogBtn} onClick={onClickAddNewChatByEmail}>
                    {t(TranslationKey['New Dialogue'])}
                  </Button>
                </div>
              </div>
              <div className={classNames.chatWrapper}>
                <MultipleChats
                  ref={this.chatRef}
                  toScrollMesId={curFoundedMessage?._id}
                  searchPhrase={mesSearchValue}
                  messagesFound={messagesFound}
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
                  onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
                  onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
                  onClickEditGroupChatInfo={onClickEditGroupChatInfo}
                />
              </div>
              {showProgress && <CircularProgressWithLabel title={/* t(TranslationKey['Creating a Chat']) +*/ '...'} />}

              <Modal
                openModal={showAddNewChatByEmailModal}
                setOpenModal={() => onTriggerOpenModal('showAddNewChatByEmailModal')}
              >
                <AddNewChatByEmailForm
                  closeModal={() => onTriggerOpenModal('showAddNewChatByEmailModal')}
                  usersData={usersData}
                  onSubmit={onSubmitAddNewChat}
                />
              </Modal>

              <Modal
                openModal={showAddUsersToGroupChatModal}
                setOpenModal={() => onTriggerOpenModal('showAddUsersToGroupChatModal')}
              >
                <AddUsersToGroupChatForm
                  closeModal={() => onTriggerOpenModal('showAddUsersToGroupChatModal')}
                  usersData={usersData}
                  onSubmit={onSubmitAddUsersToGroupChat}
                />
              </Modal>

              <Modal
                openModal={showEditGroupChatInfoModal}
                setOpenModal={() => onTriggerOpenModal('showEditGroupChatInfoModal')}
              >
                <EditGroupChatInfoForm
                  chat={simpleChats.find(el => el._id === chatSelectedId)}
                  onSubmit={onSubmitPatchInfoGroupChat}
                  onCloseModal={() => onTriggerOpenModal('showEditGroupChatInfoModal')}
                />
              </Modal>

              <WarningInfoModal
                isWarning={warningInfoModalSettings.isWarning}
                openModal={showWarningInfoModal}
                setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
                title={warningInfoModalSettings.title}
                btnText={t(TranslationKey.Ok)}
                onClickBtn={() => {
                  onTriggerOpenModal('showWarningInfoModal')
                }}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const MessagesView = withStyles(MessagesViewRaw, styles)
