import { FC, memo } from 'react'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { SlideByType } from '@components/shared/slide-by-type'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { IRequestMedia } from '@typings/models/requests/request-media'

import { useStyles } from './files-tab.style'

interface FilesTabProps {
  files: IRequestMedia[]
}

export const FilesTab: FC<FilesTabProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.files}>
      {files.map((file, index) => {
        return (
          <div key={file._id} className={styles.fileContainer}>
            <div className={styles.file}>
              <SlideByType
                isPreviews
                mediaFile={file.fileLink}
                mediaFileIndex={index}
                ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.image} />}
                VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} />}
                FileComponent={({ fileExtension }) => <CustomFileIcon middleSize fileExtension={fileExtension} />}
              />
            </div>

            <div>
              <p>text</p>
            </div>
          </div>
        )
      })}
    </div>
  )
})
