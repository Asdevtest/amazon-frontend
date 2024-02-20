import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { SlideByType } from '@components/shared/slide-by-type'
import { CustomPlusIcon, EyeIcon } from '@components/shared/svg-icons'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { t } from '@utils/translations'

import { IRequestMedia } from '@typings/models/requests/request-media'

import { useStyles } from './file.style'

interface FileProps {
  file: IRequestMedia
  fileIndex: number
  checked: boolean
  onCheckFile: (file: IRequestMedia) => void
  onToggleImageModal: (fileIndex: number) => void
  onToggleCommentModal: (file: IRequestMedia) => void
}

export const File: FC<FileProps> = memo(props => {
  const { file, fileIndex, checked, onCheckFile, onToggleImageModal, onToggleCommentModal } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.fileContainer}>
      <Checkbox
        checked={checked}
        className={styles.checkbox}
        wrapperClassName={styles.checkboxWrapper}
        onChange={() => onCheckFile(file)}
      />

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

      <button className={styles.commenButton} onClick={() => onToggleCommentModal(file)}>
        {file.commentByPerformer ? (
          <EyeIcon className={styles.icon} />
        ) : (
          <CustomPlusIcon className={cx(styles.icon, styles.plusIcon)} />
        )}

        <span className={styles.commentText}>{t(TranslationKey.Comment)}</span>
      </button>
    </div>
  )
})
