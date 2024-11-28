import { Image as AntdImage, ImageProps } from 'antd'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './custom-image.style'

import { getFallbackImage, renderPreviewContent, renderPreviewToolbar } from './custom-image.config'

export interface CustomImageProps extends ImageProps {
  fullImage?: boolean
  className?: string
  maskClassName?: string
  wrapperClassName?: string
}

export const CustomImage: FC<CustomImageProps> = memo(props => {
  const { fullImage = true, className, src, maskClassName, wrapperClassName, ...restProps } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, wrapperClassName)} onClick={e => e.stopPropagation()}>
      <AntdImage
        preview={
          !!src && {
            maskClassName: cx(styles.maskClassNameRoot, maskClassName),
            destroyOnClose: true,
            imageRender: renderPreviewContent,
            toolbarRender: renderPreviewToolbar,
          }
        }
        fallback={getFallbackImage(src)}
        src={getAmazonImageUrl(src, fullImage)}
        className={cx(styles.image, className)}
        {...restProps}
      />
    </div>
  )
})
