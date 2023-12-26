import { useEffect, useState } from 'react'

import { IUploadFile } from '@typings/upload-file'

import { FIRST_SLIDE } from './slideshow-gallery.constants'

export const useSlideshowGallery = (files: Array<string | IUploadFile>) => {
  const [mediaFiles, setMediaFiles] = useState<Array<string | IUploadFile>>([])
  const [currentMediaFileIndex, setCurrentMediaFileIndex] = useState(FIRST_SLIDE)

  const [isTransitioning, setIsTransitioning] = useState(false) // for animation between slide switches

  const [openImageModal, setOpenImageModal] = useState(false)
  const onOpenImageModal = () => setOpenImageModal(!openImageModal)

  useEffect(() => {
    if (files) {
      setMediaFiles(files)
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
