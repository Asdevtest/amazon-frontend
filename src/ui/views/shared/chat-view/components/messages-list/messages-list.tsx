import { Empty } from 'antd'
import { observer } from 'mobx-react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List } from 'react-virtualized'

import { TranslationKey } from '@constants/translations/translation-key'

import { chatModel } from '@models/chat-model-new/chat-model'
import { UserModel } from '@models/user-model'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './messages-list.style'

import { ChatMessageItem } from '../chat-message-item'
import { EmptyChatMessages } from '../empty-chat-messages/empty-chat-messages'

export const MessagesList = observer(() => {
  const { classes: styles, cx } = useStyles()

  const isSelectedChat = !!chatModel.selectedChatId
  const currentChat = chatModel.currentChat
  const chatMessages = chatModel.currentChatMessages
  const emptyChat = !isSelectedChat || !chatMessages?.length

  const listRef = useRef(null)

  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: 30,
        fixedHeight: false,
      }),
    [],
  )

  console.log('currentChat?.messagesCount :>> ', currentChat?.messagesCount)

  return (
    <div
      className={cx(styles.messagesListWrapper, {
        [styles.noSelectedChat]: emptyChat,
      })}
    >
      {emptyChat ? (
        <EmptyChatMessages />
      ) : (
        <InfiniteLoader
          isRowLoaded={({ index }) => !!chatMessages?.[index]}
          loadMoreRows={info => console.log('info :>> ', info)}
          rowCount={currentChat?.messagesCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer className={styles.autoSizer}>
              {({ width, height }) => (
                <List
                  ref={registerChild}
                  width={width}
                  height={height}
                  rowCount={chatMessages?.length}
                  rowHeight={cache.rowHeight}
                  deferredMeasurementCache={cache}
                  scrollToIndex={chatMessages?.length - 1}
                  rowRenderer={({ index, key, style, parent }) => {
                    const message = chatMessages?.[index]

                    return (
                      <CellMeasurer key={key} parent={parent} cache={cache} columnIndex={0} rowIndex={index}>
                        {({ measure, registerChild: cellMeasurerRegisterChild }) => (
                          <ChatMessageItem
                            key={message._id}
                            currentUserId={currentUserId}
                            message={message}
                            measure={measure}
                            registerChild={cellMeasurerRegisterChild}
                            style={style}
                          />
                        )}
                      </CellMeasurer>
                    )
                  }}
                  onRowsRendered={onRowsRendered}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </div>
  )
})
