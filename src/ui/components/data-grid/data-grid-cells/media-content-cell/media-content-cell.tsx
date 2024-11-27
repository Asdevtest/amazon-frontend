import { Image } from 'antd'
import { FC, memo, useMemo } from 'react'

import { CustomImage } from '@components/shared/custom-image'
import { renderPreviewContent, renderPreviewToolbar } from '@components/shared/custom-image/custom-image'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './media-content-cell.style'

interface MediaContentCellProps {
  files: string[]
}

export const MediaContentCell: FC<MediaContentCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  if (!files.length) {
    return null
  }

  const items = useMemo(() => files.map(file => getAmazonImageUrl(file, true)), [])

  return (
    <div className={styles.wrapper}>
      <Image.PreviewGroup
        items={items}
        preview={{
          destroyOnClose: true,
          imageRender: renderPreviewContent,
          toolbarRender: renderPreviewToolbar,
        }}
      >
        <CustomImage width={48} height={48} src={files[0]} maskClassName={styles.mask} />
      </Image.PreviewGroup>
    </div>
  )
})
