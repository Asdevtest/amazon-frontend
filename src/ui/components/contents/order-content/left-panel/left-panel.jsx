import { Typography } from '@mui/material'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'

import { useStyles } from './left-panel.style'

import { ProductParameters } from './product-parameters'

export const LeftPanel = ({
  order,
  narrow,
  formFields,
  onChangeField,
  isCanChange,
  onClickBarcode,
  onDeleteBarcode,
  isNotMultiple,
  isMultiple,
  amountInBox,
}) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.orderContainer}>
      <div className={styles.product}>
        <img alt="" className={styles.productImg} src={getAmazonImageUrl(order.product.images[0])} />

        <div className={styles.productInfoWrapper}>
          <Typography className={styles.amazonTitle}>
            {getShortenStringIfLongerThanCount(order.product.amazonTitle, 85)}
          </Typography>
          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={order?.product?.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={order.product?.skuByClient} />
        </div>
      </div>

      <ProductParameters
        amountInBox={amountInBox}
        isNotMultiple={isNotMultiple}
        isMultiple={isMultiple}
        isCanChange={isCanChange}
        order={order}
        formFields={formFields}
        onChangeField={onChangeField}
        onClickBarcode={onClickBarcode}
        onDeleteBarcode={onDeleteBarcode}
      />
    </div>
  )
}
