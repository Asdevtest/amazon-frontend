import { FC, memo } from 'react'

import { Checkbox } from '@mui/material'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IProduct } from '@typings/product'

import { useStyles } from './select-product-asin-cell-withour-title.style'

interface SelectProductAsinCellWithourTitleProps {
  product: IProduct
  checkboxDisabled?: boolean
  checkboxChecked?: boolean
  withCheckbox?: boolean
  onClickCheckbox?: () => void
}

export const SelectProductAsinCellWithourTitle: FC<SelectProductAsinCellWithourTitleProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { product, checkboxDisabled, checkboxChecked, withCheckbox, onClickCheckbox } = props

  return (
    <div className={styles.selectedProductWrapper}>
      {withCheckbox && (
        <Checkbox
          disabled={checkboxDisabled}
          checked={checkboxChecked}
          onClick={e => {
            e.stopPropagation()
            !!onClickCheckbox && onClickCheckbox()
          }}
        />
      )}
      <div className={styles.productInfoWrapper}>
        <img alt="" className={cx(styles.productImg)} src={getAmazonImageUrl(product?.images?.[0])} />
        <div>
          <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={product.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={product.skuByClient} />
        </div>
      </div>
    </div>
  )
})
