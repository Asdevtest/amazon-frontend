import React, { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { useDataGridCellStyles } from './multiple-asin-cell.style'

interface MultipleAsinCellProps {
  asinList: string[]
}

export const MultipleAsinCell: FC<MultipleAsinCellProps> = React.memo(({ asinList }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.multipleAsinWrapper}>
      {asinList.map((asin, index) => (
        <AsinOrSkuLink key={index} withCopyValue asin={asin} />
      ))}
    </div>
  )
})
