import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  PaymentMethodsCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { FilesCell } from '@components/data-grid/data-grid-cells/files-cell/files-cell'
import { PriceVariationsCell } from '@components/data-grid/data-grid-cells/price-variations-cell/price-variations-cell'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const suppliersOrderColumn = platformSettings => [
  {
    field: 'supplier',
    headerName: t(TranslationKey.Supplier),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,
    renderCell: ({ row }) => <MultilineTextCell leftAlign text={row.name} />,
    filterable: false,
    sortable: false,
    width: 110,
  },

  {
    field: 'link',
    headerName: t(TranslationKey.Link),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
    renderCell: ({ row }) => <UserMiniCell userName={row.link} />,
    filterable: false,
    sortable: false,
    width: 140,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Price with delivery']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price with delivery'])} />,
    renderCell: ({ row }) => (
      <MultilineTextCell text={toFixedWithDollarSign(row.price + row.batchDeliveryCostInDollar / row.amount, 2)} />
    ),
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'minBatch',
    headerName: t(TranslationKey['Minimum batch']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Minimum batch'])} />,
    renderCell: ({ row }) => <MultilineTextCell text={String(row.minlot)} />,
    filterable: false,
    sortable: false,
    width: 105,
  },

  {
    field: 'bathPrice',
    headerName: t(TranslationKey['Batch price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch price'])} />,
    renderCell: ({ row }) => <MultilineTextCell text={toFixedWithDollarSign(row.batchTotalCostInDollar, 2)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },

  {
    field: 'productionTime',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time'])} />,
    renderCell: ({ row }) => <MultilineTextCell text={row.productionTerm} />,
    filterable: false,
    sortable: false,
    width: 105,
  },

  {
    field: 'priceVariations',
    headerName: t(TranslationKey['Price variations']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Price variations'])} />,
    renderCell: ({ row }) => (
      <PriceVariationsCell variations={row.priceVariations} platformSettings={platformSettings} />
    ),
    filterable: false,
    sortable: false,
    width: 220,
    align: 'center',
  },

  {
    field: 'paymentMethods',
    headerName: t(TranslationKey['Payment methods']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment methods'])} />,
    renderCell: ({ row }) => <PaymentMethodsCell paymentMethods={row.paymentMethods} />,
    filterable: false,
    sortable: false,
    width: 100,
    align: 'center',
  },

  {
    field: 'files',
    headerName: t(TranslationKey.Files),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Files)} />,
    renderCell: ({ row }) => <FilesCell filesLength={row.images?.length} />,
    filterable: false,
    sortable: false,
    width: 100,
    align: 'center',
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }) => <UserMiniCell userName={row.createdBy.name} userId={row.createdBy._id} />,
    filterable: false,
    sortable: false,
    width: 180,
  },

  {
    field: 'updated',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }) => <MultilineTextCell text={formatNormDateTime(row.updatedAt)} />,
    filterable: false,
    sortable: false,
    width: 100,
  },
]
