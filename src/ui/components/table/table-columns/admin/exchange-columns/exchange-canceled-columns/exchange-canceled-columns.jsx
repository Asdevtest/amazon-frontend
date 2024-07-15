import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  SupplierCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const exchangeCanceledColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    minWidth: 120,
    // type: 'date',
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    minWidth: 150,
    // type: 'date',
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductAsinCell
          image={product?.images?.[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skuByClient={product?.skuByClient}
        />
      )
    },
    minWidth: 260,
  },
  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    renderCell: params => <MultilineStatusCell status={params.value} />,
    minWidth: 250,
  },
  {
    field: 'amazon',
    headerName: t(TranslationKey.Price),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    minWidth: 150,
    type: 'number',
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    minWidth: 200,
  },
  {
    field: 'supervisor',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.checkedBy?._id} />
    ),
    minWidth: 200,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.buyer?._id} />,
    minWidth: 200,
  },
  {
    field: 'currentSupplier',
    headerName: t(TranslationKey.Supplier),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supplier)} />,

    renderCell: params => (
      <SupplierCell
        supplierName={params.row.originalData.currentSupplier?.name}
        supplierLink={params.row.originalData.currentSupplier?.link}
      />
    ),
    minWidth: 150,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    minWidth: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    minWidth: 150,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    minWidth: 150,
    type: 'number',
  },
  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    minWidth: 150,
    type: 'number',
  },
  {
    field: 'fbaamount',
    headerName: t(TranslationKey['FBA Amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA Amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    minWidth: 150,
    type: 'number',
  },
]
