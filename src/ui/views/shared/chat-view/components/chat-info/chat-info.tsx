import { observer } from 'mobx-react'
import { FC, useCallback } from 'react'

import { ChatsType } from '@constants/keys/chats'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { useStyles } from './chat-info.style'

import { useChatInfo } from '../../hooks/use-chat-info'
import { useChatMediaFiles } from '../../hooks/use-chat-media-files'
import { ChatInfoHeader } from '../chat-info-header/chat-info-header'
import { ChatInfoMedia } from '../chat-info-media'
import { ChatInfoTabs } from '../chat-info-tabs'

import { getCustomSwitcherConfig } from './chat-info.config'

export const ChatInfo: FC = observer(() => {
  const { classes: styles, cx } = useStyles()

  const currentChat = chatModel.currentChat as Chat
  const isGroupChat = currentChat.type === ChatsType.GROUP

  const { onOpenEditChat, onClickCloseChatInfo, onClickDeleteUserForGroupChat } = useChatInfo()

  const {
    isImageModalOpen,
    onClickMediaFile,

    currentImageIndex,
    onCloseImageModal,
    onSetCurrentImageIndex,

    currentTab,
    isFilesLoading,
    files,

    onClickTab,
    loadMoreMediaFilesHandler,
  } = useChatMediaFiles(isGroupChat, currentChat._id)

  return (
    <div className={styles.chatInfoWrapper}>
      <ChatInfoHeader onClickCloseChatInfo={onClickCloseChatInfo} />

      <ChatInfoMedia chat={currentChat} onOpenEditChat={onOpenEditChat} />

      <CustomRadioButton
        block
        size="large"
        options={getCustomSwitcherConfig(isGroupChat)}
        className={styles.customSwitcher}
        value={currentTab}
        onChange={onClickTab}
      />

      <ChatInfoTabs
        isFilesLoading={isFilesLoading}
        currentChat={currentChat}
        currentTab={currentTab}
        files={files}
        loadMoreMediaFilesHandler={loadMoreMediaFilesHandler}
        onClickDeleteUserForGroupChat={onClickDeleteUserForGroupChat}
        onClickMediaFile={onClickMediaFile}
      />

      {isImageModalOpen ? (
        <SlideshowGalleryModal
          openModal={isImageModalOpen}
          files={files || []}
          currentFileIndex={currentImageIndex}
          onOpenModal={onCloseImageModal}
          onCurrentFileIndex={onSetCurrentImageIndex}
        />
      ) : null}
    </div>
  )
})
