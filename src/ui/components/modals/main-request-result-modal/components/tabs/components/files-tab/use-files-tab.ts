import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { reversedFormatDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'
import { downloadArchive, downloadFile, downloadFileByLink } from '@utils/upload-files'

import { isString } from '@typings/guards'
import { IRequestMedia } from '@typings/models/requests/request-media'

export const useFilesTab = (media: IRequestMedia[]) => {
  const [files, setFiles] = useState<IRequestMedia[]>([])
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showSlideshowGalleryModal, setSlideshowGalleryModal] = useState(false)
  const [currentEditableFile, setCurrentEditableFile] = useState<IRequestMedia | undefined>(undefined)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [filesForDownload, setFilesForDownload] = useState<IRequestMedia[]>([])
  const [archiveButtonInactiveBeforeDownloading, setArchiveButtonInactiveBeforeDownloading] = useState(false)

  useEffect(() => {
    if (media.length > 0) {
      setFiles(media)
    }
  }, [media])

  const handleShowCommentModal = () => setShowCommentModal(!showCommentModal)
  const handleShowSlideshowGalleryModal = () => setSlideshowGalleryModal(!showSlideshowGalleryModal)

  const handleDownloadArchive = async () => {
    try {
      setArchiveButtonInactiveBeforeDownloading(true)

      const currentFilesForDownload = filesForDownload.map(file => file.fileLink)

      await downloadArchive(currentFilesForDownload, reversedFormatDateWithoutTime(new Date()))
    } catch (error) {
      console.log(error)
      toast.warning(t(TranslationKey['Failed to download archive. Please try again.']))
    } finally {
      setArchiveButtonInactiveBeforeDownloading(false)
    }
  }

  const handleDownloadAllFiles = useCallback(() => {
    if (filesForDownload.length > 0) {
      filesForDownload.forEach(({ fileLink }) =>
        isString(fileLink) ? downloadFileByLink(fileLink) : downloadFile(fileLink),
      )
    }
  }, [filesForDownload])

  const handleToggleCommentModal = useCallback((file: IRequestMedia) => {
    setCurrentEditableFile(file)
    setShowCommentModal(!showCommentModal)
  }, [])

  const handleChangeComment = (comment: string) => {
    setFiles(prevFiles =>
      prevFiles.map(file => (file._id === currentEditableFile?._id ? { ...file, commentByPerformer: comment } : file)),
    )
    setCurrentEditableFile(undefined)
  }
  const handleToggleImageModal = useCallback((fileIndex: number) => {
    setCurrentFileIndex(fileIndex)
    setSlideshowGalleryModal(!showSlideshowGalleryModal)
  }, [])

  const handleCheckAllFiles = () => {
    if (filesForDownload.length === files.length) {
      setFilesForDownload([])
    } else {
      setFilesForDownload(files)
    }
  }

  const handleCheckFile = useCallback((file: IRequestMedia) => {
    setFilesForDownload(prevFiles => {
      const findFileById = prevFiles.find(({ _id }) => _id === file._id)

      if (findFileById) {
        return prevFiles.filter(({ _id }) => _id !== file._id)
      } else {
        return [...prevFiles, file]
      }
    })
  }, [])

  return {
    showCommentModal,
    showSlideshowGalleryModal,

    files,
    currentEditableFile,
    currentFileIndex,
    filesForDownload,
    archiveButtonInactiveBeforeDownloading,

    onShowCommentModal: handleShowCommentModal,
    onShowSlideshowGalleryModal: handleShowSlideshowGalleryModal,
    onDownloadArchive: handleDownloadArchive,
    onDownloadAllFiles: handleDownloadAllFiles,
    onChangeComment: handleChangeComment,
    onToggleCommentModal: handleToggleCommentModal,
    onToggleImageModal: handleToggleImageModal,
    onCheckAllFiles: handleCheckAllFiles,
    onCheckFile: handleCheckFile,
  }
}
