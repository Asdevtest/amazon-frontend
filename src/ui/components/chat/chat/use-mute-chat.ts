import { useEffect, useState } from 'react'

import { SettingsModel } from '@models/settings-model'

export const useMuteChat = (chatId: string, mutedChats: Array<string>) => {
  const [isMuteCurrentChat, setIsMuteCurrentChat] = useState(false)

  useEffect(() => {
    setIsMuteCurrentChat(mutedChats.includes(chatId))
  }, [mutedChats, chatId])

  const handleToggleMuteCurrentChat = () => {
    setIsMuteCurrentChat(!isMuteCurrentChat)

    SettingsModel.setMutedChat(chatId)
  }

  return { isMuteCurrentChat, onToggleMuteCurrentChat: handleToggleMuteCurrentChat }
}
