/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCell } from '..'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './idea-product-cell.style'

interface IdeaProductCellProps {
  rowData: any
  onClickCreateCard: (data: any) => void
}

export const IdeaProductCell: FC<IdeaProductCellProps> = memo(({ onClickCreateCard, rowData }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.ideaWrapper}>
      {!rowData.childProduct && rowData.variation && (
        <CustomButton type="primary" size="small" onClick={() => onClickCreateCard(rowData)}>
          {t(TranslationKey['Create a product card'])}
        </CustomButton>
      )}

      {!!rowData.childProduct && (
        <ProductCell
          title={rowData.childProduct?.amazonTitle}
          asin={rowData.childProduct?.asin}
          sku={rowData.childProduct?.skuByClient}
        />
      )}
    </div>
  )
})
