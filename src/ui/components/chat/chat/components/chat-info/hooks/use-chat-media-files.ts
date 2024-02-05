import { useEffect, useState } from 'react'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatsModel } from '@models/chats-model'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { ChatAttachmentsType, ChatFileType, FilesType, ImagesType, TabValue, VideoType } from '../chat-into.type'

export const useChatMediaFiles = (chat: ChatContract, currentTab: TabValue) => {
  const [isFilesLoading, setIsFilesLoading] = useState(false)

  const [files, setFiles] = useState<ChatFileType[]>()

  const paginationToTabs = {
    offset: 0,
    limit: 40,
  }

  const getChatMediaFiles = async () => {
    if (currentTab === TabValue.GROUP_CHAT_USERS) return

    setIsFilesLoading(true)

    const res = await ChatsModel.getPagChatMedia({
      type: currentTab,
      guid: chat._id,
      offset: paginationToTabs.offset,
      limit: paginationToTabs.limit,
    })

    console.log('res', res)

    // if ()

    // const imagesList: ChatFileType[] = res.allImages.reduce((acc: ChatFileType[], file: ImagesType) => {
    //   file.images?.forEach(el => acc.push({ file: getAmazonImageUrl(el), _id: file._id }))
    //   return acc
    // }, [])

    // const videoList: ChatFileType[] = res.allVideo.reduce((acc: ChatFileType[], file: VideoType) => {
    //   file.video?.forEach(el => acc.push({ file: getAmazonImageUrl(el), _id: file._id }))
    //   return acc
    // }, [])

    // const fileList: ChatFileType[] = res.allFiles.reduce((acc: ChatFileType[], file: FilesType) => {
    //   file.files?.forEach(el => acc.push({ file: el, _id: file._id }))
    //   return acc
    // }, [])

    // setFiles(fileList)
    // setImages(imagesList)
    // setVideos(videoList)

    setIsFilesLoading(false)
  }

  // useEffect(() => {
  //   if (chat.lastMessage?.images?.length || chat.lastMessage?.files?.length || chat.lastMessage?.video?.length) {
  //     getChatMediaFiles()
  //   }
  // }, [chat.lastMessage?.images, chat.lastMessage?.files, chat.lastMessage?.video])

  useEffect(() => {
    getChatMediaFiles()

    return () => {
      setFiles([])
    }
  }, [currentTab])

  return {
    isFilesLoading,

    files,

    getChatMediaFiles,
  }
}
