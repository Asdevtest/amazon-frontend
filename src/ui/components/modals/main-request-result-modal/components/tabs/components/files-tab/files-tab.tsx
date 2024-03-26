import { FC, memo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { MIDDLE_COMMENT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { Specs } from '@typings/enums/specs'

import { useScrollToFile } from '@hooks/use-scroll-to-file'

import { useStyles } from './files-tab.style'

import { Buttons } from './buttons'
import { File } from './file'
import { ONLY_ONE_SEO_FILE } from './files-tab.constats'
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
    onUpdateSeoIFilesInProduct,
    onReorderMediaFiles,
  } = useFilesTab(props)

  const handleCheckedFile = (fileId: string | null) => filesForDownload.some(({ _id }) => _id === fileId)
  const checkedSelectAll = filesForDownload.length === files.length && files.length > 0
  const disabledArchiveButton = !filesForDownload.length || archiveButtonInactiveBeforeDownloading
  const commentModalTitle = props.isClient
    ? t(TranslationKey['Add comment'])
    : t(TranslationKey['View a comment from a client'])
  const showUpdateSeoFilesInProductButton = props.isClient && props.spec.type === Specs.SEO
  const disabledUpdateSeoFilesInProductButton = filesForDownload.length !== ONLY_ONE_SEO_FILE
  const errorUpdateSeoFilesInProduct = filesForDownload.length > ONLY_ONE_SEO_FILE

  const lastFileRef = useScrollToFile(files.length)

  console.log(
    'files',
    files.map(file => file.index),
  )

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.files}>
          <DndProvider backend={HTML5Backend}>
            {files.map((file, index) => (
              <File
                key={index}
                ref={index === files.length - 1 ? lastFileRef : null}
                readOnly={props.readOnly}
                isClient={props.isClient}
                file={file}
                fileIndex={index}
                checked={handleCheckedFile(file._id)}
                onCheckFile={onCheckFile}
                onToggleImageModal={onToggleImageModal}
                onToggleCommentModal={onToggleCommentModal}
                onDeleteFile={onDeleteFile}
                onChangeFileName={onChangeFileName}
                onUploadFile={onUploadFile}
                onReorderMediaFiles={onReorderMediaFiles}
              />
            ))}
          </DndProvider>
        </div>

        {props.isClient || props.readOnly ? (
          <Buttons
            checked={checkedSelectAll}
            disabledSelectAllCheckbox={!files.length}
            disabledFilesButton={!filesForDownload.length}
            disabledArchiveButton={disabledArchiveButton}
            showUpdateSeoFilesInProductButton={showUpdateSeoFilesInProductButton}
            disabledUpdateSeoFilesInProductButton={disabledUpdateSeoFilesInProductButton}
            errorUpdateSeoFilesInProduct={errorUpdateSeoFilesInProduct}
            onCheckAllFiles={onCheckAllFiles}
            onDownloadArchive={onDownloadArchive}
            onDownloadAllFiles={onDownloadAllFiles}
            onUpdateSeoIFilesInProduct={onUpdateSeoIFilesInProduct}
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
          readOnly={!props.isClient || props.readOnly}
          title={commentModalTitle}
          text={currentEditableFile?.commentByClient || ''}
          maxLength={MIDDLE_COMMENT_VALUE}
          openModal={showCommentModal}
          onOpenModal={onShowCommentModal}
          onChangeField={onChangeComment}
        />
      ) : null}

      {showSlideshowGalleryModal ? (
        <SlideshowGalleryModal
          files={files}
          currentFileIndex={currentFileIndex}
          openModal={showSlideshowGalleryModal}
          onOpenModal={onShowSlideshowGalleryModal}
        />
      ) : null}
    </>
  )
})
