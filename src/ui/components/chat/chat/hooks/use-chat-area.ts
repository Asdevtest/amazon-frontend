import { ClipboardEvent, useEffect, useState } from 'react'

import { checkIsExternalVideoLink } from '@utils/checks'
import { createUploadFile } from '@utils/create-upload-file'

import { UploadFileType } from '@typings/shared/upload-file'

import { IMessageState } from '../helpers/chat.interface'

export const useChatInputControl = (messageInitialState: IMessageState, chatId: string) => {
  const [isShowEmojis, setIsShowEmojis] = useState(false)
  const [focused, setFocused] = useState(false)
  const [showFiles, setShowFiles] = useState(false)
  const [message, setMessage] = useState(messageInitialState.message)
  const [files, setFiles] = useState<UploadFileType[]>(messageInitialState.files)

  const disabledSubmit = !message.trim() && !files.length

  const changeFilesAndState = (value: UploadFileType[]) => {
    setFiles(value)
  }

  const onPasteFiles = async (evt: ClipboardEvent) => {
    const сopiedText = evt.clipboardData.getData('Text')

    if (checkIsExternalVideoLink(сopiedText)) {
      setShowFiles(true)
      changeFilesAndState([...files, сopiedText])
    } else if (evt.clipboardData.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.clipboardData.files)

      const filesAlowLength = 50 - files.length

      evt.preventDefault()

      const readyFilesArr: UploadFileType[] = filesArr.map((el: File) => createUploadFile(el))

      changeFilesAndState([...files, ...readyFilesArr.slice(0, filesAlowLength)])
    }
  }

  const onFocus = () => setFocused(true)

  const onBlur = () => setFocused(false)

  const changeMessageAndState = (value: string) => {
    sessionStorage.setItem(chatId, value)
    setMessage(value)
  }

  const resetAllInputs = () => {
    setMessage('')
    setFiles(() => [])
  }

  useEffect(() => {
    if (files?.length) {
      setShowFiles(true)
    } else {
      setShowFiles(false)
    }
  }, [files?.length])

  return {
    showFiles,
    setShowFiles,

    message,
    setMessage,

    files,
    setFiles,

    isShowEmojis,
    setIsShowEmojis,

    focused,
    disabledSubmit,

    onPasteFiles,

    onFocus,
    onBlur,
    changeMessageAndState,
    resetAllInputs,
    changeFilesAndState,
  }
}
