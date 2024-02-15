import { useEffect, useState } from 'react'

import { checkIsDocumentLink, checkIsImageLink, checkIsVideoLink } from '@utils/checks'

import { UploadFileType } from '@typings/shared/upload-file'

import { DIFFERENCE_BETWEEN_INDEXES, VISIBLE_FILES_COUNT, VISIBLE_MEDIA_FILES_COUNT } from './gallery-modal.constants'
import { SwitcherConditions } from './gallery-modal.type'

export const useGalleryModal = (files: UploadFileType[]) => {
  const [tabValue, setTabValue] = useState<SwitcherConditions>(SwitcherConditions.MEDIA_FILES)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<UploadFileType[]>([])
  const [documents, setDocuments] = useState<UploadFileType[]>([])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    if (files.length > 0) {
      setDocuments(files.filter(slide => checkIsDocumentLink(slide)))
      setMediaFiles(files.filter(slide => checkIsImageLink(slide) || checkIsVideoLink(slide)))
    }
  }, [files])

  useEffect(() => {
    setCurrentSlideIndex(0)
  }, [tabValue])

  const selectedFiles = tabValue ? documents : mediaFiles
  const visibleSlidesCount = tabValue ? VISIBLE_FILES_COUNT : VISIBLE_MEDIA_FILES_COUNT
  const colculatedStartIndex = currentSlideIndex * visibleSlidesCount
  const totalSlides = Math.ceil(selectedFiles.length / visibleSlidesCount)
  const visibleSlides = selectedFiles.slice(colculatedStartIndex, colculatedStartIndex + visibleSlidesCount)

  const handleSlideChange = (increment: number) => {
    setCurrentSlideIndex(prevSlide => (prevSlide + increment + totalSlides) % totalSlides)
  }

  return {
    tabValue,
    setTabValue,

    visibleSlides,

    currentPage: currentSlideIndex + DIFFERENCE_BETWEEN_INDEXES,
    totalSlides,

    isTransitioning,
    setIsTransitioning,

    onSlideChange: handleSlideChange,
  }
}
