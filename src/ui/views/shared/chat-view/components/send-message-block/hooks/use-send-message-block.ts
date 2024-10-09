import { useCallback, useState } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'
import { UserModel } from '@models/user-model'

import { UploadFileType } from '@typings/shared/upload-file'

export const useSendMessageBlock = () => {
  const [showFilesLoader, setShowFilesLoader] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')
  const [files, setFiles] = useState<UploadFileType[]>([])

  const disabledSubmit = !message.trim() && !files.length

  const onChangeFiles = useCallback((value: UploadFileType[]) => {
    setFiles(value)
  }, [])

  const onChangeMessage = useCallback((value: string) => {
    setMessage(value)
    chatModel.onTypingMessage()
  }, [])

  const onNewLine = useCallback(() => {
    setMessage(prev => prev + '\n')
    chatModel.onTypingMessage()
  }, [])

  const onClickEmoji = useCallback((emoji: string) => {
    setMessage(prev => prev + emoji)
    chatModel.onTypingMessage()
  }, [])

  const onClickShowFilesLoader = useCallback(() => {
    setShowFilesLoader(prev => !prev)
  }, [])

  const onClickSendMessage = () => {
    chatModel.sendMessage({
      chatId: chatModel.selectedChatId,
      // crmItemId: null,
      text: message?.trim(),
      files,
      // replyMessageId: '',
      // forwardedMessageId: '',
      user: {
        name: UserModel.userInfo.name,
        _id: UserModel.userInfo._id,
      },
    })

    onChangeMessage('')
    onChangeFiles([])
  }

  return {
    disabledSubmit,

    message,
    onChangeMessage,
    onNewLine,

    showFilesLoader,
    onClickShowFilesLoader,

    files,
    onChangeFiles,

    onClickEmoji,

    onClickSendMessage,
  }
}
