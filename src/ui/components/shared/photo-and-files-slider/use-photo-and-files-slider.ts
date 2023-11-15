import { ChangeEvent, useEffect, useState } from 'react'

import { checkIsDocumentLink, checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { IUploadFile } from '@typings/upload-file'

export const usePhotoAndFilesSlider = (
  files: Array<string | IUploadFile> | undefined | null,
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void,
  startPhotoIndex?: number,
) => {
  const [openImageModal, setOpenImageModal] = useState(false)
  const [openImageEditModal, setOpenImageEditModal] = useState(false)
  const [openImageZoomModal, setOpenImageZoomModal] = useState(false)
  const onOpenImageModal = () => setOpenImageModal(!openImageModal)
  const onOpenImageEditModal = () => setOpenImageEditModal(!openImageEditModal)
  const onOpenImageZoomModal = () => setOpenImageZoomModal(!openImageZoomModal)

  const documents = (files || []).filter(el => checkIsDocumentLink(typeof el === 'string' ? el : el?.file?.name))
  const [documentIndex, setDocumentIndex] = useState(0)

  const [photos, setPhotos] = useState<Array<string | IUploadFile>>([])
  const [photoIndex, setPhotoIndex] = useState(startPhotoIndex ?? 0)

  const [isPlaying, setIsPlaying] = useState(false) // for video player

  useEffect(() => {
    if (photos?.length - 1 < photoIndex && photos?.length > 0) {
      setPhotoIndex(photos?.length - 1)
    }
  }, [photos.length])

  useEffect(() => {
    if (startPhotoIndex !== undefined) {
      setPhotoIndex(startPhotoIndex)
    }
  }, [startPhotoIndex])

  useEffect(() => {
    const photoFiltering = (files || []).reduce((result: Array<string | IUploadFile>, el) => {
      const currentFile = typeof el === 'string' ? el : el?.file?.name
      const isImage = checkIsImageLink(currentFile)
      const isDocument = checkIsDocumentLink(currentFile)

      if (isImage) {
        result.push(el)
      }

      if (!isImage && !isDocument) {
        if (typeof el === 'string') {
          result.push(getAmazonImageUrl(el, true))
        } else {
          result.push(el)
        }
      }

      return result
    }, [])

    setPhotos(photoFiltering)
  }, [files])

  const updateImagesForLoad = () => {
    if (onChangeImagesForLoad) {
      onChangeImagesForLoad([...documents, ...photos])
    }
  }

  const onClickEditImageSubmit = (image: string) => {
    const editingPhotos = photos.map((slide, index) => (index === photoIndex ? image : slide))
    setPhotos(editingPhotos)
  }

  const onClickRemoveImageObj = (imageIndex: number) => {
    const filteringPhotos = photos.filter((_, index) => index !== imageIndex)
    setPhotos(filteringPhotos)

    if (!filteringPhotos?.length) {
      onOpenImageModal()
    }
  }

  const onUploadFile = async (event: ChangeEvent<HTMLInputElement>, imageIndex: number) => {
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
    const editingPhotos = photos.map((photo, index) => (index === imageIndex ? readyFilesArr[0] : photo))

    setPhotos(editingPhotos)
  }

  const onClickMakeMainImageObj = (image: string | IUploadFile, imageIndex: number) => {
    const filteringPhotos = photos.filter((_, index) => index !== imageIndex)
    const editingPhotos = [image, ...filteringPhotos]

    setPhotos(editingPhotos)
    setPhotoIndex(0)
  }

  const onClickDownloadPhoto = (photo: string | IUploadFile) =>
    typeof photo === 'string' ? downloadFileByLink(photo) : downloadFile(photo.file)

  return {
    openImageModal,
    onOpenImageModal,
    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    photos,
    photoIndex,
    setPhotoIndex,

    documents,
    documentIndex,
    setDocumentIndex,

    isPlaying,
    setIsPlaying,

    onClickMakeMainImageObj,
    onUploadFile,
    onClickRemoveImageObj,
    onClickEditImageSubmit,
    onClickDownloadPhoto,
    updateImagesForLoad,
  }
}
