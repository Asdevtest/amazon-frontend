import { observer } from 'mobx-react'
import { FC, useCallback } from 'react'

import { ChatsType } from '@constants/keys/chats'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { useStyles } from './chat-info.style'

import { useChatInfo } from '../../hooks/use-chat-info'
import { ChatInfoHeader } from '../chat-info-header/chat-info-header'
import { ChatInfoMedia } from '../chat-info-media'
import { ChatInfoTabs } from '../chat-info-tabs'

import { getCustomSwitcherConfig } from './chat-info.config'

export const ChatInfo: FC = observer(() => {
  const { classes: styles, cx } = useStyles()

  const currentChat = chatModel.currentChat as Chat
  const { currentTab, onClickTab, onOpenEditChat, onClickCloseChatInfo } = useChatInfo()

  return (
    <div className={styles.chatInfoWrapper}>
      <ChatInfoHeader onClickCloseChatInfo={onClickCloseChatInfo} />

      <ChatInfoMedia chat={currentChat} onOpenEditChat={onOpenEditChat} />

      <CustomRadioButton
        block
        size="large"
        options={getCustomSwitcherConfig(currentChat.type === ChatsType.GROUP)}
        className={styles.customSwitcher}
        value={currentTab}
        onChange={onClickTab}
      />

      <ChatInfoTabs currentChat={currentChat} currentTab={currentTab} />
    </div>
  )
})
