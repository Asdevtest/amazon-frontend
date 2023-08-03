import { useState } from 'react'

import { SettingsModel } from '@models/settings-model'

export const useMuteChat = (chatId: string) => {
  const [isMuteCurrentChat, setIsMuteCurrentChat] = useState(false)

  const handleToggleMuteCurrentChat = () => {
    setIsMuteCurrentChat(!isMuteCurrentChat)

    SettingsModel.setMutedChat(chatId)
  }

  return { isMuteCurrentChat, onToggleMuteCurrentChat: handleToggleMuteCurrentChat }
}
