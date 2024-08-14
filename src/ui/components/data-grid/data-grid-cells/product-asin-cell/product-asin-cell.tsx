import { Image } from 'antd'
import Link from 'antd/es/typography/Link'
import Text from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './product-asin-cell.style'

import { TextCell } from '../text-cell/text-cell'

interface ProductCellProps {
  asin?: string
  image?: string
  title?: string
  sku?: string
}

export const ProductCell: FC<ProductCellProps> = memo(props => {
  const { image, title, asin, sku } = props

  const { classes: styles } = useStyles()
  const hoverAsin = useHover()
  const hoverSku = useHover()

  return (
    <div className={styles.root} onClick={e => e.stopPropagation()}>
      {title ? <TextCell isCell={false} copyable={false} textRows={1} text={title} /> : null}

      <div className={styles.flexRow}>
        <Image
          preview={false}
          width={38}
          height={38}
          src={getAmazonImageUrl(image, false)}
          wrapperClassName={styles.image}
        />

        <div className={styles.flexColumn}>
          {asin ? (
            <Link
              {...hoverAsin[1]}
              target="_blank"
              copyable={hoverAsin[0] && !!asin}
              href={`https://www.amazon.com/dp/${asin}`}
              style={{ fontSize: '12px' }}
            >
              {asin}
            </Link>
          ) : null}
          {sku ? (
            <Text {...hoverSku[1]} copyable={hoverSku[0] && !!sku} type="secondary" style={{ fontSize: '12px' }}>
              {sku}
            </Text>
          ) : null}
        </div>
      </div>
    </div>
  )
})
