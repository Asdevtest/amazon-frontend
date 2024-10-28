import { RadioChangeEvent } from 'antd'
import { useCallback, useState } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'

import { TabValue } from '../types/chat-into.type'

export const useChatInfo = () => {
  const onOpenEditChat = useCallback(() => {
    chatModel.onTriggerOpenModal('showCreateNewChatModal', true)
  }, [])

  const onClickCloseChatInfo = useCallback(() => {
    chatModel.onTriggerOpenModal('showChatInfo', false)
  }, [])

  const onClickDeleteUserForGroupChat = useCallback(() => {}, [])

  return {
    onOpenEditChat,
    onClickCloseChatInfo,
    onClickDeleteUserForGroupChat,
  }
}
