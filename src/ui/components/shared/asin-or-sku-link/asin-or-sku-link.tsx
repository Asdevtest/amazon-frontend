import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'

import { shortAsin, shortSku } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './asin-or-sku-link.style'

interface AsinOrSkuLinkProps {
  asin?: string
  sku?: string
  withAttributeTitle?: 'asin' | 'sku'
  withCopyValue?: boolean
  textStyles?: string
  missingValueTextStyles?: string
  attributeTitleTextStyles?: string
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = memo(
  ({ asin, sku, withCopyValue, withAttributeTitle, textStyles, attributeTitleTextStyles, missingValueTextStyles }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <div className={styles.root}>
        {withAttributeTitle && (
          <p className={cx(styles.attributeTitle, attributeTitleTextStyles)}>
            {(withAttributeTitle === 'asin' && `${t(TranslationKey.ASIN)}:`) ||
              (withAttributeTitle === 'sku' && `${t(TranslationKey.SKU)}:`)}
          </p>
        )}

        {asin ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.amazon.com/dp/${asin}`}
            className={styles.normalizeLink}
          >
            <p className={cx(styles.valueText, styles.asinValueText, textStyles)}>{shortAsin(asin)}</p>
          </a>
        ) : sku ? (
          <p className={cx(styles.valueText, textStyles)}>{shortSku(sku)}</p>
        ) : (
          <p className={cx(styles.valueText, missingValueTextStyles)}>{t(TranslationKey.Missing)}</p>
        )}
        {(asin || sku) && withCopyValue && <CopyValue text={asin || sku} />}
      </div>
    )
  },
)
