import { useEffect, useState } from 'react'

import { Tabs, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatsModel } from '@models/chats-model'

import { ChatGroupUsers } from '@components/chat/chat/chat-info/chat-group-users/chat-group-users'
import { ChatInfoHeader } from '@components/chat/chat/chat-info/chat-info-header/chat-info-header'
import { useChatInfoStyles } from '@components/chat/chat/chat-info/chat-info.styles'
import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import { CurrentOpponent } from '@components/chat/multiple-chats'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { imagesRegex, imagesWithPreviewRegex } from '@utils/text'
import { t } from '@utils/translations'

interface ChatAttachmentItemTypes {
  files?: string[]
  images?: string[]
  _id: string
}

interface ChatAttachmentsType {
  allFiles: ChatAttachmentItemTypes[]
  allImages: ChatAttachmentItemTypes[]
}

interface ChatFileType {
  file: string
  _id: string
  isVideo?: boolean
}

interface ChatInfoProps {
  chat: ChatContract
  userId: string
  currentOpponent?: CurrentOpponent
  isGroupChat?: boolean
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

const tab = {
  groupChatUsers: 'groupChatUsers',
  media: 'media',
  links: 'links',
  photos: 'photos',
  videos: 'videos',
  files: 'files',
}

const videoRegexp = /\.(mp4|avi|mov)$/

export const ChatInfo = (props: ChatInfoProps) => {
  const {
    chat,
    currentOpponent,
    isGroupChat,
    onClickEditGroupChatInfo,
    onRemoveUsersFromGroupChat,
    userId,
    onClickAddUsersToGroupChat,
  } = props
  const { classes: styles } = useChatInfoStyles()
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState(isGroupChat ? tab.groupChatUsers : tab.media)
  const [images, setImages] = useState<ChatFileType[]>()
  const [files, setFiles] = useState<ChatFileType[]>()
  const [isFilesLoading, setIsFilesLoading] = useState(true)

  useEffect(() => {
    ChatsModel.getChatMedia(chat._id)
      .then((res: ChatAttachmentsType) => {
        const imagesList: ChatFileType[] = res.allImages.reduce((acc: ChatFileType[], file) => {
          file.images?.forEach(el => {
            const isVideo = videoRegexp.test(el)

            if (!imagesWithPreviewRegex.test(el)) {
              res.allFiles.push({ files: [el], _id: file._id })
              return
            }

            if (!isVideo) {
              acc.push({ file: el, _id: file._id, isVideo })
            }
          })

          return acc
        }, [])

        const fileList: ChatFileType[] = res.allFiles.reduce((acc: ChatFileType[], file) => {
          file.files?.forEach(el => acc.push({ file: el, _id: file._id }))
          return acc
        }, [])

        setFiles(fileList)
        setImages(imagesList)
      })
      .finally(() => setIsFilesLoading(false))
  }, [])

  return (
    <div className={styles.wrapper}>
      <ChatInfoHeader
        chat={chat}
        currentOpponent={currentOpponent}
        isGroupChat={isGroupChat}
        userId={userId}
        onClickEditGroupChatInfo={onClickEditGroupChatInfo}
      />
      <Tabs
        classes={{
          root: styles.tabs,
          indicator: styles.indicator,
        }}
        value={currentTab}
        onChange={(e, value) => setCurrentTab(value)}
      >
        {isGroupChat && (
          <ITab
            tooltipInfoContent={''}
            value={tab.groupChatUsers}
            label={t(TranslationKey.Members)}
            tooltipAttentionContent={''}
            withIcon={false}
          />
        )}
        <ITab
          tooltipInfoContent={''}
          value={tab.media}
          label={t(TranslationKey['Photo and Video'])}
          tooltipAttentionContent={''}
          withIcon={false}
        />
        <ITab
          tooltipInfoContent={''}
          value={tab.files}
          label={t(TranslationKey.Files)}
          tooltipAttentionContent={''}
          withIcon={false}
        />
      </Tabs>

      <TabPanel value={currentTab} className={styles.tabPanel} index={tab.groupChatUsers}>
        <ChatGroupUsers
          chat={chat}
          userId={userId}
          onClickEditGroupChatInfo={onClickEditGroupChatInfo}
          onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
          onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
        />
      </TabPanel>

      <TabPanel value={currentTab} className={styles.tabPanel} index={tab.media}>
        {!!images?.length && (
          <div className={styles.imageList}>
            {images?.map((el, index) => (
              <img
                key={index}
                src={el.file}
                alt={el._id}
                onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                onClick={() => {
                  setCurrentImageIndex(index)
                  setIsImageModalOpen(true)
                }}
              />
            ))}
          </div>
        )}

        {!images?.length && !isFilesLoading && (
          <Typography className={styles.noData}>{t(TranslationKey['No files'])}</Typography>
        )}

        {isFilesLoading && <Typography className={styles.noData}>{t(TranslationKey['Loading data'])}...</Typography>}
      </TabPanel>

      <TabPanel value={currentTab} className={styles.tabPanel} index={tab.files}>
        <div>{!!files?.length && <ChatMessageFiles files={files?.map(el => el.file)} />}</div>

        {!files?.length && !isFilesLoading && (
          <Typography className={styles.noData}>{t(TranslationKey['No files'])}</Typography>
        )}

        {isFilesLoading && <Typography className={styles.noData}>{t(TranslationKey['Loading data'])}...</Typography>}
      </TabPanel>

      <ImageModal
        showPreviews
        isOpenModal={isImageModalOpen}
        handleOpenModal={() => setIsImageModalOpen(prevState => !prevState)}
        imageList={images?.map(el => el.file.replace('.preview.webp', '')) || []}
        currentImageIndex={currentImageIndex}
        handleCurrentImageIndex={index => setCurrentImageIndex(index)}
      />
    </div>
  )
}
