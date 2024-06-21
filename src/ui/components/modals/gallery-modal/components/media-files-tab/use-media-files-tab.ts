import { useEffect, useState } from 'react'

import { UploadFileType } from '@typings/shared/upload-file'

const VISIBLE_MEDIA_FILES_COUNT = 18

export const useMediaFilesTab = (slides: UploadFileType[]) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSlides = Math.ceil(slides.length / VISIBLE_MEDIA_FILES_COUNT)

  const handleChangePage = (increment: number) => {
    setCurrentPage(prevPage => prevPage + increment)
  }
  const handleToggleImageModal = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex)
    setShowImageModal(!showImageModal)
  }

  const checkIsFileOnCurrentPage = (index: number) =>
    index >= currentPage * VISIBLE_MEDIA_FILES_COUNT && index < (currentPage + 1) * VISIBLE_MEDIA_FILES_COUNT

  useEffect(() => {
    if (!checkIsFileOnCurrentPage(currentSlideIndex)) {
      const newCurrentPage = Math.floor(currentSlideIndex / VISIBLE_MEDIA_FILES_COUNT)
      setCurrentPage(newCurrentPage)
    }
  }, [currentSlideIndex])

  return {
    currentPage: currentPage + 1,
    currentSlideIndex,
    showImageModal,
    isTransitioning,
    totalSlides,
    setShowImageModal,
    setIsTransitioning,
    setCurrentSlideIndex,
    checkIsFileOnCurrentPage,
    onChangePage: handleChangePage,
    onToggleImageModal: handleToggleImageModal,
  }
}
