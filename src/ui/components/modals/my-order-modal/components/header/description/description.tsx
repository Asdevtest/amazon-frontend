import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { useStyles } from './description.style'

interface DescriptionProps {
  amazonTitle: string
  asin: string
  sku: string
}

export const Description: FC<DescriptionProps> = memo(({ amazonTitle, asin, sku }) => {
  const { classes: styles } = useStyles()

  const showAmazonTitle = amazonTitle.length > 0

  return (
    <div className={styles.wrapper}>
      {showAmazonTitle && <p className={styles.amazonTitle}>{amazonTitle}</p>}

      <div className={styles.asinAndSku}>
        <AsinOrSkuLink
          withCopyValue
          withAttributeTitle="asin"
          link={asin}
          textStyles={styles.link}
          iconStyles={styles.icon}
        />
        <AsinOrSkuLink
          withCopyValue
          withAttributeTitle="sku"
          link={sku}
          textStyles={styles.link}
          iconStyles={styles.icon}
        />
      </div>
    </div>
  )
})
