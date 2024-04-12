import { FC, memo } from 'react'

import { checkIsDocumentLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useImageValidation } from '@hooks/use-image-validation'

import { useStyles } from './slide-by-type.style'

import { CustomFileIcon } from '../custom-file-icon'
import { VideoPreloader } from '../video-preloader'

interface SlideByTypeProps {
  mediaFile: UploadFileType
  mediaFileIndex: number
  isPreviews?: boolean
}

export const SlideByType: FC<SlideByTypeProps> = memo(props => {
  const { mediaFile, mediaFileIndex, isPreviews } = props

  const { classes: styles } = useStyles()

  const mediaFileToCheck = isString(mediaFile) ? mediaFile : mediaFile?.file.name
  const displayedMediaFile = isString(mediaFile) ? getAmazonImageUrl(mediaFile, !isPreviews) : mediaFile?.data_url
  const documentExtension = mediaFileToCheck?.split('.')?.slice(-1)?.[0]
  const documentLink = isString(mediaFile) ? getAmazonImageUrl(mediaFile) : '/'

  if (checkIsVideoLink(mediaFileToCheck)) {
    return <VideoPreloader videoSource={displayedMediaFile} height={45} />
  } else if (checkIsDocumentLink(mediaFileToCheck)) {
    return <CustomFileIcon fileExtension={documentExtension} height="75%" />
  } else {
    return <img src={useImageValidation(displayedMediaFile)} alt={`Slide ${mediaFileIndex}`} className={styles.image} />
  }
})
