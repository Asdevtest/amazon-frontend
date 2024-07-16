import { Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './request-option.style'

interface RequestOptionProps {
  data: BaseOptionType
}

export const RequestOption: FC<RequestOptionProps> = observer(({ data }) => {
  const { classes: styles, cx } = useStyles()

  const image = getAmazonImageUrl(data.product.images[0])

  return (
    <Space>
      <div className={styles.column}>
        <div className={styles.row}>
          <p className={cx(styles.text, styles.textBold)}>{data.humanFriendlyId}</p>
          <p className={cx(styles.text, styles.fixWidth)}>{`- ${data.title}`}</p>
        </div>

        <div className={styles.row}>
          <img aria-label={data.asin} src={image} alt={image} className={styles.optionImage} />

          <div>
            <p className={cx(styles.text, styles.background, styles.fixWidth, styles.textSecond)}>{data.spec.title}</p>
            <AsinOrSkuLink link={data.asin} textStyles={styles.text} />
          </div>
        </div>
      </div>
    </Space>
  )
})
