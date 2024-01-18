import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

export interface ChatMessageBasicTextProps {
  showName: boolean
  message: ChatMessageContract
  isIncomming: boolean
  unReadMessage: boolean
  isFound?: boolean
  searchPhrase?: string
}

export interface SingleTextWordsWithPos {
  word: string
  index: number
}

export interface HighlightTag {
  children: string
  highlightIndex: number
}

export interface Chunk {
  start: number
  end: number
}

export interface FindChunksProps {
  searchWords: string[]
  textToHighlight: string
}
