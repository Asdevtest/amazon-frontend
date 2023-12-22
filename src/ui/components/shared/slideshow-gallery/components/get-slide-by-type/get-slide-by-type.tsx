import { ComponentType, FC, memo } from 'react'

import { checkIsDocumentLink, checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { isString } from '@typings/type-guards'
import { IUploadFile } from '@typings/upload-file'

interface GetSlideByTypeProps {
  mediaFile: string | IUploadFile
  mediaFileIndex: number
  ImageComponent: ComponentType<{ src: string; alt: string }>
  VideoComponent: ComponentType<{ videoSource: string }>
  FileComponent: ComponentType<{ documentLink: string; fileExtension: string }>
  isPreviews?: boolean
}

export const GetSlideByType: FC<GetSlideByTypeProps> = memo(props => {
  const { mediaFile, mediaFileIndex, ImageComponent, VideoComponent, FileComponent, isPreviews = false } = props

  const mediaFileToCheck = isString(mediaFile) ? mediaFile : mediaFile?.file.name
  const elementExtension = mediaFileToCheck?.split('.')?.slice(-1)?.[0]
  const displayedMediaFile = isString(mediaFile) ? getAmazonImageUrl(mediaFile, !isPreviews) : mediaFile?.data_url
  const documentLink = isString(mediaFile) ? getAmazonImageUrl(mediaFile) : '/'

  if (checkIsImageLink(mediaFileToCheck)) {
    return <ImageComponent src={displayedMediaFile} alt={`Slide ${mediaFileIndex}`} />
  } else if (checkIsVideoLink(mediaFileToCheck)) {
    return <VideoComponent videoSource={displayedMediaFile} />
  } else if (checkIsDocumentLink(mediaFileToCheck)) {
    return <FileComponent documentLink={documentLink} fileExtension={elementExtension} />
  } else {
    return (
      <img
        src="/assets/img/no-photo.jpg"
        alt="Media file not defined"
        style={{ width: isPreviews ? '75%' : '100%', height: '100%' }}
      />
    )
  }
})
