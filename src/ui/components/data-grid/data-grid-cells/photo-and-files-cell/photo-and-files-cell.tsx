import React, { FC } from 'react'

import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'

import { IUploadFile } from '@typings/upload-file'

import { useDataGridCellStyles } from './photo-and-files-cell.style'

interface PhotoAndFilesCellProps {
  files: IUploadFile[]
}

export const PhotoAndFilesCell: FC<PhotoAndFilesCellProps> = React.memo(({ files }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.photoWrapper}>
      <PhotoAndFilesCarousel small width={'300px'} files={files} />
    </div>
  )
})
