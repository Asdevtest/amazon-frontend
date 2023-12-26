import { FC } from 'react'

import Tooltip from '@mui/material/Tooltip'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { ShareLinkIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './source-product.styles'

interface SourceProductProps {
  showOpenInNewTabIcon?: boolean
  title?: string
  img: string
  asin: string
  sku: string
  onClickShareIcon?: () => void
}

export const SourceProduct: FC<SourceProductProps> = props => {
  const { classes: classNames } = useClassNames()

  const { title, img, asin, sku, showOpenInNewTabIcon, onClickShareIcon } = props

  return (
    <div className={classNames.root}>
      {title && <p className={classNames.sourceProductTitle}>{`${title}:`}</p>}

      <div className={classNames.sourceProductWrapper}>
        <img
          className={classNames.sourceProductImg}
          src={getAmazonImageUrl(img)}
          alt={''}
          onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
        />

        <div className={classNames.attributesProductWrapper}>
          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={sku} />
        </div>
      </div>

      {showOpenInNewTabIcon && (
        <Tooltip
          arrow
          title={t(TranslationKey['Open in a new tab'])}
          placement="top"
          classes={{ tooltip: classNames.tooltip, arrow: classNames.arrow }}
        >
          <ShareLinkIcon className={classNames.shareLinkIcon} onClick={onClickShareIcon} />
        </Tooltip>
      )}
    </div>
  )
}
