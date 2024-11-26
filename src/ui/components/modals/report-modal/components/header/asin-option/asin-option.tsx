import { Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomImage } from '@components/shared/custom-image'

import { useStyles } from './asin-option.style'

interface AsinOptionProps {
  data: BaseOptionType
}

export const AsinOption: FC<AsinOptionProps> = observer(({ data }) => {
  const { classes: styles } = useStyles()
  return (
    <Space>
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
        <div className={styles.flexContainer}></div>
      </div>
    </Space>
  )
})
