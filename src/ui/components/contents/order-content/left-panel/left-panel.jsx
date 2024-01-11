import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, Divider, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './left-panel.style'

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
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.product}>
        <img alt="" className={classNames.productImg} src={getAmazonImageUrl(order.product.images[0])} />

        <div className={classNames.productInfoWrapper}>
          <Typography className={classNames.amazonTitle}>
            {getShortenStringIfLongerThanCount(order.product.amazonTitle, 85)}
          </Typography>
          <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={order?.product?.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={order.product?.skuByClient} />
        </div>
      </div>

      <Button className={classNames.documentsButton} variant="outlined" endIcon={<CloudUploadIcon fontSize="small" />}>
        {t(TranslationKey.Documents)}
      </Button>

      <ProductParameters
        isCanChange={isCanChange}
        order={order}
        collapsed={collapsed}
        formFields={formFields}
        onChangeField={onChangeField}
        onClickBarcode={onClickBarcode}
        onDeleteBarcode={onDeleteBarcode}
      />

      <div className={classNames.collapsedWrapper} onClick={() => setCollapsed(!collapsed)}>
        <Typography className={classNames.containerTitle}>
          {!collapsed ? t(TranslationKey['All product parameters']) : t(TranslationKey.Collapse)}
        </Typography>
      </div>
      <Divider orientation={'horizontal'} className={classNames.divider} />
      {narrow && <Divider orientation={'horizontal'} className={classNames.lastDivider} />}
    </div>
  )
}
