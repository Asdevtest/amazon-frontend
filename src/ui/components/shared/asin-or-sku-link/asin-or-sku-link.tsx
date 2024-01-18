import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'

import { shortLink } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './asin-or-sku-link.style'

interface AsinOrSkuLinkProps {
  link?: string
  withAttributeTitle?: 'asin' | 'sku'
  withCopyValue?: boolean
  textStyles?: string
  iconStyles?: string
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = memo(props => {
  const { link, withCopyValue, withAttributeTitle, textStyles, iconStyles } = props

  const { classes: styles, cx } = useStyles()

  const amazonExternalLink = `https://www.amazon.com/dp/${link}`

  return (
    <div className={styles.root}>
      {withAttributeTitle && (
        <p className={cx(styles.attributeTitle, textStyles)}>
          {(withAttributeTitle === 'asin' && `${t(TranslationKey.ASIN)}:`) ||
            (withAttributeTitle === 'sku' && `${t(TranslationKey.SKU)}:`)}
        </p>
      )}

      {link ? (
        <a target="_blank" rel="noreferrer noopener" href={amazonExternalLink} className={styles.normalizeLink}>
          <p className={cx(styles.valueText, styles.asinValueText, textStyles)}>{shortLink(link)}</p>
        </a>
      ) : (
        <p className={cx(styles.valueText, textStyles)}>{t(TranslationKey.Missing)}</p>
      )}

      {link && withCopyValue && <CopyValue text={link} iconStyles={iconStyles} />}
    </div>
  )
})
