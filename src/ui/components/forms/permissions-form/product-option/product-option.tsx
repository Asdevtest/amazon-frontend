import { Image, Typography } from 'antd'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './product-option.style'

const { Text: AntText, Link } = Typography

interface ProductOptionProps {
  asin?: string
  image?: string
  label?: string
  sku?: string
  subOption?: boolean
}

export const ProductOption: FC<ProductOptionProps> = memo(props => {
  const { image, label, asin, sku, subOption } = props

  const { classes: styles } = useStyles()
  const hoverAsin = useHover()
  const hoverSku = useHover()

  return (
    <div className={styles.flexRow}>
      {subOption ? (
        <div onClick={e => e.stopPropagation()}>
          <Image
            preview={{ maskClassName: styles.mask }}
            width={40}
            height={40}
            src={getAmazonImageUrl(image, true)}
            wrapperClassName={styles.image}
          />
        </div>
      ) : null}

      <div className={styles.flexColumn}>
        {label ? <p className={styles.title}>{label}</p> : null}

        <div className={styles.flexRow}>
          {asin && subOption ? (
            <Link
              {...hoverAsin[1]}
              ellipsis
              target="_blank"
              copyable={hoverAsin[0] && !!asin}
              href={`https://www.amazon.com/dp/${asin}`}
              className={styles.text}
              onClick={e => e.stopPropagation()}
            >
              {asin}
            </Link>
          ) : null}
          {sku && subOption ? (
            <AntText {...hoverSku[1]} ellipsis copyable={hoverSku[0] && !!sku} type="secondary" className={styles.text}>
              {sku}
            </AntText>
          ) : null}
        </div>
      </div>
    </div>
  )
})
