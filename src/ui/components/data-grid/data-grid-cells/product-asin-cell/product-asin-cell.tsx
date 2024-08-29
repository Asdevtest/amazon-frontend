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

  const renderTextCell = (text: string, rows: number) => (
    <TextCell isCell={false} copyable={false} textRows={rows} text={text} className={styles.text} />
  )

  const notAsinAndSku = !asin && !sku

  return (
    <div className={styles.root} onClick={e => e.stopPropagation()}>
      {title && !notAsinAndSku ? renderTextCell(title, 1) : null}

      <div className={styles.flexRow}>
        <Image preview width={32} height={32} src={getAmazonImageUrl(image, false)} wrapperClassName={styles.image} />

        <div className={styles.flexColumn}>
          {notAsinAndSku && title ? (
            renderTextCell(title, 2)
          ) : (
            <>
              {asin ? (
                <Link
                  {...hoverAsin[1]}
                  target="_blank"
                  copyable={hoverAsin[0] && !!asin}
                  href={`https://www.amazon.com/dp/${asin}`}
                  className={styles.text}
                >
                  {asin}
                </Link>
              ) : null}
              {sku ? (
                <Text {...hoverSku[1]} copyable={hoverSku[0] && !!sku} type="secondary" className={styles.text}>
                  {sku}
                </Text>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
})
