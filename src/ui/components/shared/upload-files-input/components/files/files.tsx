import { ChangeEvent, FC, memo } from 'react'

import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './files.style'

import { File } from './file'

export interface FilesProps {
  files: UploadFileType[] | IRequestMedia[]
  onRemoveFile: (fileIndex: number) => void
  onShowGalleryModal: (fileIndex: number) => void
  onChangeComment: (fileIndex: number) => (event: ChangeEvent<HTMLInputElement>) => void
  onUploadFile: (fileIndex: number) => (event: ChangeEvent<HTMLInputElement>) => void
  maxHeight?: number
  withComment?: boolean
}

export const Files: FC<FilesProps> = memo(props => {
  const { files, maxHeight, withComment, onRemoveFile, onShowGalleryModal, onChangeComment, onUploadFile } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper} style={{ maxHeight }}>
      {files.map((file, index) => (
        <File
          key={index}
          file={file}
          fileIndex={index}
          withComment={withComment}
          onRemoveFile={onRemoveFile}
          onShowGalleryModal={onShowGalleryModal}
          onChangeComment={onChangeComment}
          onUploadFile={onUploadFile}
        />
      ))}
    </div>
  )
})
