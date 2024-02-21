import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'

import { t } from '@utils/translations'

import { IRequestMedia } from '@typings/models/requests/request-media'

import { useStyles } from './files-tab.style'

import { Buttons } from './buttons'
import { File } from './file'
import { useFilesTab } from './use-files-tab'

interface FilesTabProps {
  media: IRequestMedia[]
}

export const FilesTab: FC<FilesTabProps> = memo(({ media }) => {
  const { classes: styles } = useStyles()

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
  } = useFilesTab(media)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.files}>
          {files.map((file, index) => (
            <File
              key={file._id}
              file={file}
              fileIndex={index}
              checked={filesForDownload.some(({ _id }) => _id === file._id)}
              onCheckFile={onCheckFile}
              onToggleImageModal={onToggleImageModal}
              onToggleCommentModal={onToggleCommentModal}
            />
          ))}
        </div>

        <Buttons
          checked={filesForDownload.length === files.length}
          disabledFilesButton={!filesForDownload.length}
          disabledArchiveButton={!filesForDownload.length || archiveButtonInactiveBeforeDownloading}
          onCheckAllFiles={onCheckAllFiles}
          onDownloadArchive={onDownloadArchive}
          onDownloadAllFiles={onDownloadAllFiles}
        />
      </div>

      {showCommentModal ? (
        <CommentsModal
          title={t(TranslationKey['Add comment'])}
          text={currentEditableFile?.commentByPerformer || ''}
          isOpenModal={showCommentModal}
          onOpenModal={onShowCommentModal}
          onChangeField={onChangeComment}
        />
      ) : null}

      {showSlideshowGalleryModal ? (
        <SlideshowGalleryModal
          files={files.map(file => ({
            // TODO: перейти на IRequestMedia по всему проекту
            _id: file._id,
            comment: file.commentByClient,
            image: file.fileLink,
            commentByClient: file.commentByPerformer,
          }))}
          currentFileIndex={currentFileIndex}
          isOpenModal={showSlideshowGalleryModal}
          onOpenModal={onShowSlideshowGalleryModal}
        />
      ) : null}
    </>
  )
})
