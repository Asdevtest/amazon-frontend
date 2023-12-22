import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  IdeaActionsCell,
  IdeaRequestsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductAsinCell,
  ShortDateCell,
  SmallRowImageCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

export const clientNewIdeasColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: (params: GridRenderCellParams) => <ShortDateCell value={params.value} />,
    width: 91,
    columnKey: columnnsKeys.shared.DATE,
  },

  // {
  //   field: 'parentProduct',
  //   headerName: t(TranslationKey['Parent product']),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parent product'])} />,

  //   renderCell: params => {
  //     const product = params.row.parentProduct

  //     return (
  //       <ProductAsinCell
  //         image={product?.images?.[0]}
  //         amazonTitle={product?.amazonTitle}
  //         asin={product?.asin}
  //         skuByClient={product?.skuByClient}
  //       />
  //     )
  //   },
  //   width: 265,
  //   sortable: false,

  //   columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  // },
]
