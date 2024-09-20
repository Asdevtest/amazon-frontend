import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CurrentOpponent } from '@components/chat/multiple-chats'
import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { VideoPreloader } from '@components/shared/video-preloader'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
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
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
  onClickCloseChatInfo: () => void
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
    onClickCloseChatInfo,
  } = props

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false)

  const { currentTab, setCurrentTab, files, isFilesLoading, loadMoreMediaFilesHandler, resetSettings } =
    useChatMediaFiles(chat, !!isGroupChat)

  const isCurrentTabGroup = currentTab === TabValue.GROUP_CHAT_USERS

  return (
    <div className={styles.wrapper}>
      <ChatInfoHeader
        chat={chat}
        currentOpponent={currentOpponent}
        isGroupChat={isGroupChat}
        userId={userId}
        onClickEditGroupChatInfo={onClickEditGroupChatInfo}
        onClickCloseChatInfo={onClickCloseChatInfo}
      />

      <div className={styles.customSwitcherWrapper}>
        <CustomRadioButton
          size="large"
          buttonStyle="solid"
          options={getCustomSwitcherConfig(isGroupChat)}
          className={styles.customSwitcher}
          value={currentTab}
          onChange={e => {
            resetSettings()
            setCurrentTab(e?.target?.value)
          }}
        />
      </div>

      <div className={styles.tabPanel} onScroll={loadMoreMediaFilesHandler}>
        {isFilesLoading && (
          <div className={styles.spinnerContainer}>
            <CircleSpinner />
          </div>
        )}

        {!files?.length && !isFilesLoading && !isCurrentTabGroup && (
          <p className={styles.noData}>{t(TranslationKey['No files'])}</p>
        )}

        {isCurrentTabGroup ? (
          <ChatGroupUsers
            chat={chat}
            userId={userId}
            onClickEditGroupChatInfo={onClickEditGroupChatInfo}
            onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
          />
        ) : currentTab === TabValue.FILES ? (
          <ChatMessageFiles files={files || []} />
        ) : (
          <div className={styles.imageList}>
            {files?.map((el, index) => {
              const clickHandler = () => {
                setCurrentImageIndex(index)
                setIsImageModalOpen(true)
              }

              const validFile = getAmazonImageUrl(el)

              return (
                <>
                  {currentTab === TabValue.PHOTOS ? (
                    <img
                      key={index}
                      src={validFile}
                      alt={el}
                      onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                      onClick={clickHandler}
                    />
                  ) : (
                    <VideoPreloader
                      key={index}
                      wrapperClassName={styles.videoWrapper}
                      videoSource={validFile}
                      onClick={clickHandler}
                    />
                  )}
                </>
              )
            })}
          </div>
        )}
      </div>

      {isImageModalOpen ? (
        <SlideshowGalleryModal
          openModal={isImageModalOpen}
          files={files || []}
          currentFileIndex={currentImageIndex}
          onOpenModal={() => setIsImageModalOpen(!isImageModalOpen)}
          onCurrentFileIndex={setCurrentImageIndex}
        />
      ) : null}
    </div>
  )
})
