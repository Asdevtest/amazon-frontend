import type { ImageProps } from 'antd'
import { Image } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-image.style'

export interface CustomImageProps extends Omit<ImageProps, 'src'> {
  imageUrl: string
  className?: string
  wrapperClassName?: string
}

export const CustomImage: FC<CustomImageProps> = memo(props => {
  const { imageUrl, className, wrapperClassName, ...restProps } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, wrapperClassName)} onClick={e => e.stopPropagation()}>
      <Image src={imageUrl} className={className} {...restProps} />
    </div>
  )
})
