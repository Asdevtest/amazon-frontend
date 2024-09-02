/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCell } from '..'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
        <Button styleType={ButtonStyle.SUCCESS} onClick={() => onClickCreateCard(rowData)}>
          {t(TranslationKey['Create a product card'])}
        </Button>
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
