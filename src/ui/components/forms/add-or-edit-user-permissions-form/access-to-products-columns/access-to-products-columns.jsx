import { TranslationKey } from '@constants/translations/translation-key'

import { ProductAsinCell } from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const sourceColumns = isResearcher => [
  {
    field: 'product',
    headerName: t(TranslationKey.Product),

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductAsinCell
          withoutSku={isResearcher}
          image={product?.images?.[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skuByClient={product?.skuByClient}
        />
      )
    },
    width: 550,
    sortable: false,
  },
]
