import { observer } from 'mobx-react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from 'react-virtualized'

import { Direction } from '@models/chat-model-new/chat-manager/chat-manager.type'
import { chatModel } from '@models/chat-model-new/chat-model'
import { Chat } from '@models/chat-model-new/types/chat.type'
import { ChatMessage } from '@models/chat-model-new/types/message.type'
import { UserModel } from '@models/user-model'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './messages-list.style'

import { ChatMessageControls } from '../chat-message-controls'
import { ChatMessageItem } from '../chat-message-item'

export const MessagesList: FC = observer(() => {
  const { classes: styles } = useStyles()

  const currentChat = chatModel.currentChat as Chat
  const chatMessages = chatModel.currentChatMessages as ChatMessage[]

  const [isLoading, setIsLoading] = useState(true)

  const currentUserId = (UserModel.userInfo as unknown as IFullUser)?._id

  const initChat = async () => {
    setIsLoading(true)
    await chatModel.getChatFirstMessages()
    setIsLoading(false)
  }

  const onClickReply = useCallback((message: ChatMessage) => {
    chatModel.setReplyMessage(chatModel.selectedChatId, message)
  }, [])

  const onSelectMessage = useCallback((message: ChatMessage) => {
    chatModel.setSelectedMessage(chatModel.selectedChatId, message)
  }, [])

  // const onClickForwardMessages = useCallback((message: ChatMessage) => {
  //   chatModel.onClickForwardMessages(chatModel.selectedChatId, [message])
  // }, [])

  const onClickCopyMessageText = useCallback((message: ChatMessage) => {
    navigator.clipboard.writeText(message?.text)
  }, [])

  useEffect(() => {
    initChat()
  }, [])

  // console.log('listRef :>> ', listRef)

  return (
    <>
      {chatMessages?.map(message => (
        <ChatMessageControls
          key={message._id}
          showDropdown
          message={message}
          onClickReply={onClickReply}
          onSelectMessage={onSelectMessage}
          // onClickForwardMessages={}
          onClickCopyMessageText={onClickCopyMessageText}
        >
          <ChatMessageItem currentUserId={currentUserId} message={message} />
        </ChatMessageControls>
      ))}
    </>

    // <AutoSizer className={styles.autoSizer}>
    //   {({ width, height }) => (
    //     <List
    //       ref={listRef}
    //       id="messages-list"
    //       width={width}
    //       height={height}
    //       rowCount={chatMessages?.length}
    //       rowHeight={cache.rowHeight}
    //       deferredMeasurementCache={cache}
    //       rowRenderer={({ index, key, style, parent }) => {
    //         const message = chatMessages?.[index]

    //         return (
    //           <CellMeasurer key={key} parent={parent} cache={cache} columnIndex={0} rowIndex={index}>
    //             {({ measure, registerChild: cellMeasurerRegisterChild }) => (
    //               <div
    //                 // @ts-ignore
    //                 ref={cellMeasurerRegisterChild}
    //                 style={{
    //                   ...style,
    //                   padding: '3px 0',
    //                 }}
    //               >
    //                 <ChatMessageItem
    //                   key={message._id}
    //                   currentUserId={currentUserId}
    //                   message={message}
    //                   measure={measure}
    //                 />
    //               </div>
    //             )}
    //           </CellMeasurer>
    //         )
    //       }}
    //       onScroll={handleScroll}
    //     />
    //   )}
    // </AutoSizer>
  )
})
