import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { useStyles } from './multiple-asin-cell.style'

interface MultipleAsinCellProps {
  asinList: string[]
}

export const MultipleAsinCell: FC<MultipleAsinCellProps> = memo(({ asinList }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.multipleAsinWrapper}>
      {asinList.map((asin, index) => (
        <AsinOrSkuLink key={index} withCopyValue link={asin} />
      ))}
    </div>
  )
})
