import { Image as AntdImage } from 'antd'
import { FC, memo } from 'react'

import { CustomImage, renderPreviewContent, renderPreviewToolbar } from '@components/shared/custom-image'

import { useImagesValidation } from '@hooks/use-image-validation'

import { useStyles } from './media-content-cell.style'

interface MediaContentCellProps {
  files: string[]
}

export const MediaContentCell: FC<MediaContentCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  const items = useImagesValidation(files || [])

  if (!files.length) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <AntdImage.PreviewGroup
        items={items}
        preview={{
          destroyOnClose: true,
          imageRender: renderPreviewContent,
          toolbarRender: renderPreviewToolbar,
        }}
      >
        <CustomImage width={48} height={48} src={files[0]} />
      </AntdImage.PreviewGroup>
    </div>
  )
})
