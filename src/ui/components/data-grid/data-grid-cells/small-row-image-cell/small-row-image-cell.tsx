import React, { FC } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useDataGridCellStyles } from './small-row-image-cell.style'

interface SmallRowImageCellProps {
  image: string
}

export const SmallRowImageCell: FC<SmallRowImageCellProps> = React.memo(({ image }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.smallRowImgWrapper}>
      <img alt="" className={styles.img} src={getAmazonImageUrl(image)} />
    </div>
  )
})
