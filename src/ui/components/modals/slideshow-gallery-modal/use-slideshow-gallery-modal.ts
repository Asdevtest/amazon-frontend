import { ChangeEvent, useEffect, useState } from 'react'

import { FIRST_SLIDE } from '@components/shared/slideshow-gallery/slideshow-gallery.constants'

import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { isArrayOfMediaRequest, isUploadFileType } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { SlideshowGalleryModalProps } from './slideshow-gallery-modal.type'

export const useSlideshowGalleryModal = ({
  files,
  onChangeImagesForLoad,
  currentFileIndex,
  onOpenModal,
}: SlideshowGalleryModalProps) => {
  const [mediaFiles, setMediaFiles] = useState<UploadFileType[]>([])
  const [comments, setComments] = useState<string[]>([])
  const [commentsByClient, setCommentsByClient] = useState<string[]>([])
  const [fileIndex, setFileIndex] = useState(FIRST_SLIDE)

  const [isTransitioning, setIsTransitioning] = useState(false) // for animation between slide switches

  const [openImageEditModal, setOpenImageEditModal] = useState(false)
  const [openImageZoomModal, setOpenImageZoomModal] = useState(false)
  const onOpenImageEditModal = () => setOpenImageEditModal(!openImageEditModal)
  const onOpenImageZoomModal = () => setOpenImageZoomModal(!openImageZoomModal)

  useEffect(() => {
    if (files) {
      setMediaFiles(files.map(file => (isUploadFileType(file) ? file : file?.image)))

      if (isArrayOfMediaRequest(files)) {
        setComments(files.map(file => file?.comment || ''))
        setCommentsByClient(files.map(file => file?.commentByClient || ''))
      }
    }
  }, [files])

  useEffect(() => {
    // 'undefined' - because 0 === false
    if (currentFileIndex !== undefined) {
      setFileIndex(currentFileIndex)
    }
  }, [currentFileIndex])

  const updateImagesForLoad = () => {
    if (onChangeImagesForLoad) {
      const updatedFiles = isArrayOfMediaRequest(files)
        ? files.map((file, index) => ({
            ...file,
            image: mediaFiles[index],
            // only change media files
          }))
        : mediaFiles

      onChangeImagesForLoad(updatedFiles)
    }
  }

  const onEditRotateFile = (file: string) => {
    setMediaFiles(prevMediaFiles => prevMediaFiles.map((slide, index) => (index === fileIndex ? file : slide)))
  }

  const onRemoveFile = (mediaFileIndex: number) => {
    setMediaFiles(prevMediaFiles => {
      const changingMediaFiles = isArrayOfMediaRequest(files)
        ? prevMediaFiles.map((item, index) => (index === mediaFileIndex ? '' : item))
        : prevMediaFiles.filter((_, index) => index !== mediaFileIndex)

      if (mediaFileIndex > 0) {
        setFileIndex(mediaFileIndex - 1) // returns to the previous photo
      }

      if (changingMediaFiles?.length === 0) {
        onOpenModal ? onOpenModal() : undefined
      }

      return changingMediaFiles
    })
  }

  const onUploadFile = async (event: ChangeEvent<HTMLInputElement>, mediaFileIndex: number) => {
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
      prevMediaFiles.map((mediaFile, index) => (index === mediaFileIndex ? readyFilesArr[0] : mediaFile)),
    )
  }

  const onMakeMainFile = (file: UploadFileType, mediaFileIndex: number) => {
    setMediaFiles(prevMediaFiles => {
      const filteringMediaFiles = prevMediaFiles.filter((_, index) => index !== mediaFileIndex)
      const editingMediaFiles = [file, ...filteringMediaFiles]

      return editingMediaFiles
    })
    setFileIndex(0)
  }

  const onDownloadFile = (file: UploadFileType) =>
    typeof file === 'string' ? downloadFileByLink(file) : downloadFile(file?.file)

  return {
    mediaFiles,
    comments,
    commentsByClient,
    fileIndex,
    setFileIndex,

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
