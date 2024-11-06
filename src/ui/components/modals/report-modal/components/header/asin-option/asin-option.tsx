import { Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { useStyles } from './asin-option.style'

interface AsinOptionProps {
  data: BaseOptionType
}

export const AsinOption: FC<AsinOptionProps> = observer(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <Space>
      <img aria-label={data.asin} src={data.image} alt={data.asin} className={styles.optionImage} />
      <div className={styles.optionContainer}>
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
    </Space>
  )
})
