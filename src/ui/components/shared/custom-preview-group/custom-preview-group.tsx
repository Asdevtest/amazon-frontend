import { Image } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-preview-group.style'

import { CustomImage, renderPreviewContent, renderPreviewToolbar } from '../custom-image'

interface CustomPreviewGroupProps {
  data: string[]
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
      <Image.PreviewGroup
        preview={{
          destroyOnClose: true,
          imageRender: renderPreviewContent,
          toolbarRender: renderPreviewToolbar,
        }}
      >
        {data.map((url, index) => (
          <CustomImage key={index} width={size} height={size} src={url} />
        ))}
      </Image.PreviewGroup>
    </div>
  )
})
