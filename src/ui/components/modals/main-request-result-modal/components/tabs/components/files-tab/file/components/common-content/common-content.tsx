import { FC, memo } from 'react'

import { IMediaRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { SlideByType } from '@components/shared/slide-by-type'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { useStyles } from './common-content.style'

interface CommonContentProps {
  file: IMediaRework
  fileIndex: number
  onToggleImageModal: (fileIndex: number) => void
}

export const CommonContent: FC<CommonContentProps> = memo(props => {
  const { file, fileIndex, onToggleImageModal } = props

  const { classes: styles } = useStyles()

  return (
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
})
