import { Empty } from 'antd'
import { observer } from 'mobx-react'
import { useCallback, useMemo, useRef } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'

import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'

import { useStyles } from './chat-item-list.style'

import { ChatItem } from '../chat-item/chat-item'

export const ChatItemList = observer(() => {
  const { classes: styles, cx } = useStyles()

  const isChatsExist = !!chatModel.chats?.length

  const listRef = useRef(null)

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 100,
        fixedWidth: true,
      }),
    [],
  )

  const onClickChat = useCallback((chat: Chat) => {
    chatModel.onClickChat(chat)
  }, [])

  return (
    <div className={cx(styles.chatsList, { [styles.emptyChatList]: !isChatsExist })}>
      {isChatsExist ? (
        <AutoSizer className={styles.autoSizer}>
          {({ width, height }) => (
            <List
              ref={listRef}
              width={width}
              height={height}
              rowCount={chatModel.chats?.length}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              rowRenderer={({ index, key, style, parent }) => {
                const chat = chatModel.chats?.[index]

                return (
                  <CellMeasurer key={key} parent={parent} cache={cache} columnIndex={0} rowIndex={index}>
                    <ChatItem
                      isActiveChat={chat._id === chatModel.selectedChatId}
                      chat={chat}
                      style={style}
                      onClickChat={onClickChat}
                    />
                  </CellMeasurer>
                )
              }}
            />
          )}
        </AutoSizer>
      ) : (
        <Empty />
      )}
    </div>
  )
})
