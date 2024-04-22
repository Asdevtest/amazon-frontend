import { FC, memo } from 'react'

import { checkIsDocumentLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useImageValidation } from '@hooks/use-image-validation'

import { useStyles } from './slide-by-type.style'

import { CustomFileIcon } from '../custom-file-icon'
import { VideoPlayer } from '../video-player'
import { VideoPreloader } from '../video-preloader'

interface SlideByTypeProps {
  mediaFile: UploadFileType
  mediaFileIndex: number
  isModal?: boolean
  withLink?: boolean
  isPreviews?: boolean
  objectFitContain?: boolean
}

export const SlideByType: FC<SlideByTypeProps> = memo(props => {
  const { mediaFile, mediaFileIndex, isModal, withLink, isPreviews, objectFitContain } = props

  const { classes: styles, cx } = useStyles()

  const mediaFileToCheck = isString(mediaFile) ? mediaFile : mediaFile?.file.name
  const displayedMediaFile = isString(mediaFile) ? getAmazonImageUrl(mediaFile, !isPreviews) : mediaFile?.data_url
  const documentExtension = mediaFileToCheck?.split('.')?.slice(-1)?.[0]
  const documentLink = isString(mediaFile) ? getAmazonImageUrl(mediaFile) : '/'
  const validatedImage = useImageValidation(displayedMediaFile)

  if (checkIsVideoLink(mediaFileToCheck)) {
    return isModal ? (
      <VideoPlayer controls videoSource={displayedMediaFile} />
    ) : (
      <VideoPreloader videoSource={displayedMediaFile} />
    )
  } else if (checkIsDocumentLink(mediaFileToCheck)) {
    return <CustomFileIcon link={withLink ? documentLink : undefined} fileExtension={documentExtension} height="75%" />
  } else {
    return (
      <img
        src={validatedImage}
        alt={`Slide ${mediaFileIndex}`}
        className={cx(styles.image, { [styles.objectFitContain]: objectFitContain })}
      />
    )
  }
})
