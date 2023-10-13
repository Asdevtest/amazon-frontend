import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'

import { shortAsin, shortSku } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './asin-or-sku-link.style'

interface AsinOrSkuLinkProps {
  asin?: string
  sku?: string
  withAttributeTitle?: 'asin' | 'sku'
  withCopyValue?: boolean
  textStyles?: string
  missingValueTextStyles?: string
  attributeTitleTextStyles?: string
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = observer(
  ({ asin, sku, withCopyValue, withAttributeTitle, textStyles, attributeTitleTextStyles, missingValueTextStyles }) => {
    const { classes: classNames, cx } = useClassNames()

    return (
      <div className={classNames.root}>
        {withAttributeTitle && (
          <p className={cx(classNames.attributeTitle, attributeTitleTextStyles)}>
            {(withAttributeTitle === 'asin' && `${t(TranslationKey.ASIN)}:`) ||
              (withAttributeTitle === 'sku' && `${t(TranslationKey.SKU)}:`)}
          </p>
        )}

        {asin ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.amazon.com/dp/${asin}`}
            className={classNames.normalizeLink}
          >
            <p className={cx(classNames.valueText, classNames.asinValueText, textStyles)}>{shortAsin(asin)}</p>
          </a>
        ) : sku ? (
          <p className={cx(classNames.valueText, textStyles)}>{shortSku(sku)}</p>
        ) : (
          <p className={cx(classNames.valueText, missingValueTextStyles)}>{t(TranslationKey.Missing)}</p>
        )}
        {(asin || sku) && withCopyValue && <CopyValue text={asin || sku} />}
      </div>
    )
  },
)
