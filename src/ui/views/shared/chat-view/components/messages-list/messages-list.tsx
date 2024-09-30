import { Empty } from 'antd'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { chatModel } from '@models/chat-model-new/chat-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './messages-list.style'

import { ChatMessageItem } from '../chat-message-item/chat-message-item'
import { EmptyChatMessages } from '../empty-chat-messages/empty-chat-messages'

export const MessagesList = observer(() => {
  const { classes: styles, cx } = useStyles()

  const isSelectedChat = !!chatModel.selectedChatId
  const chatMessages = chatModel.currentChatMessages
  const emptyChat = !isSelectedChat || !chatMessages?.length

  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id

  return (
    <div
      className={cx(styles.messagesListWrapper, {
        [styles.noSelectedChat]: emptyChat,
      })}
    >
      {emptyChat ? (
        <EmptyChatMessages />
      ) : (
        chatMessages?.map(message => (
          <ChatMessageItem key={message._id} currentUserId={currentUserId} message={message} />
        ))
      )}
    </div>
  )
})
