import { Image, ImageProps } from 'antd'
import { FC, ReactElement, memo } from 'react'

import { checkIsDocumentLink, checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './custom-image.style'

import { CustomFileIcon } from '../custom-file-icon'

export interface CustomImageProps extends ImageProps {
  fullImage?: boolean
  className?: string
  maskClassName?: string
  wrapperClassName?: string
}

export const renderPreviewContent = (originalNode: ReactElement, info: { image: { url: string } }) => {
  const url = info.image.url

  if (checkIsVideoLink(url)) {
    return <video muted controls width="60%" src={url} />
  }

  if (checkIsDocumentLink(url)) {
    const documentExtension = url?.split('.')?.slice(-1)?.[0]

    return <CustomFileIcon fileExtension={documentExtension} height="200px" />
  }

  return originalNode
}

export const renderPreviewToolbar = (originalNode: ReactElement, info: { image: { url: string } }) =>
  checkIsImageLink(info.image.url) ? originalNode : null

export const CustomImage: FC<CustomImageProps> = memo(props => {
  const { fullImage = true, className, src, maskClassName, wrapperClassName, ...restProps } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, wrapperClassName)} onClick={e => e.stopPropagation()}>
      <Image
        preview={
          !!src && {
            maskClassName: cx(styles.maskClassNameRoot, maskClassName),
            destroyOnClose: true,
            imageRender: renderPreviewContent,
            toolbarRender: renderPreviewToolbar,
          }
        }
        fallback="/assets/img/defaultImage.png"
        src={getAmazonImageUrl(src, fullImage)}
        className={cx(styles.image, className)}
        {...restProps}
      />
    </div>
  )
})
