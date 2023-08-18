import { GridCellParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const GeneralNotificationsColumns = (/* rowHandlers, shops */) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    // renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    renderCell: (params: GridCellParams) => <NormDateCell value={params.value} />,
    width: 100,
    // filterable: false,

    // columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'product',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: (params: GridCellParams) => {
      return (
        <ProductAsinCell
          image={params?.value?.images?.slice()[0]}
          amazonTitle={params?.value?.amazonTitle}
          asin={params?.value?.asin}
          skusByClient={params?.value?.skusByClient?.slice()[0]}
        />
      )
    },
    width: 300,
    // columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'message',
    headerName: t(TranslationKey.Message),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Message)} />,

    // renderCell: (params: GridCellParams) => <MultilineTextCell text={params.value} />,
    renderCell: (params: GridCellParams) => <NormDateCell value={params.value} />,
    width: 100,
    // filterable: false,

    // columnKey: columnnsKeys.shared.STRING,
  },
]
