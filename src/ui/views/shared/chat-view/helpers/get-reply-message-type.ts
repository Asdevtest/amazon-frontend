import { ReplyMessageType } from '../types/reply-message.type'

export const getReplyMessageType = ({ image, file, video }: { image?: string; file?: string; video?: string }) => {
  switch (true) {
    case !!image:
      return ReplyMessageType.IMAGE
    case !!file:
      return ReplyMessageType.FILE
    case !!video:
      return ReplyMessageType.VIDEO
    default:
      return ReplyMessageType.TEXT
  }
}
