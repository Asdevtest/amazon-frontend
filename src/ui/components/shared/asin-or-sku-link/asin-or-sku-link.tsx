import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'

import { shortLink } from '@utils/text'
import { t } from '@utils/translations'

import { AsinOrSkuType } from '@typings/types/asin-sku'

import { useStyles } from './asin-or-sku-link.style'

interface AsinOrSkuLinkProps {
  link?: string
  withAttributeTitle?: AsinOrSkuType
  withCopyValue?: boolean
  textStyles?: string
  iconStyles?: string
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = memo(props => {
  const { link, withCopyValue, withAttributeTitle, textStyles, iconStyles } = props

  const { classes: styles, cx } = useStyles()

  const amazonExternalLink = `https://www.amazon.com/dp/${link}`
  const title =
    (withAttributeTitle === 'asin' && `${t(TranslationKey.ASIN)}:`) ||
    (withAttributeTitle === 'sku' && `${t(TranslationKey.SKU)}:`)

  const renderLinkAsinOrSku = () =>
    withAttributeTitle === 'sku' ? (
      <p className={cx(styles.text, textStyles)}>{shortLink(link)}</p>
    ) : (
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={amazonExternalLink}
        className={cx(styles.text, styles.link, textStyles)}
        onClick={e => e.stopPropagation()}
      >
        {shortLink(link)}
      </a>
    )

  return (
    <div className={styles.root}>
      {withAttributeTitle ? <p className={cx(styles.title, textStyles)}>{title}</p> : null}

      {link ? renderLinkAsinOrSku() : <p className={cx(styles.text, textStyles)}>{t(TranslationKey.Missing)}</p>}

      {link && withCopyValue ? <CopyValue text={link} iconStyles={iconStyles} /> : null}
    </div>
  )
})
