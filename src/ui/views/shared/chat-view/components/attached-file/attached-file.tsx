import { FC, memo, useCallback } from 'react'

import { VideoPreloader } from '@components/shared/video-preloader'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './attached-file.style'

import { getReplyMessageType } from '../../helpers/get-reply-message-type'
import { ReplyMessageType } from '../../types/reply-message.type'
import { File } from '../file'

interface AttachedFileProps {
  images?: string[]
  videos?: string[]
  files?: string[]
}

export const AttachedFile: FC<AttachedFileProps> = memo(({ images, videos, files }) => {
  const { classes: styles } = useStyles()

  const firstImage = images?.[0]
  const firstFile = files?.[0] as string
  const firstVideo = videos?.[0]

  const relpyMessageType = getReplyMessageType({ image: firstImage, file: firstFile, video: firstVideo })

  const renderFile = useCallback(() => {
    switch (relpyMessageType) {
      case ReplyMessageType.IMAGE:
        return <img src={getAmazonImageUrl(firstImage)} className={styles.img} alt="image" />
      case ReplyMessageType.FILE:
        return <File withoutInfo size="40px" src={firstFile} />
      case ReplyMessageType.VIDEO:
        return <VideoPreloader videoSource={getAmazonImageUrl(firstVideo)} />
      default:
        return null
    }
  }, [])

  return <>{renderFile()}</>
})
