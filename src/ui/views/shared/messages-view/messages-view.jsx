import { cx } from '@emotion/css'
import { compareDesc, parseISO } from 'date-fns'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Avatar, Link } from '@mui/material'

import { isMobileResolution, isTabletResolution } from '@constants/configs/sizes-settings'
import { chatsType } from '@constants/keys/chats'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { Chat } from '@components/chat/chat'
import { useMuteChat } from '@components/chat/chat/use-mute-chat'
import { ChatsList } from '@components/chat/chats-list'
import { SearchResult } from '@components/chat/search-result'
import { AddNewChatByEmailForm } from '@components/forms/add-new-chat-by-email-form'
import { AddUsersToGroupChatForm } from '@components/forms/add-users-to-group-chat-form'
import { EditGroupChatInfoForm } from '@components/forms/edit-group-chat-info-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'
import { SearchInput } from '@components/shared/search-input'
import { ArrowBackIcon, NewDialogIcon, NoSelectedChat, SoundOffIcon, SoundOnIcon } from '@components/shared/svg-icons'

import { checkIsResearcher, isNotUndefined } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { MessagesViewModel } from './messages-view.model'
import { useClassNames } from './messages-view.style'

export const MessagesView = observer(props => {
  const { classes: classNames } = useClassNames()
  const [viewModel] = useState(() => new MessagesViewModel({ history: props.history, location: props.location }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const currentOpponent = viewModel.simpleChats
    .find(el => el._id === viewModel.chatSelectedId)
    ?.users.find(el => el._id !== viewModel.user._id)

  const currentChat = viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)

  const curFoundedMessageIndex = viewModel.messagesFound?.findIndex(el => viewModel.curFoundedMessage?._id === el._id)

  const filteredChats = viewModel.simpleChats
    .filter(el => {
      const oponentUser = el.users.filter(user => user._id !== viewModel.user._id)?.[0]
      const title = typeof oponentUser?.name === 'string' ? oponentUser.name : 'User'
      if (
        !viewModel.nameSearchValue ||
        title.toLocaleLowerCase().includes(viewModel.nameSearchValue.toLocaleLowerCase())
      ) {
        return true
      } else {
        return false
      }
    })
    .sort((a, b) => {
      return compareDesc(
        parseISO(a.messages[a.messages.length - 1]?.createdAt || a?.createdAt),
        parseISO(b.messages[b.messages.length - 1]?.createdAt || b?.createdAt),
      )
    })

  const findChatByChatId = filteredChats.find(chat => chat._id === viewModel.chatSelectedId)

  const isChatSelectedAndFound = isNotUndefined(viewModel.chatSelectedId) && findChatByChatId

  const { isMuteCurrentChat, onToggleMuteCurrentChat } = useMuteChat(viewModel.chatSelectedId)

  const totalUnreadMessages = filteredChats.reduce(
    (acc, chat) => acc + chat.messages.filter(el => !el.isRead).length,
    0,
  )

  return (
    viewModel.languageTag && (
      <div className={classNames.wrapper}>
        <div
          className={cx(classNames.leftSide, {
            [classNames.mobileResolution]: isChatSelectedAndFound && isMobileResolution,
          })}
        >
          <div className={classNames.searchWrapper}>
            <SearchInput
              inputClasses={classNames.searchInput}
              value={viewModel.nameSearchValue}
              placeholder={t(TranslationKey['Search companion'])}
              onChange={viewModel.onChangeNameSearchValue}
            />

            {isMobileResolution && (
              <div className={classNames.rightSideHeader}>
                <div className={classNames.noticesWrapper} onClick={viewModel.onTriggerNoticeOfSimpleChats}>
                  <p
                    className={cx(classNames.noticesTextActive, {
                      [classNames.noticesTextNotActive]: !viewModel.noticeOfSimpleChats,
                      [classNames.mobileResolution]: isMobileResolution,
                    })}
                  >
                    {viewModel.noticeOfSimpleChats
                      ? t(TranslationKey['Notices included'])
                      : t(TranslationKey['Notices are off'])}
                  </p>

                  {viewModel.noticeOfSimpleChats ? <SoundOnIcon /> : <SoundOffIcon />}
                </div>

                <Button
                  className={classNames.newDialogBtn}
                  disabled={checkIsResearcher(UserRoleCodeMap[viewModel.user.role])}
                  onClick={viewModel.onClickAddNewChatByEmail}
                >
                  {isMobileResolution ? <NewDialogIcon /> : t(TranslationKey['New Dialog'])}
                </Button>
              </div>
            )}
          </div>

          <ChatsList
            userId={viewModel.user._id}
            typingUsers={viewModel.typingUsers}
            chats={filteredChats}
            chatSelectedId={viewModel.chatSelectedId}
            onClickChat={viewModel.onClickChat}
          />
        </div>

        <div className={cx(classNames.rightSide, { [classNames.mobileResolution]: !isChatSelectedAndFound })}>
          <div className={classNames.header}>
            {isChatSelectedAndFound && (
              <div className={classNames.leftSideHeader}>
                <div className={classNames.infoContainer}>
                  <div className={classNames.arrowBackIconWrapper}>
                    <ArrowBackIcon className={classNames.arrowBackIcon} onClick={viewModel.onClickBackButton} />
                    {totalUnreadMessages && <span className={classNames.badge}>{totalUnreadMessages}</span>}
                  </div>

                  {currentChat?.type === chatsType.DEFAULT ? (
                    <>
                      <div className={classNames.rersonalWrapper}>
                        <Link
                          target="_blank"
                          href={`${window.location.origin}/another-user?${currentOpponent?._id}`}
                          underline="none"
                        >
                          <div className={classNames.opponentWrapper}>
                            <Avatar
                              src={getUserAvatarSrc(currentOpponent?._id)}
                              className={classNames.avatar}
                              alt="avatar"
                            />
                            <p className={classNames.opponentName}>{currentOpponent?.name}</p>
                          </div>
                        </Link>
                      </div>

                      {isMuteCurrentChat ? (
                        <SoundOffIcon onClick={onToggleMuteCurrentChat} />
                      ) : (
                        <SoundOnIcon onClick={onToggleMuteCurrentChat} />
                      )}
                    </>
                  ) : (
                    <div className={classNames.opponentWrapper}>
                      <Avatar src={currentChat?.info.image} className={classNames.avatar} />
                      <div>
                        <p className={classNames.opponentName}>{currentChat?.info.title}</p>
                        <p className={classNames.usersCount}>{`${currentChat?.users.length} ${t(
                          TranslationKey.Members,
                        ).toLocaleLowerCase()}`}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className={classNames.searchMessageContainer}>
                  <SearchInput
                    inputClasses={cx(classNames.searchInput, {
                      [classNames.searchInputShort]: isTabletResolution && viewModel.mesSearchValue,
                    })}
                    placeholder={t(TranslationKey['Message Search'])}
                    value={viewModel.mesSearchValue}
                    onChange={viewModel.onChangeMesSearchValue}
                  />

                  {viewModel.messagesFound.length ? (
                    <SearchResult
                      curFoundedMessageIndex={curFoundedMessageIndex}
                      messagesFound={viewModel.messagesFound}
                      onClose={() => viewModel.onChangeMesSearchValue({ target: { value: '' } })}
                      onChangeCurFoundedMessage={viewModel.onChangeCurFoundedMessage}
                    />
                  ) : viewModel.mesSearchValue ? (
                    <p className={classNames.searchResult}>{t(TranslationKey['Not found'])}</p>
                  ) : null}
                </div>
              </div>
            )}

            {!isMobileResolution && !isChatSelectedAndFound && (
              <div className={classNames.rightSideHeader}>
                <div className={classNames.noticesWrapper} onClick={viewModel.onTriggerNoticeOfSimpleChats}>
                  <p
                    className={cx(classNames.noticesTextActive, {
                      [classNames.noticesTextNotActive]: !viewModel.noticeOfSimpleChats,
                    })}
                  >
                    {viewModel.noticeOfSimpleChats
                      ? t(TranslationKey['Notices included'])
                      : t(TranslationKey['Notices are off'])}
                  </p>

                  {viewModel.noticeOfSimpleChats ? <SoundOnIcon /> : <SoundOffIcon />}
                </div>

                <Button
                  className={classNames.newDialogBtn}
                  disabled={checkIsResearcher(UserRoleCodeMap[viewModel.user.role])}
                  onClick={viewModel.onClickAddNewChatByEmail}
                >
                  {isMobileResolution ? <NewDialogIcon /> : t(TranslationKey['New Dialog'])}
                </Button>
              </div>
            )}
          </div>

          {isChatSelectedAndFound ? (
            <Chat
              userId={viewModel.user._id}
              chat={findChatByChatId}
              messages={findChatByChatId.messages}
              toScrollMesId={viewModel.curFoundedMessage?._id}
              messagesFound={viewModel.messagesFound}
              searchPhrase={viewModel.mesSearchValue}
              updateData={viewModel.loadData}
              currentOpponent={currentOpponent}
              onSubmitMessage={(message, files, replyMessageId) =>
                viewModel.onSubmitMessage(message, files, viewModel.chatSelectedId, replyMessageId)
              }
              onTypingMessage={viewModel.onTypingMessage}
              onClickAddUsersToGroupChat={viewModel.onClickAddUsersToGroupChat}
              onRemoveUsersFromGroupChat={viewModel.onRemoveUsersFromGroupChat}
              onClickEditGroupChatInfo={viewModel.onClickEditGroupChatInfo}
            />
          ) : !isMobileResolution ? (
            <div className={classNames.noSelectedChatWrapper}>
              <NoSelectedChat className={classNames.noSelectedChatIcon} />
              <p className={classNames.noChatTitle}>{t(TranslationKey['Choose chat'])}</p>
              <p className={classNames.noChatSubTitle}>
                {t(TranslationKey['Try selecting a dialogue or Find a concrete speaker'])}
              </p>
            </div>
          ) : null}
        </div>

        {viewModel.showProgress && <CircularProgressWithLabel title={'...'} />}

        <Modal
          openModal={viewModel.showAddNewChatByEmailModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddNewChatByEmailModal')}
        >
          <AddNewChatByEmailForm
            closeModal={() => viewModel.onTriggerOpenModal('showAddNewChatByEmailModal')}
            usersData={viewModel.usersData}
            onSubmit={viewModel.onSubmitAddNewChat}
          />
        </Modal>

        <Modal
          openModal={viewModel.showAddUsersToGroupChatModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showAddUsersToGroupChatModal')}
        >
          <AddUsersToGroupChatForm
            closeModal={() => viewModel.onTriggerOpenModal('showAddUsersToGroupChatModal')}
            usersData={viewModel.usersData}
            onSubmit={viewModel.onSubmitAddUsersToGroupChat}
          />
        </Modal>

        <Modal
          openModal={viewModel.showEditGroupChatInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showEditGroupChatInfoModal')}
        >
          <EditGroupChatInfoForm
            chat={viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)}
            onSubmit={viewModel.onSubmitPatchInfoGroupChat}
            onCloseModal={() => viewModel.onTriggerOpenModal('showEditGroupChatInfoModal')}
          />
        </Modal>

        <WarningInfoModal
          isWarning={viewModel.warningInfoModalSettings.isWarning}
          openModal={viewModel.showWarningInfoModal}
          setOpenModal={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
          title={viewModel.warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            viewModel.onTriggerOpenModal('showWarningInfoModal')
          }}
        />
      </div>
    )
  )
})
