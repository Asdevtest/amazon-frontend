import { observer } from 'mobx-react'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { CreateNewChatModal } from '@components/modals/create-new-chat-modal'
import { Modal } from '@components/shared/modal'

import { useStyles } from './chat-view.style'

import { ChatHeader } from './components/chat-header'
import { ChatsList } from './components/chats-list'
import { MessagesBlock } from './components/messages-block'
import { MessagesList } from './components/messages-list'
import { SendMessageBlock } from './components/send-message-block'

export const ChatView = observer(() => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx('viewWrapper', styles.chatViewWrapper)}>
      <ChatsList />

      <div className={cx('viewWrapper', styles.messagesWrapper)}>
        <ChatHeader />

        <MessagesBlock />

        {chatModel.currentChat ? <SendMessageBlock /> : null}
      </div>

      {/* {chatModel.currentChat ? <ChatInfo /> : null} */}

      <Modal
        unsetHidden
        openModal={chatModel.showCreateNewChatModal}
        setOpenModal={() => chatModel.onTriggerOpenModal('showCreateNewChatModal', false)}
      >
        <CreateNewChatModal
          chatToEdit={chatModel.currentChat as Chat}
          closeModal={() => chatModel.onTriggerOpenModal('showCreateNewChatModal', false)}
        />
      </Modal>
    </div>
  )
})
