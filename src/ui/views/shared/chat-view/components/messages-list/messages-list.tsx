import { observer } from 'mobx-react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from 'react-virtualized'

import { Direction } from '@models/chat-model-new/chat-manager/chat-manager.type'
import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'
import { ChatMessage } from '@models/chat-model-new/types/message.type'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './messages-list.style'

import { ChatMessageControls } from '../chat-message-controls'
import { ChatMessageItem } from '../chat-message-item'

export const MessagesList: FC = observer(() => {
  const { classes: styles } = useStyles()

  const currentChat = chatModel.currentChat as Chat
  const chatMessages = chatModel.currentChatMessages as ChatMessage[]

  const [isLoading, setIsLoading] = useState(true)

  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id

  const initChat = async () => {
    setIsLoading(true)
    await chatModel.getChatFirstMessages()
    setIsLoading(false)
  }

  const onClickReply = useCallback((message: ChatMessage) => {
    chatModel.setReplyMessage(chatModel.selectedChatId, message)
  }, [])

  const onSelectMessage = useCallback((message: ChatMessage) => {
    chatModel.setSelectedMessage(chatModel.selectedChatId, message)
  }, [])

  const onClickForwardMessages = useCallback(() => {
    chatModel.handleClickForwardMessages()
  }, [])

  const onClickCopyMessageText = useCallback((message: ChatMessage) => {
    navigator.clipboard.writeText(message?.text)
  }, [])

  useEffect(() => {
    initChat()
  }, [])

  return (
    <>
      {chatMessages?.map(message => {
        const isYourMessage = currentUserId === message.user?._id

        return (
          <ChatMessageControls
            key={message._id}
            disableSelect={false}
            alignRight={isYourMessage}
            message={message}
            onClickReply={onClickReply}
            onSelectMessage={onSelectMessage}
            onClickForwardMessages={onClickForwardMessages}
            onClickCopyMessageText={onClickCopyMessageText}
          >
            <ChatMessageItem isYourMessage={isYourMessage} message={message} />
          </ChatMessageControls>
        )
      })}
    </>
  )
})
