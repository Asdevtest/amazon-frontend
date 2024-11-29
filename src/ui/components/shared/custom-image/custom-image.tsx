import { Image as AntdImage, ImageProps } from 'antd'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './custom-image.style'

import { getFallbackImage, renderPreviewContent, renderPreviewToolbar } from './custom-image.config'

export interface CustomImageProps extends ImageProps {
  fullImage?: boolean
  className?: string
  rootClassName?: string
}

export const CustomImage: FC<CustomImageProps> = memo(props => {
  const { fullImage = true, className, src, rootClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
      <AntdImage
        className={className}
        rootClassName={cx(styles.root, rootClassName)}
        preview={
          !!src && {
            destroyOnClose: true,
            imageRender: renderPreviewContent,
            toolbarRender: renderPreviewToolbar,
          }
        }
        fallback={getFallbackImage(src)}
        src={getAmazonImageUrl(src, fullImage)}
        {...restProps}
      />
    </div>
  )
})
