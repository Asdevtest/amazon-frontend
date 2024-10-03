import { useCallback, useState } from 'react'

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
  }, [])

  const onClickEmoji = useCallback((emoji: string) => {
    setMessage(prev => prev + emoji)
  }, [])

  const onClickShowFilesLoader = useCallback(() => {
    setShowFilesLoader(prev => !prev)
  }, [])

  return {
    disabledSubmit,

    message,
    onChangeMessage,

    showFilesLoader,
    onClickShowFilesLoader,

    files,
    onChangeFiles,

    onClickEmoji,
  }
}
