import { observer } from 'mobx-react'
import { FC, useCallback } from 'react'
import { RiShareForwardFill } from 'react-icons/ri'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'

import { TranslationKey } from '@constants/translations/translation-key'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './chat-header.styles'

import { ChatInfoUser } from '../chat-info-user'

export const ChatHeader: FC = observer(() => {
  const { classes: styles } = useStyles()

  const currentChat = chatModel.currentChat as Chat
  const selectedMessages = currentChat?.selectedMessages
  const selectedLength = selectedMessages?.length

  const onClickForwardMessages = useCallback(() => {
    chatModel.handleClickForwardMessages()
  }, [])

  const onClearSelectedMessages = useCallback(() => {
    chatModel.clearSelectedMessage(currentChat?._id)
  }, [currentChat])

  const onOpenCreateNewChat = useCallback(() => {
    chatModel.onTriggerOpenModal('showCreateNewChatModal', true)
  }, [])

  return (
    <div className={styles.chatInfoHeaderWrapper}>
      {currentChat ? (
        currentChat && !!selectedLength ? (
          <>
            <CustomButton size="large" icon={<RiShareForwardFill />} onClick={onClickForwardMessages}>{`${t(
              TranslationKey.Forward,
            )} ${selectedLength}`}</CustomButton>

            <CustomButton size="large" onClick={onClearSelectedMessages}>
              {t(TranslationKey.Cancel)}
            </CustomButton>
          </>
        ) : (
          <>
            <ChatInfoUser currentChat={currentChat} />

            <CustomInputSearch placeholder="Search" />

            <CustomButton type="text" icon={<TbLayoutSidebarRightCollapse size={20} />} />
          </>
        )
      ) : (
        <CustomButton onClick={onOpenCreateNewChat}>{t(TranslationKey['New Dialog'])}</CustomButton>
      )}
    </div>
  )
})
