import { observer } from 'mobx-react'
import { FC } from 'react'

import { ChatsType } from '@constants/keys/chats'

import { chatModel } from '@models/chat-model-new/chat-model'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { useStyles } from './chat-info.style'

import { ChatInfoHeader } from '../chat-info-header/chat-info-header'

import { getCustomSwitcherConfig } from './chat-info.config'
import { useChatInfo } from './hooks/use-chat-info'

export const ChatInfo: FC = observer(() => {
  if (!chatModel.currentChat) {
    return null
  }
  const currentChat = chatModel.currentChat

  const { classes: styles, cx } = useStyles()
  const { currentTab, onClickTab } = useChatInfo()

  return (
    <div className={styles.chatInfoWrapper}>
      <ChatInfoHeader chat={currentChat} />

      <CustomRadioButton
        block
        size="large"
        options={getCustomSwitcherConfig(currentChat.type === ChatsType.GROUP)}
        className={styles.customSwitcher}
        value={currentTab}
        onChange={e => onClickTab(e?.target?.value)}
      />
    </div>
  )
})
