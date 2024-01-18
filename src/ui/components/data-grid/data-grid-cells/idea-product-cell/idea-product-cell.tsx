/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './idea-product-cell.style'

import { ProductAsinCell } from '../data-grid-cells'

interface IdeaProductCellProps {
  rowData: any
  onClickCreateCard: (data: any) => void
}

export const IdeaProductCell: FC<IdeaProductCellProps> = memo(({ onClickCreateCard, rowData }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.ideaWrapper}>
      {!rowData.childProduct && rowData.variation && (
        <Button
          success
          small
          className={styles.ideaProductActionButton}
          onClick={() => onClickCreateCard(rowData.originalData)}
        >
          {t(TranslationKey['Create a product card'])}
        </Button>
      )}

      {!!rowData.childProduct && (
        <ProductAsinCell
          withoutImage
          amazonTitle={rowData.childProduct?.amazonTitle}
          asin={rowData.childProduct?.asin}
          skuByClient={rowData.childProduct?.skuByClient}
        />
      )}
    </div>
  )
})
