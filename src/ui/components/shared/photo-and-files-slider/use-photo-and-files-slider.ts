import { ChangeEvent, useEffect, useState } from 'react'

import { ImageObjectType } from '@components/modals/image-modal/image-modal'

import { checkIsDocumentLink, checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IUploadFile } from '@typings/upload-file'

export const usePhotoAndFilesSlider = (
  files: Array<string | IUploadFile> | undefined | null,
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void,
) => {
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const onPhotosModalToggle = () => setShowPhotosModal(!showPhotosModal)

  const documents = (files || []).filter(el => checkIsDocumentLink(typeof el === 'string' ? el : el.file.name))
  const [documentIndex, setDocumentIndex] = useState(0)

  const [photos, setPhotos] = useState<Array<string | IUploadFile>>([])
  const [photoIndex, setPhotoIndex] = useState(0)
  const [prevPhotoIndex, setPrevPhotoIndex] = useState(0)

  useEffect(() => {
    setPrevPhotoIndex(photoIndex)
  }, [showPhotosModal])

  useEffect(() => {
    if (photos.length - 1 < photoIndex && photos.length > 0) {
      setPhotoIndex(photos.length - 1)
    }
  }, [photos.length])

  useEffect(() => {
    const photoFiltering = (files || []).reduce((result: Array<string | IUploadFile>, el) => {
      const isImage = checkIsImageLink(typeof el === 'string' ? el : el.file.name)
      const isDocument = checkIsDocumentLink(typeof el === 'string' ? el : el.file.name)

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

  const updateImagesForLoad = (newPhotos: Array<string | IUploadFile>) => {
    if (onChangeImagesForLoad) {
      onChangeImagesForLoad([...documents, ...newPhotos])
    }
  }

  const onClickEditImageSubmit = (image: string) => {
    const editingPhotos = photos.map((slide, index) => (index === photoIndex ? image : slide))
    setPhotos(editingPhotos)
    updateImagesForLoad(editingPhotos)
  }

  const onClickRemoveImageObj = (imageIndex: number) => {
    const filteringPhotos = photos.filter((_, index) => index !== imageIndex)
    setPhotos(filteringPhotos)
    updateImagesForLoad(filteringPhotos)

    if (!filteringPhotos.length) {
      onPhotosModalToggle()
    }
  }

  const onUploadFile = async (event: ChangeEvent<HTMLInputElement>, imageIndex: number) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    event.preventDefault()

    const filesArr: File[] = Array.from(event.target.files)
    const readyFilesArr = filesArr.map((el: File) => ({
      data_url: URL.createObjectURL(el),
      file: new File([el], el.name?.replace(/ /g, ''), {
        type: el.type,
        lastModified: el.lastModified,
      }),
    }))
    const editingPhotos = photos.map((photo, index) => (index === imageIndex ? readyFilesArr[0] : photo))

    setPhotos(editingPhotos)
    updateImagesForLoad(editingPhotos)
  }

  const onClickMakeMainImageObj = (imageIndex: number, image: string | ImageObjectType) => {
    const selectedImage = image as string
    const filteringPhotos = photos.filter((_, index) => index !== imageIndex)
    const editingPhotos = [selectedImage, ...filteringPhotos]

    setPhotos(editingPhotos)
    updateImagesForLoad(editingPhotos)
    setPhotoIndex(0)
  }

  return {
    showPhotosModal,
    onPhotosModalToggle,

    photos,
    photoIndex,
    prevPhotoIndex,
    setPhotoIndex,
    setPrevPhotoIndex,

    documents,
    documentIndex,
    setDocumentIndex,

    onClickMakeMainImageObj,
    onUploadFile,
    onClickRemoveImageObj,
    onClickEditImageSubmit,
  }
}
