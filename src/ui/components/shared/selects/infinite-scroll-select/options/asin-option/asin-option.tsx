import { Avatar } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomImage } from '@components/shared/custom-image'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './asin-option.style'

interface AsinOptionProps {
  data: BaseOptionType
}

export const AsinOption: FC<AsinOptionProps> = memo(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.optionWrapper}>
      <div className={styles.flexContainer}>
        <CustomImage width={32} height={32} src={data.images?.[0]} />
        <div className={styles.asinContainer}>
          <AsinOrSkuLink
            withCopyValue
            withAttributeTitle="asin"
            link={data.asin}
            textStyles={styles.optionText}
            iconStyles={styles.optionIcon}
          />
          <AsinOrSkuLink
            withCopyValue
            withAttributeTitle="sku"
            link={data.skuByClient}
            textStyles={styles.optionText}
            iconStyles={styles.optionIcon}
          />
        </div>
      </div>

      {data.marketPlaceCountry ? (
        <div className={styles.flexContainer}>
          <Avatar size={20} src={getAmazonImageUrl(data.marketPlaceCountry?.image)} />
          <p>{data.marketPlaceCountry?.shortTitle}</p>
        </div>
      ) : null}
    </div>
  )
})
