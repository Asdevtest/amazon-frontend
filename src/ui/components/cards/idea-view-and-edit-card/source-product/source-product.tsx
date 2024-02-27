import { FC } from 'react'

import Tooltip from '@mui/material/Tooltip'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { ShareIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './source-product.style'

interface SourceProductProps {
  showOpenInNewTabIcon?: boolean
  title?: string
  img: string
  asin: string
  sku: string
  onClickShareIcon?: () => void
}

export const SourceProduct: FC<SourceProductProps> = props => {
  const { classes: styles } = useStyles()

  const { title, img, asin, sku, showOpenInNewTabIcon, onClickShareIcon } = props

  return (
    <div className={styles.root}>
      {title && <p className={styles.sourceProductTitle}>{`${title}:`}</p>}

      <div className={styles.sourceProductWrapper}>
        <img
          className={styles.sourceProductImg}
          src={getAmazonImageUrl(img)}
          alt={''}
          onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
        />

        <div className={styles.attributesProductWrapper}>
          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={sku} />
        </div>
      </div>

      {showOpenInNewTabIcon && (
        <Tooltip
          arrow
          title={t(TranslationKey['Open in a new tab'])}
          placement="top"
          classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
        >
          <ShareIcon className={styles.shareLinkIcon} onClick={onClickShareIcon} />
        </Tooltip>
      )}
    </div>
  )
}
