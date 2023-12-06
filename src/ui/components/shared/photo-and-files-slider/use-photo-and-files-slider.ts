import { ChangeEvent, useEffect, useState } from 'react'

import { checkIsDocumentLink, checkIsMediaFileLink } from '@utils/checks'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { IUploadFile } from '@typings/upload-file'

export const usePhotoAndFilesSlider = (
  files: Array<string | IUploadFile>,
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void,
  startMediaFileIndex?: number,
) => {
  const [openImageModal, setOpenImageModal] = useState(false)
  const [openImageEditModal, setOpenImageEditModal] = useState(false)
  const [openImageZoomModal, setOpenImageZoomModal] = useState(false)
  const onOpenImageModal = () => setOpenImageModal(!openImageModal)
  const onOpenImageEditModal = () => setOpenImageEditModal(!openImageEditModal)
  const onOpenImageZoomModal = () => setOpenImageZoomModal(!openImageZoomModal)

  const documents = files?.filter(el => checkIsDocumentLink(typeof el === 'string' ? el : el?.file?.name))
  const [documentIndex, setDocumentIndex] = useState(0)

  const [mediaFiles, setMediaFiles] = useState<Array<string | IUploadFile>>([])
  const [mediaFileIndex, setMediaFileIndex] = useState(startMediaFileIndex ?? 0)

  const [isPlaying, setIsPlaying] = useState(false) // for video player

  useEffect(() => {
    if (mediaFiles?.length - 1 < mediaFileIndex && mediaFiles?.length > 0) {
      setMediaFileIndex(mediaFiles?.length - 1)
    }
  }, [mediaFiles?.length])

  useEffect(() => {
    if (startMediaFileIndex !== undefined) {
      setMediaFileIndex(startMediaFileIndex)
    }
  }, [startMediaFileIndex])

  useEffect(() => {
    const filteringMediaFiles = files?.filter(file => {
      const currentFile = typeof file === 'string' ? file : file?.file?.name

      return checkIsMediaFileLink(currentFile) || !checkIsDocumentLink(currentFile) // checkIsDocumentLink for photos of this format '61H0DsE0SfL'
    })

    setMediaFiles(filteringMediaFiles)
  }, [files])

  const updateImagesForLoad = () => {
    if (onChangeImagesForLoad) {
      onChangeImagesForLoad([...documents, ...mediaFiles])
    }
  }

  const onClickEditImageSubmit = (file: string) => {
    const editingMediaFiles = mediaFiles.map((slide, index) => (index === mediaFileIndex ? file : slide))
    setMediaFiles(editingMediaFiles)
  }

  const onClickRemoveImageObj = (fileIndex: number) => {
    const filteringMediaFiles = mediaFiles.filter((_, index) => index !== fileIndex)
    setMediaFiles(filteringMediaFiles)

    if (!filteringMediaFiles?.length) {
      onOpenImageModal()
    }
  }

  const onUploadFile = async (event: ChangeEvent<HTMLInputElement>, fileIndex: number) => {
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

    const editingMediaFiles = mediaFiles.map((mediaFile, index) => (index === fileIndex ? readyFilesArr[0] : mediaFile))

    setMediaFiles(editingMediaFiles)
  }

  const onClickMakeMainImageObj = (file: string | IUploadFile, fileIndex: number) => {
    const filteringMediaFiles = mediaFiles.filter((_, index) => index !== fileIndex)
    const editingMediaFiles = [file, ...filteringMediaFiles]

    setMediaFiles(editingMediaFiles)
    setMediaFileIndex(0)
  }

  const onClickDownloadPhoto = (file: string | IUploadFile) =>
    typeof file === 'string' ? downloadFileByLink(file) : downloadFile(file?.file)

  return {
    openImageModal,
    onOpenImageModal,
    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    mediaFiles,
    mediaFileIndex,
    setMediaFileIndex,

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
