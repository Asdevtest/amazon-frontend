import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './items.style'

interface ItemsProps {
  formFields: IBox
}

export const Items: FC<ItemsProps> = memo(({ formFields }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      {formFields?.items?.map((item, index) => (
        <div key={index} className={styles.itemWrapper}>
          <p className={cx(styles.text, styles.blueText)}>{`x ${item?.amount}`}</p>

          <div className={styles.item}>
            <div className={styles.photoWrapper}>
              <img src={getAmazonImageUrl(item?.product?.images?.[0])} alt="product-preview" className={styles.photo} />
            </div>

            <div className={styles.info}>
              <Tooltip title={item?.product?.amazonTitle}>
                <p className={styles.text}>{item?.product?.amazonTitle}</p>
              </Tooltip>

              <AsinOrSkuLink withAttributeTitle="asin" link={item?.product?.asin} />
              <AsinOrSkuLink withAttributeTitle="sku" link={item?.product?.skuByClient} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})
