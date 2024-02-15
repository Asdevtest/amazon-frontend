import { ChangeEvent, useEffect, useState } from 'react'

import { checkIsDocumentLink, checkIsMediaFileLink } from '@utils/checks'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { UploadFileType } from '@typings/shared/upload-file'

export const usePhotoAndFilesSlider = (
  files: UploadFileType[],
  onChangeImagesForLoad?: (array: UploadFileType[]) => void,
  startMediaFileIndex?: number,
) => {
  const [openImageModal, setOpenImageModal] = useState(false)
  const [openImageEditModal, setOpenImageEditModal] = useState(false)
  const [openImageZoomModal, setOpenImageZoomModal] = useState(false)
  const onOpenImageModal = () => setOpenImageModal(!openImageModal)
  const onOpenImageEditModal = () => setOpenImageEditModal(!openImageEditModal)
  const onOpenImageZoomModal = () => setOpenImageZoomModal(!openImageZoomModal)

  const documents = (files || [])?.filter(el => checkIsDocumentLink(typeof el === 'string' ? el : el?.file?.name))
  const [documentIndex, setDocumentIndex] = useState(0)

  const [mediaFiles, setMediaFiles] = useState<UploadFileType[]>([])
  const [mediaFileIndex, setMediaFileIndex] = useState(startMediaFileIndex ?? 0)

  const [isPlaying, setIsPlaying] = useState(false) // to turn off the video when transitioning between slides

  useEffect(() => {
    // 'undefined' - because 0 === false
    if (startMediaFileIndex !== undefined) {
      setMediaFileIndex(startMediaFileIndex)
    }
  }, [startMediaFileIndex])

  useEffect(() => {
    const filteringMediaFiles = (files || [])?.filter(file => {
      const currentFile = typeof file === 'string' ? file : file?.file?.name

      return checkIsMediaFileLink(currentFile) || !checkIsDocumentLink(currentFile) // checkIsDocumentLink for photos of this format '61H0DsE0SfL'
    })

    setMediaFiles(filteringMediaFiles)
  }, [files])

  const updateImagesForLoad = () => {
    if (onChangeImagesForLoad) {
      onChangeImagesForLoad([...mediaFiles, ...documents]) // when saving media files first, then documents - fewer bugs in the future
    }
  }

  const onEditRotateFile = (file: string) => {
    setMediaFiles(prevMediaFiles => prevMediaFiles.map((slide, index) => (index === mediaFileIndex ? file : slide)))
  }

  const onRemoveFile = (fileIndex: number) => {
    setMediaFiles(prevMediaFiles => {
      const filteringMediaFiles = prevMediaFiles.filter((_, index) => index !== fileIndex)

      if (fileIndex > 0) {
        setMediaFileIndex(fileIndex - 1) // returns to the previous photo
      }

      if (filteringMediaFiles?.length === 0) {
        onOpenImageModal()
      }

      return filteringMediaFiles
    })
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

    setMediaFiles(prevMediaFiles =>
      prevMediaFiles.map((mediaFile, index) => (index === fileIndex ? readyFilesArr[0] : mediaFile)),
    )
  }

  const onMakeMainFile = (file: string | UploadFileType, fileIndex: number) => {
    setMediaFiles(prevMediaFiles => {
      const filteringMediaFiles = prevMediaFiles.filter((_, index) => index !== fileIndex)
      const editingMediaFiles = [file, ...filteringMediaFiles]

      return editingMediaFiles
    })
    setMediaFileIndex(0)
  }

  const onDownloadFile = (file: string | UploadFileType) =>
    typeof file === 'string' ? downloadFileByLink(file) : downloadFile(file?.file)

  return {
    openImageModal,
    onOpenImageModal,
    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    mediaFiles,
    setMediaFiles,
    mediaFileIndex,
    setMediaFileIndex,

    documents,
    documentIndex,
    setDocumentIndex,

    isPlaying,
    setIsPlaying,

    onMakeMainFile,
    onUploadFile,
    onRemoveFile,
    onEditRotateFile,
    onDownloadFile,
    updateImagesForLoad,
  }
}
