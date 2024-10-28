import { FC, memo, useMemo } from 'react'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { ChatInfoUserControl } from '../chat-info-user-control/chat-info-user-control'

interface ChatInfoUserControlListProps {
  currentChat: Chat
  onClickDeleteUserForGroupChat: () => void
}

export const ChatInfoUserControlList: FC<ChatInfoUserControlListProps> = memo(props => {
  const { currentChat, onClickDeleteUserForGroupChat } = props

  const sortedUsers = useMemo(() => {
    return currentChat?.users?.sort((a, b) => {
      if (a._id === currentChat?.info?.createdBy) {
        return -1
      } else if (b._id === currentChat?.info?.createdBy) {
        return 1
      } else {
        return 0
      }
    })
  }, [currentChat?.users])

  return (
    <>
      {sortedUsers?.map(user => {
        return (
          <ChatInfoUserControl
            key={user._id}
            user={user}
            isOwner={currentChat?.info?.createdBy === user._id}
            onClickDeleteUserForGroupChat={onClickDeleteUserForGroupChat}
          />
        )
      })}
    </>
  )
})
