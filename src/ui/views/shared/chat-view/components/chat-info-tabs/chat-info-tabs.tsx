import { FC, memo, useMemo } from 'react'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { useStyles } from './chat-info-tabs.style'

import { TabValue } from '../../types/chat-into.type'

interface ChatInfoTabsProps {
  currentChat: Chat
  currentTab: TabValue
}

export const ChatInfoTabs: FC<ChatInfoTabsProps> = memo(({ currentChat, currentTab }) => {
  const { classes: styles, cx } = useStyles()

  const dataForRender = useMemo(() => {
    switch (currentTab) {
      case TabValue.GROUP_CHAT_USERS:
        return currentChat?.users
      case TabValue.PHOTOS:
        return currentChat?.users

      
VIDEOS
FILES
    }
  }, [currentChat, currentTab])

  return <div className={styles.infoWrapper}></div>
})
