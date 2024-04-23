import { FC, memo } from 'react'

import { SlideByType } from '@components/shared/slide-by-type'

import { isRequestMedia, isString, isUploadFile, isUploadFileType } from '@typings/guards'
import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './file.style'

import { FilesProps } from '../files'

import { Buttons } from './buttons'
import { Comment } from './comment'

interface FileProps extends Omit<FilesProps, 'files' | 'maxHeight'> {
  file: UploadFileType | IRequestMedia
  fileIndex: number
}

export const File: FC<FileProps> = memo(props => {
  const { file, fileIndex, withComment, onRemoveFile, onShowGalleryModal, onChangeComment, onUploadFile } = props

  const { classes: styles, cx } = useStyles()

  const displayedFile = isUploadFileType(file) ? file : file?.fileLink
  const isNewFile = isUploadFile(file) || (isString(file) && !file.includes('uploads/'))

  return (
    <div className={styles.fileWrapper}>
      <div className={cx(styles.file, { [styles.newFile]: isNewFile })} onClick={() => onShowGalleryModal(fileIndex)}>
        <SlideByType isPreviews mediaFile={displayedFile} mediaFileIndex={fileIndex} />
      </div>

      {isRequestMedia(file) ? (
        <Comment
          comment={file?.commentByClient}
          fileIndex={fileIndex}
          placeholder={fileIndex + 1 + '.'}
          withComment={withComment}
          onChangeComment={onChangeComment}
        />
      ) : null}

      <Buttons fileIndex={fileIndex} onRemoveFile={onRemoveFile} onUploadFile={onUploadFile} />
    </div>
  )
})
