import { Avatar } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FC, memo } from 'react'

import { ProductCell } from '@components/data-grid/data-grid-cells'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './asin-option.style'

interface AsinOptionProps {
  data: BaseOptionType
}

export const AsinOption: FC<AsinOptionProps> = memo(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.optionWrapper}>
      <ProductCell isCell={false} image={data?.images?.[0]} asin={data?.asin} sku={data?.sku} />

      {data?.marketPlaceCountry ? (
        <div className={styles.country}>
          <Avatar size={20} src={getAmazonImageUrl(data.marketPlaceCountry?.image)} />
          <span className={styles.optionText}>{data.marketPlaceCountry?.shortTitle}</span>
        </div>
      ) : null}
    </div>
  )
})
