import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { IMediaRequest } from '@typings/shared/upload-file'

import { useStyles } from './files-tab.style'

import { Buttons } from './buttons'
import { File } from './file'
import { FilesTabProps } from './files-tab.type'
import { useFilesTab } from './use-files-tab'

export const FilesTab: FC<FilesTabProps> = memo(props => {
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
    onAddFile,
    onDeleteFile,
    onChangeFileName,
    onUploadFile,
  } = useFilesTab(props)

  const slides: IMediaRequest[] = files.map(file => ({
    _id: file._id || '',
    image: file.fileLink,
    comment: file?.commentByPerformer || '',
    commentByClient: file?.commentByClient || '',
  }))

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.files}>
          {files.map((file, index) => (
            <File
              key={file._id}
              isClient={props.isClient}
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

        {props.isClient ? (
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
          readOnly={!props.isClient}
          title={t(TranslationKey['Add comment'])}
          text={(props.isClient ? currentEditableFile?.commentByClient : currentEditableFile?.commentByPerformer) || ''}
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
