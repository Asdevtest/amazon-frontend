import { Image, ImageProps } from 'antd'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './custom-image.style'

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
      <Image
        preview={!!src && { maskClassName: cx(styles.maskClassNameRoot, maskClassName) }}
        src={getAmazonImageUrl(src, fullImage)}
        className={cx(styles.image, className)}
        {...restProps}
      />
    </div>
  )
})
