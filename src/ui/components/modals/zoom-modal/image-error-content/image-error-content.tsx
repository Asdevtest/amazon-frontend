import { FC, memo } from 'react'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsDocumentLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { isString } from '@typings/guards'

import { useStyles } from './image-error-content.styles'

interface ImageErrorContentProps {
  files: string[]
  fileIndex: number
}

export const ImageErrorContent: FC<ImageErrorContentProps> = memo(({ files, fileIndex }) => {
  const { classes: styles } = useStyles()

  const checkIsVideo = checkIsVideoLink(files?.[fileIndex])
  const checkIsDocument = checkIsDocumentLink(files?.[fileIndex])
  const documentExtension = files?.[fileIndex]?.split('.')?.slice(-1)?.[0]
  const documentLink = isString(files?.[fileIndex]) ? getAmazonImageUrl(files?.[fileIndex]) : '/'

  const getImageErrorContent = () => {
    if (checkIsVideo) {
      return (
        <VideoPlayer
          controls
          videoSource={files?.[fileIndex]}
          wrapperClass={styles.videoPlayerCustomWrapper}
          videoPlayerClass={styles.videoPlayerCustom}
        />
      )
    }

    if (checkIsDocument) {
      return (
        <a href={files?.[fileIndex]} target="_blank" rel="noreferrer noopener" className={styles.document}>
          <CustomFileIcon fileExtension={documentExtension} height="400px" />
          <span className={styles.linkText}>{documentLink}</span>
        </a>
      )
    }

    return 'This image failed to load!'
  }

  return <>{getImageErrorContent()}</>
})
