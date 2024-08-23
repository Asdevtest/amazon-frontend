import { ChangeEvent, ClipboardEvent, useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { createUploadFile } from '@utils/create-upload-file'

import { isRequestMedia } from '@typings/guards'
import { IUploadFile } from '@typings/shared/upload-file'

import { regExpUriChecking } from './upload-files-input.constants'
import { UploadFilesInputProps } from './upload-files-input.type'

export const useUploadFilesInput = ({ images, setImages, maxNumber = 50, withComment }: UploadFilesInputProps) => {
  const [linkInput, setLinkInput] = useState('')
  const [linkInputError, setLinkInputError] = useState(false)
  const [showImages, setShowImages] = useState(true)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)

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
      if (images.length >= maxNumber) {
        return
      }

      const newFile = withComment
        ? { fileLink: linkInput, commentByClient: '', commentByPerformer: '', _id: uuid() }
        : linkInput

      setImages([...images, newFile])

      setLinkInput('')
    } else {
      setLinkInputError(true)

      setTimeout(() => {
        setLinkInputError(false)
      }, 3000)
    }
  }, [linkInput, images, setImages])

  const handlePasteFile = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      if (images.length >= maxNumber) {
        return
      }

      const files: IUploadFile[] = []
      const clipboardData = event.clipboardData

      if (clipboardData) {
        for (let i = 0; i < clipboardData.items.length; i++) {
          const receivedFile = clipboardData.items[i].getAsFile()

          if (receivedFile) {
            files.push(createUploadFile(receivedFile))
          }
        }
      }

      const resultFiles = files.map(file => {
        if (withComment) {
          return { fileLink: file, commentByClient: '', commentByPerformer: '', _id: uuid() }
        } else {
          return file
        }
      })

      setImages([...images, ...resultFiles])
    },
    [images, setImages],
  )

  const handleUploadFiles = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event?.target?.files || event?.target?.files?.length === 0) {
        return
      }

      event.preventDefault()

      const filesArr: File[] = Array.from(event?.target?.files)
      const readyFilesArr = filesArr.map((el: File) => createUploadFile(el))
      const filesAlowLength = maxNumber - images?.length
      const resultUploadedFiles = readyFilesArr.slice(0, filesAlowLength)
      const resultFiles = withComment
        ? [
            ...images,
            ...resultUploadedFiles.map(el => ({
              fileLink: el,
              commentByClient: '',
              commentByPerformer: '',
              _id: uuid(),
            })),
          ]
        : [...images, ...resultUploadedFiles]

      setImages(resultFiles)
    },
    [images, setImages],
  )

  const handleUploadFile = useCallback(
    (fileIndex: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()

      if (!event?.target?.files || event?.target?.files?.length === 0) {
        return
      }

      const filesArr: File[] = Array.from(event?.target?.files)
      const readyFilesArr = filesArr.map((el: File) => createUploadFile(el))
      const resultFiles = images.map((file, index) => {
        if (isRequestMedia(file) && withComment) {
          return { ...file, fileLink: index === fileIndex ? readyFilesArr[0] : file.fileLink }
        } else {
          return index === fileIndex ? readyFilesArr[0] : file
        }
      })

      setImages(resultFiles)
    },
    [images, setImages],
  )

  const handleChangeComment = useCallback(
    (fileIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
      // @ts-ignore
      setImages(prev => {
        const resultFiles = [...prev]
        const currentFile = resultFiles[fileIndex]

        if (isRequestMedia(currentFile)) {
          resultFiles[fileIndex] = { ...currentFile, commentByClient: event.target.value }
        }

        return resultFiles
      })
    },
    [setImages],
  )

  const handleRemoveFile = useCallback(
    (fileIndex: number) => {
      const resultFiles = images.filter((_, index) => index !== fileIndex)

      setImages(resultFiles)
    },
    [images, setImages],
  )

  const handleRemoveAllFiles = useCallback(() => setImages([]), [setImages])

  const disabledLoadButton = linkInput.trim().length === 0 || images?.length >= maxNumber

  return {
    currentFileIndex,
    disabledLoadButton,
    files: images,
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
    onRemoveAllFiles: handleRemoveAllFiles,
    onPasteFile: handlePasteFile,
  }
}
