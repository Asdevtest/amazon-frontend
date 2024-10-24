import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

import { chatModel } from '@models/chat-model-new/chat-model'

import { UploadFileType } from '@typings/shared/upload-file'

export const useSendMessageBlock = () => {
  const [showFilesLoader, setShowFilesLoader] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')
  const [files, setFiles] = useState<UploadFileType[]>([])

  const disabledSubmit = !message.trim() && !files.length

  const onChangeFiles = useCallback((value: UploadFileType[]) => {
    setFiles(value)
  }, [])

  const onChangeMessage = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event?.target?.value)
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
      replyMessageId: null,
      forwardedMessageId: null,
    })

    setMessage('')
    onChangeFiles([])
    setShowFilesLoader(false)
  }

  const onClickEnter = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.shiftKey) {
        e.preventDefault()
        onNewLine()
      } else {
        e.preventDefault()
        if (disabledSubmit) {
          return
        }
        onClickSendMessage()
      }
    },
    [disabledSubmit, onNewLine, onClickSendMessage],
  )

  return {
    disabledSubmit,

    message,
    onChangeMessage,

    showFilesLoader,
    onClickShowFilesLoader,

    files,
    onChangeFiles,

    onClickEmoji,

    onClickSendMessage,
    onClickEnter,
  }
}
