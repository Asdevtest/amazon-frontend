import { observer } from 'mobx-react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from 'react-virtualized'

import { Direction } from '@models/chat-model-new/chat-manager/chat-manager.type'
import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'
import { ChatMessage } from '@models/chat-model-new/types/message.type'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './messages-list.style'

import { ChatMessageItem } from '../chat-message-item'

export const MessagesList: FC = observer(() => {
  const { classes: styles } = useStyles()

  const currentChat = chatModel.currentChat as Chat
  const chatMessages = chatModel.currentChatMessages as ChatMessage[]

  const listRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 30,
        fixedHeight: false,
        fixedWidth: true,
      }),
    [chatMessages],
  )

  const loadMessages = async (direction: Direction) => {
    if (!currentChat) {
      return
    }

    setIsLoading(true)

    const pagination = {
      ...currentChat?.pagination,
      offset: currentChat.pagination.offset + (direction === Direction.START ? 20 : -20),
    }

    const curScroll = listRef.current?.Grid?._scrollingContainer.scrollTop
    const curHeight = listRef.current?.Grid?._scrollingContainer.scrollHeight

    chatModel.setChatPagination(currentChat._id, pagination)

    await chatModel.getChatMessages(pagination.offset, pagination.limit, direction)

    cache.clearAll()

    if (direction === Direction.START) {
      const newHeight = listRef.current?.Grid?._scrollingContainer.scrollHeight

      const newScroll = curScroll + (newHeight - curHeight)

      listRef.current.scrollToPosition(newScroll)
    }

    setIsLoading(false)
  }

  const handleScroll = (/* { clientHeight, scrollHeight, scrollTop }: ScrollParams */) => {
    if (isLoading) {
      return
    }

    const scrollTop = listRef.current?.Grid?._scrollingContainer.scrollTop

    console.log('scrollTop :>> ', scrollTop)
    if (scrollTop === 0 && currentChat?.pagination.hasMoreTop) {
      loadMessages(Direction.START)
    }
    //  else if (scrollTop + clientHeight >= scrollHeight && currentChat?.pagination.hasMoreBottom) {
    //   loadMessages(Direction.END)
    // }
  }

  const initChat = async () => {
    setIsLoading(true)
    await chatModel.getChatFirstMessages()
    listRef.current?.scrollToRow(chatMessages?.length - 1)
    setIsLoading(false)
  }

  useEffect(() => {
    initChat()
  }, [])

  console.log('listRef :>> ', listRef)

  return (
    <AutoSizer className={styles.autoSizer}>
      {({ width, height }) => (
        <List
          ref={listRef}
          id="messages-list"
          width={width}
          height={height}
          rowCount={chatMessages?.length}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={({ index, key, style, parent }) => {
            const message = chatMessages?.[index]

            return (
              <CellMeasurer key={key} parent={parent} cache={cache} columnIndex={0} rowIndex={index}>
                {({ measure, registerChild: cellMeasurerRegisterChild }) => (
                  <div
                    // @ts-ignore
                    ref={cellMeasurerRegisterChild}
                    style={{
                      ...style,
                      padding: '3px 0',
                    }}
                  >
                    <ChatMessageItem
                      key={message._id}
                      currentUserId={currentUserId}
                      message={message}
                      measure={measure}
                    />
                  </div>
                )}
              </CellMeasurer>
            )
          }}
          onScroll={handleScroll}
        />
      )}
    </AutoSizer>
  )
})
