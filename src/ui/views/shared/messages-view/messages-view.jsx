import { compareDesc, parseISO } from 'date-fns'
import { observer } from 'mobx-react'
import { KeyboardEvent, useEffect, useMemo, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { ONE_MINUTE_IN_MILLISECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatModelAs } from '@models/chat-model-new'

import { Chat } from '@components/chat/chat'
import { ChatSoundNotification } from '@components/chat/chat-sound-notification'
import { ChatsList } from '@components/chat/chats-list'
import { ForwardMessagesForm } from '@components/forms/forward-messages-form'
import { CreateNewChatModal } from '@components/modals/create-new-chat-modal'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'
import { NewDialogIcon, NoSelectedChat } from '@components/shared/svg-icons'

import { checkIsResearcher, isNotUndefined } from '@utils/checks'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './messages-view.style'

import { ChatHeader } from './chat-header/chat-header'
import { MessagesViewModel } from './messages-view.model'

export const MessagesView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution, isTabletResolution } = useCreateBreakpointResolutions()

  const viewModel = useMemo(() => new MessagesViewModel({ history }), [])

  useEffect(() => {
    viewModel.loadData()

    const intervalId = setInterval(() => {
      viewModel.getOnlineUsers()
    }, ONE_MINUTE_IN_MILLISECONDS)

    return () => {
      clearInterval(intervalId)
      ChatModel.onChangeChatSelectedId(undefined)
    }
  }, [])

  const currentChat = viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)
  const currentOpponent = currentChat?.users.find(el => el._id !== viewModel.user._id)

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
      if (a.type === 'SAVED' && b.type !== 'SAVED') {
        return -1
      } else if (a.type !== 'SAVED' && b.type === 'SAVED') {
        return 1
      } else {
        return compareDesc(
          parseISO(a.lastMessage?.createdAt || a.createdAt),
          parseISO(b.lastMessage?.createdAt || b.createdAt),
        )
      }
    })

  const isChatSelectedAndFound = isNotUndefined(viewModel.chatSelectedId) && currentChat
  const isMuteCurrentChat = viewModel.mutedChats.includes(viewModel.chatSelectedId)

  useEffect(() => {
    const escListener = event => {
      if (event.key === 'Escape') {
        viewModel.onClickBackButton()
      }
    }

    document.addEventListener('keydown', escListener)
    return () => document.removeEventListener('keydown', escListener)
  })

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.leftSide, {
          [styles.mobileResolution]: isChatSelectedAndFound && isMobileResolution,
        })}
      >
        <div className={styles.searchWrapper}>
          <CustomInputSearch
            allowClear
            size="large"
            wrapperClassName={styles.searchInput}
            placeholder="Search companion"
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
                  {viewModel.isMuteChats ? t(TranslationKey['Notices are off']) : t(TranslationKey['Notices included'])}
                </p>

                <ChatSoundNotification
                  isMuteChat={viewModel.isMuteChats}
                  onToggleMuteChat={viewModel.onToggleMuteAllChats}
                />
              </div>

              <CustomButton
                type="primary"
                size="large"
                disabled={checkIsResearcher(UserRoleCodeMap[viewModel.user.role])}
                onClick={viewModel.onClickAddNewChatByEmail}
              >
                {isMobileResolution ? <NewDialogIcon /> : t(TranslationKey['New Dialog'])}
              </CustomButton>
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
        {!isMobileResolution && !isChatSelectedAndFound && (
          <div className={styles.rightSideHeader}>
            <div className={styles.noticesWrapper}>
              <p
                className={cx(styles.noticesTextActive, {
                  [styles.noticesTextNotActive]: viewModel.isMuteChats,
                })}
                onClick={viewModel.onToggleMuteAllChats}
              >
                {viewModel.isMuteChats ? t(TranslationKey['Notices are off']) : t(TranslationKey['Notices included'])}
              </p>

              <ChatSoundNotification
                isMuteChat={viewModel.isMuteChats}
                onToggleMuteChat={() => viewModel.onToggleMuteAllChats()}
              />
            </div>

            <CustomButton
              type="primary"
              size="large"
              disabled={checkIsResearcher(UserRoleCodeMap[viewModel.user.role])}
              onClick={viewModel.onClickCreateChatModal}
            >
              {isMobileResolution ? <NewDialogIcon /> : t(TranslationKey['New Dialog'])}
            </CustomButton>
          </div>
        )}

        {isChatSelectedAndFound ? (
          <Chat
            userId={viewModel.user._id}
            chat={currentChat}
            messages={currentChat.messages}
            toScrollMesId={viewModel.curFoundedMessage?._id}
            messagesFound={viewModel.messagesFound}
            searchPhrase={viewModel.mesSearchValue}
            updateData={viewModel.loadData}
            currentOpponent={currentOpponent}
            requestStatus={viewModel.requestStatus}
            headerChatComponent={props => (
              <ChatHeader
                currentChat={currentChat}
                currentOpponent={currentOpponent}
                isChatSelectedAndFound={isChatSelectedAndFound}
                searchInputValue={viewModel.mesSearchValue}
                isTabletResolution={isTabletResolution}
                unreadMessages={viewModel.unreadMessages}
                foundMessages={viewModel.messagesFound}
                isMuteCurrentChat={isMuteCurrentChat}
                curFoundedMessageIndex={viewModel.curFoundedMessageIndex}
                selectedMessages={viewModel.selectedMessages}
                onClickForwardMessages={viewModel.onClickForwardMessages}
                onClearSelectedMessages={viewModel.onClearSelectedMessages}
                onToggleMuteCurrentChat={viewModel.onToggleMuteCurrentChat}
                onClickBackButton={viewModel.onClickBackButton}
                onChangeMesSearchValue={viewModel.onChangeMesSearchValue}
                onChangeCurFoundedMessage={viewModel.onChangeCurFoundedMessage}
                {...props}
              />
            )}
            selectedMessages={viewModel.selectedMessages}
            onSelectMessage={viewModel.onSelectMessage}
            onChangeRequestStatus={viewModel.setRequestStatus}
            onClickForwardMessages={viewModel.onClickForwardMessages}
            onClickClearForwardMessages={viewModel.onClickClearForwardMessages}
            onSubmitMessage={(message, files, replyMessageId, messagesToForward) =>
              viewModel.onSubmitMessage(message, files, viewModel.chatSelectedId, replyMessageId, messagesToForward)
            }
            onTypingMessage={viewModel.onTypingMessage}
            onRemoveUsersFromGroupChat={viewModel.onRemoveUsersFromGroupChat}
            onClickEditGroupChatInfo={viewModel.onClickCreateChatModal}
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
        unsetHidden
        openModal={viewModel.showCreateNewChatModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showCreateNewChatModal', false)}
      >
        <CreateNewChatModal
          chatToEdit={viewModel.simpleChats.find(el => el._id === viewModel.chatSelectedId)}
          closeModal={() => viewModel.onTriggerOpenModal('showCreateNewChatModal', false)}
        />
      </Modal>

      {/* <Modal
        openModal={viewModel.showAddUsersToGroupChatModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showAddUsersToGroupChatModal')}
      >
        <AddUsersToGroupChatForm
          closeModal={() => viewModel.onTriggerOpenModal('showAddUsersToGroupChatModal')}
          usersData={viewModel.usersData}
          onSubmit={viewModel.onSubmitAddUsersToGroupChat}
        />
      </Modal> */}

      <Modal
        openModal={viewModel.showForwardMessagesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showForwardMessagesModal')}
      >
        <ForwardMessagesForm
          user={viewModel.user}
          chats={filteredChats}
          onClickChat={viewModel.onClickForwardToChat}
          onCloseModal={() => viewModel.onTriggerOpenModal('showForwardMessagesModal')}
        />
      </Modal>
    </div>
  )
})
