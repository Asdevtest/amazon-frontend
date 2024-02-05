import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CurrentOpponent } from '@components/chat/multiple-chats'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { t } from '@utils/translations'

import { useStyles } from './chat-info.style'

import { ChatMessageFiles } from '../chat-messages-list/components/chat-messages/chat-message-files/chat-message-files'

import { TabValue } from './chat-into.type'
import { ChatGroupUsers, ChatInfoHeader } from './components'
import { getCustomSwitcherConfig } from './custom-switcher.config'
import { useChatMediaFiles } from './hooks/use-chat-media-files'

interface ChatInfoProps {
  chat: ChatContract
  userId: string
  currentOpponent?: CurrentOpponent
  isGroupChat?: boolean
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const ChatInfo: FC<ChatInfoProps> = memo(props => {
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
  const [currentTab, setCurrentTab] = useState<TabValue>(isGroupChat ? TabValue.GROUP_CHAT_USERS : TabValue.PHOTOS)

  const { images, files, videos, isFilesLoading } = useChatMediaFiles(chat, currentTab)

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

      <TabPanel value={currentTab} className={styles.tabPanel} index={TabValue.PHOTOS}>
        {!!images?.length && (
          <div className={styles.imageList}>
            {images?.map((el, index) => {
              const clickHandler = () => {
                setCurrentImageIndex(index)
                setIsImageModalOpen(true)
              }

              return (
                <img
                  key={index}
                  src={el.file}
                  alt={el._id}
                  onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                  onClick={clickHandler}
                />
              )
            })}
          </div>
        )}

        {!images?.length && !isFilesLoading && <p className={styles.noData}>{t(TranslationKey['No files'])}</p>}

        {isFilesLoading && <p className={styles.noData}>{t(TranslationKey['Loading data'])}...</p>}
      </TabPanel>

      <TabPanel value={currentTab} className={styles.tabPanel} index={TabValue.VIDEOS}>
        {!!videos?.length && (
          <div className={styles.imageList}>
            {videos?.map((el, index) => {
              const clickHandler = () => {
                setCurrentImageIndex(index)
                setIsImageModalOpen(true)
              }

              return (
                <VideoPreloader
                  key={index}
                  wrapperClassName={styles.videoWrapper}
                  videoSource={el.file}
                  onClick={clickHandler}
                />
              )
            })}
          </div>
        )}

        {!images?.length && !isFilesLoading && <p className={styles.noData}>{t(TranslationKey['No files'])}</p>}

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
          files={
            currentTab === TabValue.MEDIA
              ? images?.map(el => el?.file?.replace('.preview.webp', '')) || []
              : videos?.map(el => el?.file) || []
          }
          currentFileIndex={currentImageIndex}
          onOpenModal={() => setIsImageModalOpen(!isImageModalOpen)}
          onCurrentFileIndex={index => setCurrentImageIndex(index)}
        />
      )}
    </div>
  )
})
