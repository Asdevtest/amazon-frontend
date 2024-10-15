import { observer } from 'mobx-react'
import { useCallback } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { ForwardMessagesForm } from '@components/forms/forward-messages-form'
import { CreateNewChatModal } from '@components/modals/create-new-chat-modal'
import { Modal } from '@components/shared/modal'

import { useStyles } from './chat-view.style'

import { ChatHeader } from './components/chat-header'
import { ChatInfo } from './components/chat-info'
import { ChatsList } from './components/chats-list'
import { MessagesBlock } from './components/messages-block'
import { SendMessageBlock } from './components/send-message-block'

export const ChatView = observer(() => {
  const { classes: styles, cx } = useStyles()

  const onCloseCreateNewChat = useCallback(() => {
    chatModel.onTriggerOpenModal('showCreateNewChatModal', false)
  }, [])

  const onClickCloseForwardMessages = useCallback(() => {
    chatModel.onTriggerOpenModal('showForwardMessagesModal', false)
  }, [])

  return (
    <div className={cx('viewWrapper', styles.chatViewWrapper)}>
      <ChatsList />

      <div className={cx('viewWrapper', styles.messagesWrapper)}>
        <ChatHeader />

        <MessagesBlock />

        {chatModel.currentChat ? <SendMessageBlock /> : null}
      </div>

      {chatModel.currentChat ? <ChatInfo /> : null}

      <Modal unsetHidden openModal={chatModel.showCreateNewChatModal} setOpenModal={onCloseCreateNewChat}>
        <CreateNewChatModal chatToEdit={chatModel.currentChat as Chat} closeModal={onCloseCreateNewChat} />
      </Modal>

      <Modal openModal={chatModel.showForwardMessagesModal} setOpenModal={onClickCloseForwardMessages}>
        <ForwardMessagesForm
          chats={chatModel.chats}
          onClickChat={onClickCloseForwardMessages}
          onCloseModal={onClickCloseForwardMessages}
        />
      </Modal>
    </div>
  )
})
