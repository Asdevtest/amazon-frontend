import { Image, Typography } from 'antd'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './product-cell.style'

import { Text } from '../../../shared/text/text'

const { Text: AntText, Link } = Typography

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
    <Text copyable={false} textRows={rows} text={text} className={styles.text} />
  )

  const notAsinAndSku = !asin && !sku

  return (
    <div className={styles.root}>
      {title && !notAsinAndSku ? renderTextCell(title, 1) : null}

      <div className={styles.flexRow}>
        <Image
          preview
          width={32}
          height={32}
          src={getAmazonImageUrl(image, false)}
          wrapperClassName={styles.image}
          onClick={e => e.stopPropagation()}
        />

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
                  onClick={e => e.stopPropagation()}
                >
                  {asin}
                </Link>
              ) : null}
              {sku ? (
                <AntText {...hoverSku[1]} copyable={hoverSku[0] && !!sku} type="secondary" className={styles.text}>
                  {sku}
                </AntText>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
})
