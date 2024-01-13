import { FC, memo } from 'react'

import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './photo-and-files-cell.style'

interface PhotoAndFilesCellProps {
  files: IUploadFile[]
}

export const PhotoAndFilesCell: FC<PhotoAndFilesCellProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.photoWrapper}>
      <PhotoAndFilesCarousel small width={'300px'} files={files} />
    </div>
  )
})
