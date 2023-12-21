import { useEffect, useState } from 'react'

import { IUploadFile } from '@typings/upload-file'

export const useSlideshowGallery = (files: Array<string | IUploadFile>) => {
  const [mediaFiles, setMediaFiles] = useState<Array<string | IUploadFile>>([])
  const [currentMediaFileIndex, setCurrentMediaFileIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false) // for animation between slide switches

  useEffect(() => {
    if (files.length) {
      setMediaFiles(files)
    }
  }, [files])

  return {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,

    isTransitioning,
    setIsTransitioning,
  }
}
