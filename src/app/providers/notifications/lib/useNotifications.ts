import Favico from 'favico.js'
import { useEffect } from 'react'

import { ChatModel } from '@models/chat-model'

export const useNotifications = () => {
  useEffect(() => {
    const favico = new Favico({
      animation: 'fade',
      position: 'down',
    })

    const unreadMessagesCount = ChatModel.unreadMessages > 0 ? ChatModel.unreadMessages : ''
    favico.badge(unreadMessagesCount)

    return () => {
      favico.reset()
    }
  }, [ChatModel.unreadMessages])
}
