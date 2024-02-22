import { FC, memo, useEffect } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import {
  IMediaRework,
  SetFieldsAfterRework,
  SetFieldsToRework,
} from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IMediaRequest } from '@typings/shared/upload-file'

import { useStyles } from './files-tab.style'

import { Buttons } from './buttons'
import { File } from './file'
import { useFilesTab } from './use-files-tab'

interface FilesTabProps {
  isClient: boolean
  media: IMediaRework[]
  displayedFiles: IMediaRework[]
  setFieldsToRework: SetFieldsToRework
  setFieldsAfterRework: SetFieldsAfterRework
}

export const FilesTab: FC<FilesTabProps> = memo(props => {
  const { isClient, media, displayedFiles, setFieldsToRework, setFieldsAfterRework } = props

  const { classes: styles, cx } = useStyles()

  const {
    showCommentModal,
    showSlideshowGalleryModal,

    files,
    currentEditableFile,
    currentFileIndex,
    filesForDownload,
    archiveButtonInactiveBeforeDownloading,

    onShowCommentModal,
    onShowSlideshowGalleryModal,
    onDownloadArchive,
    onDownloadAllFiles,
    onChangeComment,
    onToggleCommentModal,
    onToggleImageModal,
    onCheckAllFiles,
    onCheckFile,
    onAddFile,
    onDeleteFile,
    onChangeFileName,
    onUploadFile,
  } = useFilesTab(media, isClient)

  useEffect(() => {
    if (isClient) {
      setFieldsToRework(prevFieldsToRework => {
        const fieldsToRework: IMediaRework[] = files.map((file, index) => ({
          _id: file._id,
          fileLink: file.fileLink,
          commentByClient: file.commentByClient,
          index,
        }))

        return { ...prevFieldsToRework, media: fieldsToRework }
      })
    } else {
      setFieldsAfterRework(prevFieldsAfterRework => {
        const fieldsToRework: IMediaRework[] = files.map((file, index) => ({
          _id: file._id,
          fileLink: file.fileLink,
          commentByPerformer: file.commentByPerformer,
          index,
        }))

        return { ...prevFieldsAfterRework, media: fieldsToRework }
      })
    }
  }, [files])

  const slides: IMediaRequest[] = displayedFiles.map(file => ({
    _id: file._id,
    image: file.fileLink,
    comment: file?.commentByPerformer || '',
    commentByClient: file?.commentByClient || '',
  }))

  return (
    <>
      <div className={styles.wrapper}>
        <div className={cx(styles.files, { [styles.clientFiles]: isClient })}>
          {displayedFiles.map((file, index) => (
            <File
              key={file._id}
              isClient={isClient}
              file={file}
              fileIndex={index}
              checked={filesForDownload.some(({ _id }) => _id === file._id)}
              onCheckFile={onCheckFile}
              onToggleImageModal={onToggleImageModal}
              onToggleCommentModal={onToggleCommentModal}
              onDeleteFile={onDeleteFile}
              onChangeFileName={onChangeFileName}
              onUploadFile={onUploadFile}
            />
          ))}
        </div>

        {isClient ? (
          <Buttons
            checked={filesForDownload.length === files.length}
            disabledFilesButton={!filesForDownload.length}
            disabledArchiveButton={!filesForDownload.length || archiveButtonInactiveBeforeDownloading}
            onCheckAllFiles={onCheckAllFiles}
            onDownloadArchive={onDownloadArchive}
            onDownloadAllFiles={onDownloadAllFiles}
          />
        ) : (
          <button className={styles.button} onClick={onAddFile}>
            <CustomPlusIcon className={styles.icon} />
            <span>{t(TranslationKey['Add file'])}</span>
          </button>
        )}
      </div>

      {showCommentModal ? (
        <CommentsModal
          title={t(TranslationKey['Add comment'])}
          text={currentEditableFile?.commentByClient || ''}
          maxLength={512}
          isOpenModal={showCommentModal}
          onOpenModal={onShowCommentModal}
          onChangeField={onChangeComment}
        />
      ) : null}

      {showSlideshowGalleryModal ? (
        <SlideshowGalleryModal
          files={slides}
          currentFileIndex={currentFileIndex}
          isOpenModal={showSlideshowGalleryModal}
          onOpenModal={onShowSlideshowGalleryModal}
        />
      ) : null}
    </>
  )
})
