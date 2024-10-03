import { useCallback, useState } from 'react'

import { TabValue } from '../chat-into.type'

export const useChatInfo = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>(TabValue.GROUP_CHAT_USERS)

  const onClickTab = useCallback((value: TabValue) => {
    setCurrentTab(value)
  }, [])

  return {
    currentTab,
    onClickTab,
  }
}
