import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { Checkbox } from '@components/shared/checkbox'
import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { Input } from '@components/shared/input'
import { SlideByType } from '@components/shared/slide-by-type'
import { CustomPlusIcon, EyeIcon } from '@components/shared/svg-icons'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { t } from '@utils/translations'

import { useStyles } from './file.style'

interface FileProps {
  isClient: boolean
  file: IMediaRework
  fileIndex: number
  checked: boolean
  onCheckFile: (file: IMediaRework) => void
  onToggleImageModal: (fileIndex: number) => void
  onToggleCommentModal: (file: IMediaRework) => void
  onDeleteFile: (fileIndex: number) => void
  onChangeFileName: (fileIndex: number, fileName: string) => void
  onUploadFile: (fileIndex: number, file: ChangeEvent<HTMLInputElement>) => void
}

export const File: FC<FileProps> = memo(props => {
  const {
    isClient,
    file,
    fileIndex,
    checked,
    onCheckFile,
    onToggleImageModal,
    onToggleCommentModal,
    onDeleteFile,
    onChangeFileName,
    onUploadFile,
  } = props

  const { classes: styles, cx } = useStyles()

  const commonContent = (
    <div className={styles.file} onClick={() => onToggleImageModal(fileIndex)}>
      <SlideByType
        isPreviews
        mediaFile={file.fileLink}
        mediaFileIndex={fileIndex}
        ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.image} />}
        VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} />}
        FileComponent={({ fileExtension }) => <CustomFileIcon middleSize fileExtension={fileExtension} />}
      />
    </div>
  )

  return (
    <div className={styles.fileContainer}>
      {isClient ? (
        <Checkbox
          checked={checked}
          className={styles.checkbox}
          wrapperClassName={styles.checkboxWrapper}
          onChange={() => onCheckFile(file)}
        />
      ) : (
        <button
          className={cx(styles.checkboxWrapper, styles.checkbox, styles.button)}
          onClick={() => onDeleteFile(fileIndex)}
        >
          ✕
        </button>
      )}

      {isClient ? (
        commonContent
      ) : file.fileLink ? (
        commonContent
      ) : (
        <button className={styles.file}>
          <CustomPlusIcon className={cx(styles.icon, styles.plusIcon)} />
          <span className={styles.commentText}>{t(TranslationKey.Upload)}</span>
          <input type="file" defaultValue="" className={styles.pasteInput} onChange={e => onUploadFile(fileIndex, e)} />
        </button>
      )}

      {isClient ? (
        <button className={styles.commenButton} onClick={() => onToggleCommentModal(file)}>
          {file.commentByClient ? (
            <EyeIcon className={styles.icon} />
          ) : (
            <CustomPlusIcon className={cx(styles.icon, styles.plusIcon)} />
          )}

          <span className={styles.commentText}>{t(TranslationKey.Comment)}</span>
        </button>
      ) : (
        <Input
          value={file.commentByPerformer}
          placeholder={`${t(TranslationKey['File name'])}...`}
          classes={{ root: styles.inputRoot, input: styles.input }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFileName(fileIndex, e.target.value)}
        />
      )}
    </div>
  )
})
