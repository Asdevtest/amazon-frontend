/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'

import { shortAsin, shortSku } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './asin-or-sku-link.style'
import { FC } from 'react'

interface AsinOrSkuLinkProps {
  asin?: string
  sku?: string
  withAttributeTitle?: boolean
  withCopyValue?: boolean
  textStyles?: string
  missingValueTextStyles?: string
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = observer(
  ({ asin, sku, withCopyValue, withAttributeTitle, textStyles, missingValueTextStyles }) => {
    const { classes: classNames } = useClassNames()

    return (
      <div className={classNames.root}>
        {withAttributeTitle && (
          <p className={cx(classNames.attributeTitle, missingValueTextStyles)}>
            {(asin && t(TranslationKey.ASIN)) || (sku && t(TranslationKey.SKU))}
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
          <p className={cx(classNames.valueText, classNames.skuValueText, textStyles)}>{shortSku(sku)}</p>
        ) : (
          <p className={cx(classNames.missingValueText, missingValueTextStyles)}>{t(TranslationKey.Missing)}</p>
        )}
        {(asin || sku) && withCopyValue && <CopyValue text={asin || sku} />}
      </div>
    )
  },
)
