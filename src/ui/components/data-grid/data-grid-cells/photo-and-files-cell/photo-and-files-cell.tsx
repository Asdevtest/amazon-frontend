import { FC, memo } from 'react'

import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'

import { UploadFileType } from '@typings/upload-file'

import { useStyles } from './photo-and-files-cell.style'

interface PhotoAndFilesCellProps {
  files: UploadFileType[]
}

export const PhotoAndFilesCell: FC<PhotoAndFilesCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.photoWrapper}>
      <PhotoAndFilesCarousel small width={'300px'} files={files} />
    </div>
  )
})
