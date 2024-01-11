import { compareDesc, parseISO } from 'date-fns'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Link } from '@mui/material'

import { chatsType } from '@constants/keys/chats'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'

import { Chat } from '@components/chat/chat'
import { ChatSoundNotification } from '@components/chat/chat-sound-notification'
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
import { ArrowBackIcon, NewDialogIcon, NoSelectedChat } from '@components/shared/svg-icons'

import { checkIsResearcher, isNotUndefined } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './messages-view.style'

import { MessagesViewModel } from './messages-view.model'

export const MessagesView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution, isTabletResolution } = useCreateBreakpointResolutions()

  const [viewModel] = useState(() => new MessagesViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()

    return () => {
      ChatModel.onChangeChatSelectedId(undefined)
    }
  }, [])

  const currentOpponent = viewModel.simpleChats
    .find(el => el._id === viewModel.chatSelectedId)
    ?.users.find(el => el._id !== viewModel.user._id)

  const currentChat = viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)

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
      return compareDesc(parseISO(a.lastMessage?.createdAt), parseISO(b.lastMessage?.createdAt))
    })

  const findChatByChatId = filteredChats.find(chat => chat._id === viewModel.chatSelectedId)

  const isChatSelectedAndFound = isNotUndefined(viewModel.chatSelectedId) && findChatByChatId

  const isMuteCurrentChat = viewModel.mutedChats.includes(currentChat?._id)

  return (
    viewModel.languageTag && (
      <div className={styles.wrapper}>
        <div
          className={cx(styles.leftSide, {
            [styles.mobileResolution]: isChatSelectedAndFound && isMobileResolution,
          })}
        >
          <div className={styles.searchWrapper}>
            <SearchInput
              inputClasses={styles.searchInput}
              value={viewModel.nameSearchValue}
              placeholder={t(TranslationKey['Search companion'])}
              onChange={viewModel.onChangeNameSearchValue}
            />

            {isMobileResolution && (
              <div className={styles.rightSideHeader}>
                <div className={styles.noticesWrapper}>
                  <p
                    className={cx(styles.noticesTextActive, {
                      [styles.noticesTextNotActive]: viewModel.isMuteChats,
                      [styles.mobileResolution]: isMobileResolution,
                    })}
                    onClick={viewModel.onToggleMuteAllChats}
                  >
                    {viewModel.isMuteChats
                      ? t(TranslationKey['Notices are off'])
                      : t(TranslationKey['Notices included'])}
                  </p>

                  <ChatSoundNotification
                    isMuteChat={viewModel.isMuteChats}
                    onToggleMuteChat={viewModel.onToggleMuteAllChats}
                  />
                </div>

                <Button
                  className={styles.newDialogBtn}
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
            mutedChats={viewModel.mutedChats}
            onClickChat={viewModel.onClickChat}
          />
        </div>

        <div className={cx(styles.rightSide, { [styles.mobileResolution]: !isChatSelectedAndFound })}>
          <div className={styles.header}>
            {isChatSelectedAndFound && (
              <div className={styles.leftSideHeader}>
                <div className={styles.infoContainer}>
                  <div className={styles.arrowBackIconWrapper}>
                    <ArrowBackIcon className={styles.arrowBackIcon} onClick={viewModel.onClickBackButton} />
                    {viewModel.unreadMessages > 0 && <span className={styles.badge}>{viewModel.unreadMessages}</span>}
                  </div>

                  {currentChat?.type === chatsType.DEFAULT ? (
                    <>
                      <div className={styles.rersonalWrapper}>
                        <Link
                          target="_blank"
                          href={`${window.location.origin}/another-user?${currentOpponent?._id}`}
                          underline="none"
                        >
                          <div className={styles.opponentWrapper}>
                            <img src={getUserAvatarSrc(currentOpponent?._id)} className={styles.avatar} alt="avatar" />
                            <p className={styles.opponentName}>{currentOpponent?.name}</p>
                          </div>
                        </Link>
                      </div>

                      <ChatSoundNotification
                        isMuteChat={isMuteCurrentChat}
                        onToggleMuteChat={viewModel.onToggleMuteCurrentChat}
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.opponentWrapper}>
                        <img src={getAmazonImageUrl(currentChat?.info?.image)} className={styles.avatar} />
                        <div>
                          <p className={styles.opponentName}>{currentChat?.info.title}</p>
                          <p className={styles.usersCount}>{`${currentChat?.users.length} ${t(
                            TranslationKey.Members,
                          ).toLocaleLowerCase()}`}</p>
                        </div>
                      </div>

                      <ChatSoundNotification
                        isMuteChat={isMuteCurrentChat}
                        onToggleMuteChat={viewModel.onToggleMuteCurrentChat}
                      />
                    </>
                  )}
                </div>

                <div className={styles.searchMessageContainer}>
                  <SearchInput
                    inputClasses={cx(styles.searchInput, {
                      [styles.searchInputShort]: isTabletResolution && viewModel.mesSearchValue,
                    })}
                    placeholder={t(TranslationKey['Message Search'])}
                    onSubmit={value => viewModel.onChangeMesSearchValue(value, findChatByChatId._id)}
                  />

                  {viewModel.messagesFound.length ? (
                    <SearchResult
                      curFoundedMessageIndex={viewModel.curFoundedMessageIndex}
                      messagesFound={viewModel.messagesFound}
                      onClose={() => viewModel.onChangeMesSearchValue('')}
                      onChangeCurFoundedMessage={viewModel.onChangeCurFoundedMessage}
                    />
                  ) : viewModel.mesSearchValue ? (
                    <p className={styles.searchResult}>{t(TranslationKey['Not found'])}</p>
                  ) : null}
                </div>
              </div>
            )}

            {!isMobileResolution && !isChatSelectedAndFound && (
              <div className={styles.rightSideHeader}>
                <div className={styles.noticesWrapper}>
                  <p
                    className={cx(styles.noticesTextActive, {
                      [styles.noticesTextNotActive]: viewModel.isMuteChats,
                    })}
                    onClick={viewModel.onToggleMuteAllChats}
                  >
                    {viewModel.isMuteChats
                      ? t(TranslationKey['Notices are off'])
                      : t(TranslationKey['Notices included'])}
                  </p>

                  <ChatSoundNotification
                    isMuteChat={viewModel.isMuteChats}
                    onToggleMuteChat={() => viewModel.onToggleMuteAllChats()}
                  />
                </div>

                <Button
                  className={styles.newDialogBtn}
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
            <div className={styles.noSelectedChatWrapper}>
              <NoSelectedChat className={styles.noSelectedChatIcon} />
              <p className={styles.noChatTitle}>{t(TranslationKey['Choose chat'])}</p>
              <p className={styles.noChatSubTitle}>
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
          onClickBtn={() => viewModel.onTriggerOpenModal('showWarningInfoModal')}
        />
      </div>
    )
  )
})
