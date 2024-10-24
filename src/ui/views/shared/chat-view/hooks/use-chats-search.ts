import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { Chat } from '@models/chat-model-new/types/chat.type'

import { getChatTitle } from '@utils/chat/get-chat-title'

export const useChatsSearch = (currentChats: Chat[]) => {
  const chats = currentChats

  const [nameSearchValue, setNameSearchValue] = useState<string>('')

  const renderData = useMemo(() => {
    return chats.filter(el => {
      if (!nameSearchValue) {
        return true
      }

      const title = getChatTitle(el)

      return title.toLocaleLowerCase().includes(nameSearchValue.toLocaleLowerCase())
    })
  }, [chats, nameSearchValue])

  const onChangeSeachValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNameSearchValue(event?.target?.value)
  }, [])

  return {
    nameSearchValue,

    renderData,

    onChangeSeachValue,
  }
}
