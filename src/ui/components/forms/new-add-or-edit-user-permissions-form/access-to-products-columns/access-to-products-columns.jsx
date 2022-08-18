import {TranslationKey} from '@constants/translations/translation-key'

import {ProductCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const sourceColumns = () => [
  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderCell: params => <ProductCell product={params.row.originalData} />,
    width: 620,
    sortable: false,
  },
]
