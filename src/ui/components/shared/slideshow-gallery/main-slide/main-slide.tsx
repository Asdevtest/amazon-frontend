import { FC, memo } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './main-slide.style'

import { GetSlideByType } from '../get-slide-by-type'

interface MainSlideProps {
  mediaFiles: Array<string | IUploadFile>
  currentMediaFileIndex: number
  isTransitioning: boolean
}

export const MainSlide: FC<MainSlideProps> = memo(props => {
  const { mediaFiles, currentMediaFileIndex, isTransitioning } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.mainSlide}>
      <GetSlideByType
        mediaFile={mediaFiles[currentMediaFileIndex]}
        mediaFileIndex={currentMediaFileIndex}
        ImageComponent={({ src, alt }) => (
          <img src={src} alt={alt} className={cx(styles.mainSlideImg, { [styles.slideTransition]: isTransitioning })} />
        )}
        VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} height="285px" />}
        FileComponent={({ documentLink, fileExtension }) => (
          <a href={documentLink} target="_blank" rel="noreferrer" className={styles.document}>
            <FileIcon fileExtension={fileExtension} className={styles.fileIcon} />
            <span className={styles.linkText}>{documentLink}</span>
          </a>
        )}
      />
    </div>
  )
})
