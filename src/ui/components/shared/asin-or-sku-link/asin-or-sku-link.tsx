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
  notLink?: boolean
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = memo(props => {
  const { link, withCopyValue, withAttributeTitle, textStyles, iconStyles, notLink } = props

  const { classes: styles, cx } = useStyles()

  const amazonExternalLink = `https://www.amazon.com/dp/${link}`
  const title =
    (withAttributeTitle === 'asin' && `${t(TranslationKey.ASIN)}:`) ||
    (withAttributeTitle === 'sku' && `${t(TranslationKey.SKU)}:`)

  return (
    <div className={styles.root}>
      {withAttributeTitle && <p className={cx(styles.text, styles.title, textStyles)}>{title}</p>}

      {link ? (
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={amazonExternalLink}
          className={cx(styles.text, styles.link, { [styles.missingText]: notLink }, textStyles)}
          onClick={e => {
            if (notLink) {
              e.preventDefault()
            }

            e.stopPropagation()
          }}
        >
          {shortLink(link)}
        </a>
      ) : (
        <p className={cx(styles.text, styles.missingText, textStyles)}>{t(TranslationKey.Missing)}</p>
      )}

      {link && withCopyValue ? <CopyValue text={link} iconStyles={iconStyles} /> : null}
    </div>
  )
})
