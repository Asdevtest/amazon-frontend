import { Image } from 'antd'
import { FC, memo } from 'react'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './custom-preview-group.style'

interface CustomPreviewGroupProps {
  data: UploadFileType[]
  size?: number
  gap?: number
  center?: boolean
}

export const CustomPreviewGroup: FC<CustomPreviewGroupProps> = memo(props => {
  const { data, size = 40, gap = 10, center } = props

  if (!data.length) {
    return null
  }

  const { classes: styles, cx } = useStyles()

  const scrollableHeight = size * 2 + gap

  return (
    <div className={cx(styles.root, { [styles.center]: center })} style={{ maxHeight: scrollableHeight, gap }}>
      <Image.PreviewGroup>
        {data.map((url, index) => (
          <Image
            key={index}
            width={size}
            height={size}
            src={url as string}
            preview={!!url && { maskClassName: styles.mask }}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  )
})
