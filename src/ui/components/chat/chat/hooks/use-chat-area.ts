import { ClipboardEvent, useEffect, useState } from 'react'

import { checkIsExternalVideoLink } from '@utils/checks'

import { UploadFileType } from '@typings/upload-file'

import { IMessageState } from '../helpers/chat.interface'

export const useChatInputControl = (messageInitialState: IMessageState) => {
  const [isShowEmojis, setIsShowEmojis] = useState(false)
  const [focused, setFocused] = useState(false)
  const [showFiles, setShowFiles] = useState(false)
  const [message, setMessage] = useState(messageInitialState.message)
  const [files, setFiles] = useState<UploadFileType[]>(messageInitialState.files)

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

      const readyFilesArr: UploadFileType[] = filesArr.map((el: File) => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.lastModified,
        }),
      }))

      changeFilesAndState([...files, ...readyFilesArr.slice(0, filesAlowLength)])
    }
  }

  const onFocus = () => setFocused(true)

  const onBlur = () => setFocused(false)

  const changeMessageAndState = (value: string) => {
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

    onPasteFiles,

    onFocus,
    onBlur,
    changeMessageAndState,
    resetAllInputs,
    changeFilesAndState,
  }
}
