import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { isRequestMedia } from '@typings/guards'
import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

import { regExpUriChecking } from './upload-files-input.constants'
import { UploadFilesInputProps } from './upload-files-input.type'

export const useUploadFilesInput = ({ images, setImages, maxNumber = 50, withComment }: UploadFilesInputProps) => {
  const [linkInput, setLinkInput] = useState('')
  const [linkInputError, setLinkInputError] = useState(false)
  const [showImages, setShowImages] = useState(true)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [files, setFiles] = useState<(UploadFileType | IRequestMedia)[]>([])

  useEffect(() => {
    if (images.length > 0) {
      setFiles(images)
    }
  }, [])

  const handleShowImages = useCallback(() => setShowImages(prevState => !prevState), [])
  const handleShowGalleryModal = useCallback((fileIndex?: number) => {
    if (fileIndex) {
      setCurrentFileIndex(fileIndex)
    }

    setShowGalleryModal(prevState => !prevState)
  }, [])

  const handleChangeLink = useCallback((event: ChangeEvent<HTMLInputElement>) => setLinkInput(event.target.value), [])

  const handleLoadFile = useCallback(() => {
    const linkIsValid = regExpUriChecking.test(linkInput)

    if (linkIsValid) {
      const newFile = withComment
        ? { fileLink: linkInput, commentByClient: '', commentByPerformer: '', _id: uuid() }
        : linkInput

      setFiles([...files, newFile])

      setLinkInput('')
    } else {
      setLinkInputError(true)

      setTimeout(() => {
        setLinkInputError(false)
      }, 3000)
    }
  }, [])

  const handleUploadFiles = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files || event?.target?.files?.length === 0) {
      return
    }

    event.preventDefault()

    const filesArr: File[] = Array.from(event?.target?.files)
    const readyFilesArr = filesArr.map((el: File) => ({
      data_url: URL.createObjectURL(el),
      file: new File([el], el?.name?.replace(/ /g, ''), {
        type: el?.type,
        lastModified: el?.lastModified,
      }),
    }))
    const filesAlowLength = maxNumber - files?.length
    const resultUploadedFiles = readyFilesArr.slice(0, filesAlowLength)
    const resultFiles = withComment
      ? [
          ...files,
          ...resultUploadedFiles.map(el => ({
            fileLink: el,
            commentByClient: '',
            commentByPerformer: '',
            _id: uuid(),
          })),
        ]
      : [...files, ...resultUploadedFiles]

    setFiles(resultFiles)
  }, [])

  const handleUploadFile = useCallback(
    (fileIndex: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event?.target?.files || event?.target?.files?.length === 0) {
        return
      }

      event.preventDefault()

      const filesArr: File[] = Array.from(event?.target?.files)
      const readyFilesArr = filesArr.map((el: File) => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el?.name?.replace(/ /g, ''), {
          type: el?.type,
          lastModified: el?.lastModified,
        }),
      }))
      const resultFiles = files.map((file, index) => {
        if (isRequestMedia(file) && withComment) {
          return { ...file, fileLink: index === fileIndex ? readyFilesArr[0] : file.fileLink }
        } else {
          return index === fileIndex ? readyFilesArr[0] : file
        }
      })

      setFiles(resultFiles)
    },
    [],
  )

  const handleChangeComment = useCallback(
    (fileIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      setFiles(prev => {
        const resultFiles = [...prev]
        const currentFile = resultFiles[fileIndex]

        if (isRequestMedia(currentFile)) {
          resultFiles[fileIndex] = { ...currentFile, commentByClient: event.target.value }
        }

        return resultFiles
      })
    },
    [setFiles],
  )

  const handleRemoveFile = useCallback((fileIndex: number) => {
    const resultFiles = files.filter((_, index) => index !== fileIndex)

    setFiles(resultFiles)
  }, [])

  const disabledLoadButton = linkInput.trim().length === 0 || files?.length >= maxNumber

  return {
    currentFileIndex,
    disabledLoadButton,
    files,
    setFiles,
    linkInput,
    linkInputError,
    showImages,
    showGalleryModal,
    onChangeComment: handleChangeComment,
    onChangeLink: handleChangeLink,
    onLoadFile: handleLoadFile,
    onRemoveFile: handleRemoveFile,
    onShowImages: handleShowImages,
    onShowGalleryModal: handleShowGalleryModal,
    onUploadFile: handleUploadFile,
    onUploadFiles: handleUploadFiles,
  }
}
