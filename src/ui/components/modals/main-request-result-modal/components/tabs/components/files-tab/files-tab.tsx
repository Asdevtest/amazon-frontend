import { FC, memo } from 'react'

import { MIDDLE_COMMENT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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

  const checkedSelectAll = filesForDownload.length === files.length && files.length > 0
  const disabledArchiveButton = !filesForDownload.length || archiveButtonInactiveBeforeDownloading
  const commentModalTitle = props.isClient ? t(TranslationKey['Add comment']) : t(TranslationKey['View comment'])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.files}>
          {files.map((file, index) => (
            <File
              key={file._id}
              readOnly={props.readOnly}
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

        {props.isClient || props.readOnly ? (
          <Buttons
            checked={checkedSelectAll}
            disabledSelectAllCheckbox={!files.length}
            disabledFilesButton={!filesForDownload.length}
            disabledArchiveButton={disabledArchiveButton}
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
          title={commentModalTitle}
          text={currentEditableFile?.commentByClient || ''}
          maxLength={MIDDLE_COMMENT_VALUE}
          isOpenModal={showCommentModal}
          onOpenModal={onShowCommentModal}
          onChangeField={onChangeComment}
        />
      ) : null}

      {showSlideshowGalleryModal ? (
        <SlideshowGalleryModal
          files={files}
          currentFileIndex={currentFileIndex}
          isOpenModal={showSlideshowGalleryModal}
          onOpenModal={onShowSlideshowGalleryModal}
        />
      ) : null}
    </>
  )
})
