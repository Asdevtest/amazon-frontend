import { ChangeEvent, useEffect, useState } from 'react'

import { FIRST_SLIDE } from '@components/shared/slideshow-gallery/slideshow-gallery.constants'

import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { UploadFileType } from '@typings/upload-file'

export const useSlideshowGalleryModal = (
  files: UploadFileType[],
  onChangeImagesForLoad?: (array: UploadFileType[]) => void,
  startMediaFileIndex?: number,
) => {
  const [mediaFiles, setMediaFiles] = useState<UploadFileType[]>([])
  const [mediaFileIndex, setMediaFileIndex] = useState(FIRST_SLIDE)

  const [isTransitioning, setIsTransitioning] = useState(false) // for animation between slide switches

  const [openImageEditModal, setOpenImageEditModal] = useState(false)
  const [openImageZoomModal, setOpenImageZoomModal] = useState(false)
  const onOpenImageEditModal = () => setOpenImageEditModal(!openImageEditModal)
  const onOpenImageZoomModal = () => setOpenImageZoomModal(!openImageZoomModal)

  useEffect(() => {
    if (files) {
      setMediaFiles(files)
    }
  }, [files])

  useEffect(() => {
    // 'undefined' - because 0 === false
    if (startMediaFileIndex !== undefined) {
      setMediaFileIndex(startMediaFileIndex)
    }
  }, [startMediaFileIndex])

  const updateImagesForLoad = () => {
    if (onChangeImagesForLoad) {
      onChangeImagesForLoad(mediaFiles)
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
        // onOpenImageModal()
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
    mediaFiles,
    mediaFileIndex,
    setMediaFileIndex,

    isTransitioning,
    setIsTransitioning,

    openImageEditModal,
    onOpenImageEditModal,
    openImageZoomModal,
    onOpenImageZoomModal,

    onMakeMainFile,
    onUploadFile,
    onRemoveFile,
    onEditRotateFile,
    onDownloadFile,
    updateImagesForLoad,
  }
}
