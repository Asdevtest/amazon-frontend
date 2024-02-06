/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useState } from 'react'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatsModel } from '@models/chats-model'

import { TabValue } from '../chat-into.type'

export const useChatMediaFiles = (chat: ChatContract, isGroupChat: boolean) => {
  const [currentTab, setCurrentTab] = useState<TabValue>(isGroupChat ? TabValue.GROUP_CHAT_USERS : TabValue.PHOTOS)
  const [files, setFiles] = useState<string[]>()

  const [isFilesLoading, setIsFilesLoading] = useState(false)
  const [isAllMediaLoaded, setIsAllMediaLoaded] = useState(false)
  const [offset, setOffset] = useState(0)

  const limit = 30

  const resetSettings = () => {
    setOffset(0)
    setFiles([])
    setIsAllMediaLoaded(false)
  }

  const getChatMediaFiles = async () => {
    if (currentTab === TabValue.GROUP_CHAT_USERS || isFilesLoading || isAllMediaLoaded) return

    setIsFilesLoading(true)

    const arrayOfMedia = await ChatsModel.getPagChatMedia({
      type: currentTab,
      guid: chat._id,
      offset,
      limit,
    })

    setIsAllMediaLoaded(arrayOfMedia?.length < limit)

    const allMedia = arrayOfMedia?.reduce((acc, mediaItem: any) => {
      return acc?.concat?.(mediaItem?.allMedia || [])
    }, [])

    setFiles(prev => prev?.concat?.(allMedia || []))

    setOffset(prev => prev + limit)

    setIsFilesLoading(false)
  }

  const loadMoreMediaFilesHandler = (ref: SyntheticEvent<EventTarget>) => {
    if (ref) {
      const element = ref.target as HTMLDivElement
      const scrollTop = element?.scrollTop
      const containerHeight = element?.clientHeight
      const contentHeight = element?.scrollHeight
      const scrollBottom = contentHeight - (scrollTop + containerHeight)

      if (scrollBottom && scrollBottom < 200) {
        getChatMediaFiles()
      }
    }
  }

  useEffect(() => {
    setOffset(0)
    setFiles([])
    setIsAllMediaLoaded(false)

    getChatMediaFiles()
  }, [currentTab])

  return {
    currentTab,
    setCurrentTab,

    isFilesLoading,

    files,

    getChatMediaFiles,
    loadMoreMediaFilesHandler,
    resetSettings,
  }
}
