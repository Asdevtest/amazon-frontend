import React, { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

interface AsinCellProps {
  asin: string
}

export const AsinCell: FC<AsinCellProps> = React.memo(({ asin }) => (
  <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} />
))
