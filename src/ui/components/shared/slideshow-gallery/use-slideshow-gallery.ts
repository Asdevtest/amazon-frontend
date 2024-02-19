import { useEffect, useState } from 'react'

import { isUploadFileType } from '@typings/guards'
import { IMediaRequest, UploadFileType } from '@typings/shared/upload-file'

import { FIRST_SLIDE } from './slideshow-gallery.constants'

export const useSlideshowGallery = (files: IMediaRequest[] | UploadFileType[]) => {
  const [mediaFiles, setMediaFiles] = useState<UploadFileType[]>([])
  const [currentMediaFileIndex, setCurrentMediaFileIndex] = useState(FIRST_SLIDE)

  const [isTransitioning, setIsTransitioning] = useState(false) // for animation between slide switches

  const [openImageModal, setOpenImageModal] = useState(false)
  const onOpenImageModal = () => setOpenImageModal(!openImageModal)

  useEffect(() => {
    if (files) {
      const media = files.map(file => (isUploadFileType(file) ? file : file?.image))

      setMediaFiles(media)
    }
  }, [files])

  return {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,

    isTransitioning,
    setIsTransitioning,

    openImageModal,
    onOpenImageModal,
  }
}
