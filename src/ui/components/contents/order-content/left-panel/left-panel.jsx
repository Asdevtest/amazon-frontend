import { Divider, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './left-panel.style'

import { ProductParameters } from './product-parameters'

export const LeftPanel = ({
  order,
  collapsed,
  narrow,
  setCollapsed,
  formFields,
  onChangeField,
  isCanChange,
  onClickBarcode,
  onDeleteBarcode,
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
          <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={order?.product?.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={order.product?.skuByClient} />
        </div>
      </div>

      <ProductParameters
        isCanChange={isCanChange}
        order={order}
        collapsed={collapsed}
        formFields={formFields}
        onChangeField={onChangeField}
        onClickBarcode={onClickBarcode}
        onDeleteBarcode={onDeleteBarcode}
      />

      <div className={styles.collapsedWrapper} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={styles.containerTitle}>
          {!collapsed ? t(TranslationKey['All product parameters']) : t(TranslationKey.Collapse)}
        </Typography>
      </div>
      <Divider orientation={'horizontal'} className={styles.divider} />
      {narrow && <Divider orientation={'horizontal'} className={styles.lastDivider} />}
    </div>
  )
}
