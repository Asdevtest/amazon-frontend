import { RadioChangeEvent } from 'antd'
import { useCallback, useState } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'

import { TabValue } from '../types/chat-into.type'

export const useChatInfo = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>(TabValue.GROUP_CHAT_USERS)

  const onClickTab = useCallback((event: RadioChangeEvent) => {
    setCurrentTab(event?.target?.value)
  }, [])

  const onOpenEditChat = useCallback(() => {
    chatModel.onTriggerOpenModal('showCreateNewChatModal', true)
  }, [])

  const onClickCloseChatInfo = useCallback(() => {
    chatModel.onTriggerOpenModal('showChatInfo', false)
  }, [])

  return {
    currentTab,
    onClickTab,

    onOpenEditChat,
    onClickCloseChatInfo,
  }
}
