import { useCallback } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

export const useChatHeader = () => {
  const currentChat = chatModel.currentChat as Chat
  const selectedLength = currentChat?.selectedMessages?.length
  const isShowChatInfo = chatModel.showChatInfo

  const onClickForwardMessages = useCallback(() => {
    chatModel.handleClickForwardMessages()
  }, [])

  const onClearSelectedMessages = useCallback(() => {
    chatModel.clearSelectedMessage(currentChat?._id)
  }, [currentChat])

  const onOpenCreateNewChat = useCallback(() => {
    chatModel.onTriggerOpenModal('showCreateNewChatModal', true)
  }, [])

  const onClickOpenChatInfo = useCallback(() => {
    chatModel.onTriggerOpenModal('showChatInfo', !isShowChatInfo)
  }, [isShowChatInfo])

  return {
    currentChat,
    selectedLength,
    isShowChatInfo,
    onClickForwardMessages,
    onClearSelectedMessages,
    onOpenCreateNewChat,
    onClickOpenChatInfo,
  }
}
