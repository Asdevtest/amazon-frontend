import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { CurrentOpponent } from '@components/chat/multiple-chats'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

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
      />

      <CustomSwitcher
        fullWidth
        switchMode={'medium'}
        condition={currentTab}
        switcherSettings={getCustomSwitcherConfig(isGroupChat)}
        changeConditionHandler={value => {
          resetSettings()
          setCurrentTab(value as TabValue)
        }}
      />

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
            onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
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

      {isImageModalOpen && (
        <ImageModal
          showPreviews
          isOpenModal={isImageModalOpen}
          files={files?.map(el => getAmazonImageUrl(el, true)) || []}
          currentFileIndex={currentImageIndex}
          onOpenModal={() => setIsImageModalOpen(!isImageModalOpen)}
          onCurrentFileIndex={index => setCurrentImageIndex(index)}
        />
      )}
    </div>
  )
})
