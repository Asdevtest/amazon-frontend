import { Image } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-preview-group.style'

interface CustomPreviewGroupProps {
  data: string[]
  width?: number
  gap?: number
  center?: boolean
}

export const CustomPreviewGroup: FC<CustomPreviewGroupProps> = memo(props => {
  const { data, width = 40, gap = 10, center } = props

  if (!data.length) {
    return null
  }

  const { classes: styles, cx } = useStyles()

  const scrollableHeight = width * 2 + gap

  return (
    <div className={cx(styles.root, { [styles.center]: center })} style={{ maxHeight: scrollableHeight, gap }}>
      <Image.PreviewGroup>
        {data.map((url, index) => (
          <Image key={index} width={width} src={url} />
        ))}
      </Image.PreviewGroup>
    </div>
  )
})
