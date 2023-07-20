/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

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
  withCopyValue?: boolean
  linkSpanClass?: string
  missingSpanClass?: string
}

export const AsinOrSkuLink: FC<AsinOrSkuLinkProps> = observer(
  ({ asin, sku, withCopyValue, linkSpanClass, missingSpanClass }) => {
    const { classes: classNames } = useClassNames()

    return (
      <div className={classNames.copyAsin}>
        {asin ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.amazon.com/dp/${asin}`}
            className={classNames.normalizeLink}
          >
            <Typography className={cx(classNames.linkSpan, linkSpanClass)}>{shortAsin(asin)}</Typography>
          </a>
        ) : sku ? (
          <Typography className={cx(classNames.linkSpan, linkSpanClass)}>{shortSku(sku)}</Typography>
        ) : (
          <Typography className={cx(classNames.missingSpan, missingSpanClass)}>{t(TranslationKey.Missing)}</Typography>
        )}
        {(asin || sku) && withCopyValue && <CopyValue text={asin || sku} />}
      </div>
    )
  },
)
