import { FC, SyntheticEvent, memo, useMemo } from 'react'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { CircleSpinner } from '@components/shared/circle-spinner'

import { useStyles } from './chat-info-tabs.style'

import { TabValue } from '../../types/chat-into.type'
import { ChatInfoPhotos } from '../chat-info-photos'
import { ChatInfoUserControlList } from '../chat-info-user-control-list'
import { ChatInfoVideos } from '../chat-info-videos'
import { Files } from '../files'

interface ChatInfoTabsProps {
  isFilesLoading: boolean
  currentChat: Chat
  currentTab: TabValue
  files: string[]
  onClickDeleteUserForGroupChat: () => void
  loadMoreMediaFilesHandler: (ref: SyntheticEvent<EventTarget>) => void
  onClickMediaFile: (fileIndex: number) => void
}

export const ChatInfoTabs: FC<ChatInfoTabsProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    isFilesLoading,
    currentChat,
    currentTab,
    files,
    onClickDeleteUserForGroupChat,
    loadMoreMediaFilesHandler,
    onClickMediaFile,
  } = props

  const columnsStyles = useMemo(() => {
    switch (currentTab) {
      case TabValue.PHOTOS:
      case TabValue.VIDEOS:
        return true
      default:
        return false
    }
  }, [currentTab])

  return (
    <div
      className={cx(styles.infoWrapper, { [styles.infoWrapperColumns]: columnsStyles })}
      onScroll={loadMoreMediaFilesHandler}
    >
      {currentTab === TabValue.GROUP_CHAT_USERS ? (
        <ChatInfoUserControlList
          currentChat={currentChat}
          onClickDeleteUserForGroupChat={onClickDeleteUserForGroupChat}
        />
      ) : currentTab === TabValue.PHOTOS ? (
        <ChatInfoPhotos photos={files} onClickOpenPreview={onClickMediaFile} />
      ) : currentTab === TabValue.VIDEOS ? (
        <ChatInfoVideos videos={files} onClickOpenPreview={onClickMediaFile} />
      ) : (
        <Files size="40px" files={files} />
      )}

      {isFilesLoading ? (
        <div className={styles.spinnerContainer}>
          <CircleSpinner size={50} />
        </div>
      ) : null}
    </div>
  )
})
