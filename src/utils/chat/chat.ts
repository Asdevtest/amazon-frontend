/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatContract } from '@models/chat-model/contracts'

export function getTypeAndIndexOfChat(
  this: any,
  chatId: string,
):
  | {
      index: number
      chatType: 'chats' | 'simpleChats'
    }
  | undefined {
  const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === chatId)
  const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === chatId)
  if (findChatIndexById === -1 && findSimpleChatIndexById === -1) {
    return
  }
  const index = Math.max(findChatIndexById, findSimpleChatIndexById)
  const chatType = findChatIndexById !== -1 ? 'chats' : 'simpleChats'

  return {
    index,
    chatType,
  }
}
