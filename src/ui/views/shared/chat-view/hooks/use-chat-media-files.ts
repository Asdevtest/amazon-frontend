/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioChangeEvent } from 'antd'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { ChatsModel } from '@models/chats-model'

import { TabValue } from '../types/chat-into.type'

interface IMedia {
  _id?: string
  chatId?: string
  offset?: number
  allMedia?: Array<string>
}

export const useChatMediaFiles = (isGroupChat: boolean, chatId: string) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentTab, setCurrentTab] = useState<TabValue>(isGroupChat ? TabValue.GROUP_CHAT_USERS : TabValue.PHOTOS)

  const [files, setFiles] = useState<string[]>([])

  const [isFilesLoading, setIsFilesLoading] = useState(false)
  const [isAllMediaLoaded, setIsAllMediaLoaded] = useState(false)
  const [offset, setOffset] = useState(0)

  const limit = 30

  const resetSettings = () => {
    setIsFilesLoading(false)
    setOffset(0)
    setFiles([])
    setIsAllMediaLoaded(false)
  }

  const getChatMediaFiles = async () => {
    if (currentTab === TabValue.GROUP_CHAT_USERS || isFilesLoading || isAllMediaLoaded) {
      return
    }

    setIsFilesLoading(true)

    const arrayOfMedia = await ChatsModel.getPagChatMedia({
      type: currentTab,
      guid: chatId,
      offset,
      limit,
    })

    setIsAllMediaLoaded(arrayOfMedia?.length < limit)

    const allMedia = arrayOfMedia?.reduce<string[]>((acc, mediaItem: IMedia) => {
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

  const onClickTab = useCallback((event: RadioChangeEvent) => {
    setCurrentTab(event?.target?.value)
    resetSettings()
  }, [])

  const onSetCurrentImageIndex = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const onClickMediaFile = useCallback((index: number) => {
    onSetCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }, [])

  const onCloseImageModal = useCallback(() => {
    setIsImageModalOpen(false)
  }, [])

  useEffect(() => {
    getChatMediaFiles()
  }, [currentTab])

  return {
    currentTab,
    onClickTab,

    isFilesLoading,

    files,

    resetSettings,
    loadMoreMediaFilesHandler,

    isImageModalOpen,
    onClickMediaFile,
    onSetCurrentImageIndex,

    currentImageIndex,
    onCloseImageModal,
  }
}
