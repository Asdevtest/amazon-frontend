import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

interface AsinCellProps {
  asin: string
}

export const AsinCell: FC<AsinCellProps> = memo(({ asin }) => (
  <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={asin} />
))
