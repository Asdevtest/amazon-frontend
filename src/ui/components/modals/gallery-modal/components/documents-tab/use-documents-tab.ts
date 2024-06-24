import { useState } from 'react'

import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

const VISIBLE_FILES_COUNT = 10

export const useDocumentsTab = (files: UploadFileType[]) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalSlides = Math.ceil(files.length / VISIBLE_FILES_COUNT)

  const handleChangePage = (increment: number) => {
    setCurrentPage(prevPage => prevPage + increment)
  }
  const handleDownloadFile = (file: UploadFileType) =>
    isString(file) ? downloadFileByLink(file) : downloadFile(file?.file)
  const checkIsFileOnCurrentPage = (index: number) =>
    index >= currentPage * VISIBLE_FILES_COUNT && index < (currentPage + 1) * VISIBLE_FILES_COUNT

  return {
    currentPage: currentPage + 1,
    isTransitioning,
    totalSlides,
    setIsTransitioning,
    checkIsFileOnCurrentPage,
    onChangePage: handleChangePage,
    onDownloadFile: handleDownloadFile,
  }
}
