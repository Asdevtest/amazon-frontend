import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomCheckbox } from '@components/shared/custom-checkbox'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './select-product-asin-cell-withour-title.style'

interface SelectProductCellWithourTitleProps {
  product: IProduct
  checkboxDisabled?: boolean
  checkboxChecked?: boolean
  withCheckbox?: boolean
  onClickCheckbox?: () => void
}

export const SelectProductCellWithourTitle: FC<SelectProductCellWithourTitleProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { product, checkboxDisabled, checkboxChecked, withCheckbox, onClickCheckbox } = props

  return (
    <div className={styles.selectedProductWrapper}>
      {withCheckbox && (
        <CustomCheckbox
          disabled={checkboxDisabled}
          checked={checkboxChecked}
          onChange={e => {
            e.stopPropagation()
            !!onClickCheckbox && onClickCheckbox()
          }}
        />
      )}
      <div className={styles.productInfoWrapper}>
        <img alt="" className={cx(styles.productImg)} src={getAmazonImageUrl(product?.images?.[0])} />
        <div>
          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={product.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={product.skuByClient} />
        </div>
      </div>
    </div>
  )
})
