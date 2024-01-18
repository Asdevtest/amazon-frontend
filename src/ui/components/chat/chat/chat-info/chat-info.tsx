import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatsModel } from '@models/chats-model'

import { useStyles } from '@components/chat/chat/chat-info/chat-info.styles'
import { ChatGroupUsers } from '@components/chat/chat/chat-info/components/chat-group-users/chat-group-users'
import { ChatInfoHeader } from '@components/chat/chat/chat-info/components/chat-info-header/chat-info-header'
import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import { CurrentOpponent } from '@components/chat/multiple-chats'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ChatAttachmentsType, ChatFileType, FilesType, ImagesType, TabValue, VideoType } from './helpers/chat-into.type'
import { getCustomSwitcherConfig } from './helpers/custom-switcher.config'

interface ChatInfoProps {
  chat: ChatContract
  userId: string
  currentOpponent?: CurrentOpponent
  isGroupChat?: boolean
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const ChatInfo = (props: ChatInfoProps) => {
  const { classes: styles } = useStyles()

  const {
    chat,
    currentOpponent,
    isGroupChat,
    onClickEditGroupChatInfo,
    onRemoveUsersFromGroupChat,
    userId,
    onClickAddUsersToGroupChat,
  } = props

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<TabValue>(isGroupChat ? TabValue.GROUP_CHAT_USERS : TabValue.MEDIA)
  const [ImagesAndVideos, setImagesAndVideos] = useState<ChatFileType[]>([])
  const [files, setFiles] = useState<ChatFileType[]>()
  const [isFilesLoading, setIsFilesLoading] = useState(false)

  const getChatMediaFiles = async () => {
    setIsFilesLoading(true)

    const res: ChatAttachmentsType = (await ChatsModel.getChatMedia(chat._id)) as ChatAttachmentsType

    const imagesList: ChatFileType[] = res.allImages.reduce((acc: ChatFileType[], file: ImagesType) => {
      file.images?.forEach(el => acc.push({ file: el, _id: file._id }))
      return acc
    }, [])

    const videoList: ChatFileType[] = res.allVideo.reduce((acc: ChatFileType[], file: VideoType) => {
      file.video?.forEach(el => acc.push({ file: el, _id: file._id, isVideo: true }))
      return acc
    }, [])

    const fileList: ChatFileType[] = res.allFiles.reduce((acc: ChatFileType[], file: FilesType) => {
      file.files?.forEach(el => acc.push({ file: el, _id: file._id }))
      return acc
    }, [])

    setFiles(fileList)
    setImagesAndVideos(imagesList.concat(videoList))

    setIsFilesLoading(false)
  }

  useEffect(() => {
    getChatMediaFiles()
  }, [])

  useEffect(() => {
    if (chat.lastMessage?.images?.length || chat.lastMessage?.files?.length || chat.lastMessage?.video?.length) {
      getChatMediaFiles()
    }
  }, [chat.lastMessage?.images, chat.lastMessage?.files, chat.lastMessage?.video])

  return (
    <div className={styles.wrapper}>
      <ChatInfoHeader
        chat={chat}
        currentOpponent={currentOpponent}
        isGroupChat={isGroupChat}
        userId={userId}
        onClickEditGroupChatInfo={onClickEditGroupChatInfo}
      />

      <CustomSwitcher
        fullWidth
        switchMode={'medium'}
        condition={currentTab}
        switcherSettings={getCustomSwitcherConfig(isGroupChat)}
        changeConditionHandler={value => setCurrentTab(value as TabValue)}
      />

      <TabPanel value={currentTab} className={styles.tabPanel} index={TabValue.GROUP_CHAT_USERS}>
        <ChatGroupUsers
          chat={chat}
          userId={userId}
          onClickEditGroupChatInfo={onClickEditGroupChatInfo}
          onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
          onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
        />
      </TabPanel>

      <TabPanel value={currentTab} className={styles.tabPanel} index={TabValue.MEDIA}>
        {!!ImagesAndVideos?.length && (
          <div className={styles.imageList}>
            {ImagesAndVideos?.map((el, index) => {
              const validLink = getAmazonImageUrl(el.file)

              const clickHandler = () => {
                setCurrentImageIndex(index)
                setIsImageModalOpen(true)
              }

              return el.isVideo ? (
                <VideoPreloader
                  key={index}
                  wrapperClassName={styles.videoWrapper}
                  videoSource={validLink}
                  onClick={clickHandler}
                />
              ) : (
                <img
                  key={index}
                  src={validLink}
                  alt={el._id}
                  onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                  onClick={clickHandler}
                />
              )
            })}
          </div>
        )}

        {!ImagesAndVideos?.length && !isFilesLoading && (
          <p className={styles.noData}>{t(TranslationKey['No files'])}</p>
        )}

        {isFilesLoading && <p className={styles.noData}>{t(TranslationKey['Loading data'])}...</p>}
      </TabPanel>

      <TabPanel value={currentTab} className={styles.tabPanel} index={TabValue.FILES}>
        <div>{!!files?.length && <ChatMessageFiles files={files?.map(el => el.file)} />}</div>

        {!files?.length && !isFilesLoading && <p className={styles.noData}>{t(TranslationKey['No files'])}</p>}

        {isFilesLoading && <p className={styles.noData}>{t(TranslationKey['Loading data'])}...</p>}
      </TabPanel>

      {isImageModalOpen && (
        <ImageModal
          showPreviews
          isOpenModal={isImageModalOpen}
          handleOpenModal={() => setIsImageModalOpen(prevState => !prevState)}
          files={ImagesAndVideos?.map(el => el?.file?.replace('.preview.webp', '')) || []}
          currentFileIndex={currentImageIndex}
          handleCurrentFileIndex={index => setCurrentImageIndex(index)}
        />
      )}
    </div>
  )
}
