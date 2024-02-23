import { ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'

import { reversedFormatDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'
import { downloadArchive, downloadFile, downloadFileByLink } from '@utils/upload-files'

import { isString } from '@typings/guards'

import { FilesTabProps } from './files-tab.type'

export const useFilesTab = ({ isClient, files, setFields }: FilesTabProps) => {
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showSlideshowGalleryModal, setSlideshowGalleryModal] = useState(false)
  const [currentEditableFile, setCurrentEditableFile] = useState<IMediaRework | undefined>(undefined)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [filesForDownload, setFilesForDownload] = useState<IMediaRework[]>([])
  const [archiveButtonInactiveBeforeDownloading, setArchiveButtonInactiveBeforeDownloading] = useState(false)

  const handleShowCommentModal = () => setShowCommentModal(!showCommentModal)
  const handleShowSlideshowGalleryModal = () => setSlideshowGalleryModal(!showSlideshowGalleryModal)

  const handleAddFile = useCallback(() => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        media: [
          ...prevFields.media,
          {
            _id: null,
            fileLink: '',
            commentByClient: '',
            commentByPerformer: '',
            index: prevFields.media.length + 1,
          },
        ],
      }))
    }
  }, [files])

  const handleDeleteFile = useCallback(
    (fileIndex: number) => {
      if (!isClient) {
        setFields(prevFields => ({
          ...prevFields,
          media: prevFields.media.filter((_, index) => index !== fileIndex),
        }))
      }
    },
    [files],
  )

  const handleChangeFileName = useCallback(
    (fileIndex: number, comment: string) => {
      if (!isClient) {
        setFields(prevFields => ({
          ...prevFields,
          media: prevFields.media.map((file, index) =>
            index === fileIndex ? { ...file, commentByPerformer: comment } : file,
          ),
        }))
      }
    },
    [files],
  )

  const handleUploadFile = async (fileIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files || event?.target?.files?.length === 0 || isClient) {
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

    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        media: prevFields.media.map((file, index) =>
          index === fileIndex ? { ...file, fileLink: readyFilesArr[0] } : file,
        ),
      }))
    }
  }

  const handleDownloadArchive = async () => {
    if (isClient) {
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
  }

  const handleDownloadAllFiles = useCallback(() => {
    if (isClient) {
      if (filesForDownload.length > 0) {
        filesForDownload.forEach(({ fileLink }) =>
          isString(fileLink) ? downloadFileByLink(fileLink) : downloadFile(fileLink),
        )
      }
    }
  }, [filesForDownload])

  const handleToggleCommentModal = useCallback((file: IMediaRework) => {
    setCurrentEditableFile(file)
    setShowCommentModal(!showCommentModal)
  }, [])

  const handleChangeComment = (comment: string) => {
    if (isClient) {
      setFields(prevFields => ({
        ...prevFields,
        media: prevFields.media.map(file =>
          file._id === currentEditableFile?._id ? { ...file, commentByClient: comment } : file,
        ),
      }))

      setCurrentEditableFile(undefined)
    }
  }

  const handleToggleImageModal = useCallback((fileIndex: number) => {
    setCurrentFileIndex(fileIndex)
    setSlideshowGalleryModal(!showSlideshowGalleryModal)
  }, [])

  const handleCheckAllFiles = () => {
    if (isClient) {
      if (filesForDownload.length === files.length) {
        setFilesForDownload([])
      } else {
        setFilesForDownload(files)
      }
    }
  }

  const handleCheckFile = useCallback((file: IMediaRework) => {
    if (isClient) {
      setFilesForDownload(prevFiles => {
        const findFileById = prevFiles.find(({ _id }) => _id === file._id)

        if (findFileById) {
          return prevFiles.filter(({ _id }) => _id !== file._id)
        } else {
          return [...prevFiles, file]
        }
      })
    }
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
    onAddFile: handleAddFile,
    onDeleteFile: handleDeleteFile,
    onChangeFileName: handleChangeFileName,
    onUploadFile: handleUploadFile,
  }
}
