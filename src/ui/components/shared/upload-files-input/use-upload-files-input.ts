import { ChangeEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { isRequestMedia } from '@typings/guards'

import { regExpUriChecking } from './upload-files-input.constants'
import { UploadFilesInputProps } from './upload-files-input.type'

export const useUploadFilesInput = ({ images, setImages, maxNumber = 50, withComment }: UploadFilesInputProps) => {
  const [linkInput, setLinkInput] = useState('')
  const [linkInputError, setLinkInputError] = useState(false)
  const [showImages, setShowImages] = useState(true)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)

  const handleShowImages = () => setShowImages(prevState => !prevState)
  const handleShowGalleryModal = (fileIndex?: number) => {
    if (fileIndex) {
      setCurrentFileIndex(fileIndex)
    }

    setShowGalleryModal(prevState => !prevState)
  }

  const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => setLinkInput(event.target.value)

  const handleLoadFile = () => {
    const linkIsValid = regExpUriChecking.test(linkInput)

    if (linkIsValid) {
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
  }

  const handleUploadFiles = async (event: ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleUploadFile = (fileIndex: number) => async (event: ChangeEvent<HTMLInputElement>) => {
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
    const resultFiles = images.map((file, index) => {
      if (isRequestMedia(file) && withComment) {
        return { ...file, fileLink: index === fileIndex ? readyFilesArr[0] : file.fileLink }
      } else {
        return index === fileIndex ? readyFilesArr[0] : file
      }
    })

    setImages(resultFiles)
  }

  const handleChangeComment = (commentIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const resultFiles = images.map((file, index) =>
      index === commentIndex && isRequestMedia(file) ? { ...file, commentByClient: event.target.value } : file,
    )

    setImages(resultFiles)
  }

  const handleRemoveFile = (fileIndex: number) => {
    const resultFiles = images.filter((_, index) => index !== fileIndex)

    setImages(resultFiles)
  }

  const disabledLoadButton = linkInput === '' || images?.length >= maxNumber

  return {
    currentFileIndex,
    disabledLoadButton,
    images,
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
