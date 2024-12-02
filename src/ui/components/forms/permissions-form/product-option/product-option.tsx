import { Typography } from 'antd'
import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './product-option.style'

const { Text: AntText, Link } = Typography

interface ProductOptionProps {
  asin?: string
  image?: string
  label?: string
  sku?: string
  subOption?: boolean
  searchValue?: string
}

export const ProductOption: FC<ProductOptionProps> = memo(props => {
  const { image, label, asin, sku, subOption, searchValue } = props

  const { classes: styles } = useStyles()
  const hoverAsin = useHover()
  const hoverSku = useHover()

  return (
    <div className={styles.flexRow} onClick={e => searchValue?.length && e.stopPropagation()}>
      {subOption ? <CustomImage preview={!searchValue?.length} width={40} height={40} src={image} /> : null}

      <div className={styles.flexColumn}>
        {label ? <p className={styles.title}>{label}</p> : null}

        <div className={styles.flexRow}>
          {asin && subOption ? (
            <Link
              {...hoverAsin[1]}
              ellipsis
              target="_blank"
              copyable={hoverAsin[0] && !!asin && !searchValue?.length}
              href={`https://www.amazon.com/dp/${asin}`}
              className={styles.text}
              onClick={e => e.stopPropagation()}
            >
              {asin}
            </Link>
          ) : null}
          {sku && subOption ? (
            <AntText
              {...hoverSku[1]}
              ellipsis
              copyable={hoverSku[0] && !!sku && !searchValue?.length}
              type="secondary"
              className={styles.text}
            >
              {sku}
            </AntText>
          ) : null}
        </div>
      </div>
    </div>
  )
})
