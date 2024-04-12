import { FC, memo } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { SlideByType } from '@components/shared/slide-by-type'
import { VideoPreloader } from '@components/shared/video-preloader'

import { isRequestMedia, isUploadFileType } from '@typings/guards'
import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './file.style'

import { FilesProps } from '../files'

import { Comment } from './comment'

interface FileProps extends Omit<FilesProps, 'files' | 'maxHeight'> {
  file: UploadFileType | IRequestMedia
  fileIndex: number
}

export const File: FC<FileProps> = memo(props => {
  const { file, fileIndex, withComment, onRemoveFile, onShowGalleryModal, onChangeComment, onUploadFile } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.fileWrapper}>
      <div className={styles.file} onClick={() => onShowGalleryModal(fileIndex)}>
        <SlideByType
          isPreviews
          mediaFile={isUploadFileType(file) ? file : file?.fileLink}
          mediaFileIndex={fileIndex}
          ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.image} />}
          VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} height={45} />}
          FileComponent={({ fileExtension }) => <CustomFileIcon fileExtension={fileExtension} height="75%" />}
        />
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

      <div className={styles.buttons}>
        <button className={styles.iconButton}>
          <AutorenewIcon className={styles.icon} fontSize="small" />

          <input type="file" className={styles.uploadInput} onChange={onUploadFile(fileIndex)} />
        </button>

        <button className={styles.iconButton} onClick={() => onRemoveFile(fileIndex)}>
          <HighlightOffIcon className={styles.icon} fontSize="small" />
        </button>
      </div>
    </div>
  )
})
