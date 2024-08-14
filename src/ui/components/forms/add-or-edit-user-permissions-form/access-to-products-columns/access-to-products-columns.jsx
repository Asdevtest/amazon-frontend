import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const sourceColumns = isResearcher => [
  {
    field: 'product',
    headerName: t(TranslationKey.Product),

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductCell
          image={product?.images?.[0]}
          title={product?.amazonTitle}
          asin={product?.asin}
          sku={product?.skuByClient}
        />
      )
    },
    width: 260,
    minWidth: 100,
    sortable: false,
  },
]
