import { observer } from 'mobx-react'
import { FC } from 'react'
import { BiCrown } from 'react-icons/bi'
import { CiShare1 } from 'react-icons/ci'
import { FaMinus } from 'react-icons/fa6'
import { TiFlowChildren } from 'react-icons/ti'

import { ProductCell } from '@components/data-grid/data-grid-cells'

import { IVariationProduct } from '@typings/models/products/product-variation'

import { useStyles } from './interconnected-product.style'

import { CustomButton } from '../custom-button'

interface InterconnectedProductProps {
  variationProduct: IVariationProduct
  isParent?: boolean
  onRemove?: (id: string) => void
}

export const InterconnectedProduct: FC<InterconnectedProductProps> = observer(props => {
  const { variationProduct, isParent, onRemove } = props

  const { classes: styles } = useStyles()

  const onClickShowProduct = (id: string) => {
    const win = window.open(`${window.location.origin}/client/inventory/product?product-id=${id}`, '_blank')

    win?.focus()
  }

  return (
    <div className={styles.root}>
      {isParent ? <BiCrown size={24} className={styles.parentVariationIcon} /> : <TiFlowChildren size={24} />}

      <div className={styles.product}>
        <ProductCell
          image={variationProduct?.images?.[0]}
          asin={variationProduct?.asin}
          sku={variationProduct?.skuByClient}
        />
      </div>

      <CustomButton
        size="small"
        icon={<CiShare1 size={12} />}
        onClick={() => onClickShowProduct(variationProduct?._id)}
      />

      {onRemove ? (
        <CustomButton
          danger
          size="small"
          icon={<FaMinus size={12} />}
          type="primary"
          onClick={() => onRemove(variationProduct?._id)}
        />
      ) : null}
    </div>
  )
})
