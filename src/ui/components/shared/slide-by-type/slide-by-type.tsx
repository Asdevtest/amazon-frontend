import { ComponentType, FC, memo } from 'react'

import { checkIsDocumentLink, checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

interface SlideByTypeProps {
  mediaFile: UploadFileType
  mediaFileIndex: number
  ImageComponent: ComponentType<{ src: string; alt: string }>
  VideoComponent: ComponentType<{ videoSource: string }>
  FileComponent: ComponentType<{ documentLink: string; fileExtension: string }>
  isPreviews?: boolean
}

export const SlideByType: FC<SlideByTypeProps> = memo(props => {
  const { mediaFile, mediaFileIndex, ImageComponent, VideoComponent, FileComponent, isPreviews = false } = props

  const mediaFileToCheck = isString(mediaFile) ? mediaFile : mediaFile?.file.name
  const displayedMediaFile = isString(mediaFile) ? getAmazonImageUrl(mediaFile, !isPreviews) : mediaFile?.data_url
  const documentExtension = mediaFileToCheck?.split('.')?.slice(-1)?.[0]
  const documentLink = isString(mediaFile) ? getAmazonImageUrl(mediaFile) : '/'

  if (checkIsImageLink(mediaFileToCheck)) {
    return <ImageComponent src={displayedMediaFile} alt={`Slide ${mediaFileIndex}`} />
  } else if (checkIsVideoLink(mediaFileToCheck)) {
    return <VideoComponent videoSource={displayedMediaFile} />
  } else if (checkIsDocumentLink(mediaFileToCheck)) {
    return <FileComponent documentLink={documentLink} fileExtension={documentExtension} />
  } else {
    return (
      <img
        src={displayedMediaFile}
        alt="Media file not defined"
        style={{ width: '100%', height: isPreviews ? '100%' : undefined, objectFit: isPreviews ? 'cover' : 'inherit' }} // width: isPreviews ? '75%' : '100%', height: '100%' - these settings to correct aspect ratio option
      />
    )
  }
})
