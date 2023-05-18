import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const sourceColumns = () => [
  {
    field: 'product',
    headerName: t(TranslationKey.Product),

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductCell
          image={product?.images?.slice()[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skusByClient={product?.skusByClient?.slice()[0]}
        />
      )
    },
    width: 550,
    sortable: false,
  },
]
