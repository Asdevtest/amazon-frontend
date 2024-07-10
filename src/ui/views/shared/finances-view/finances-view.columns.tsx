import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { getEntityTypeTranslations, getPaymentTypeTranslations } from '@constants/finances/get-type-translations'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getPaymentTypeColor } from './helpers/get-payment-type-color'
import { getPaymentTypeIcon } from './helpers/get-payment-type-icon'

export const financesViewColumns = (userBalance?: boolean) => {
  const columns: IGridColumn[] = [
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: userBalance ? undefined : columnnsKeys.shared.DATE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => {
        const product = row?.entityProduct?.[0]

        return (
          <ProductAsinCell
            image={product?.images?.[0]}
            amazonTitle={product?.amazonTitle}
            asin={product?.asin}
            skuByClient={product?.skuByClient}
          />
        )
      },
      valueGetter: params => params.row?.entityProduct?.[0]?.asin,
      width: 280,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: userBalance ? undefined : columnnsKeys.client.INVENTORY_PRODUCT,
    },

    {
      field: 'paymentType',
      headerName: t(TranslationKey.Type),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

      width: 140,
      renderCell: ({ value }) => {
        const color = getPaymentTypeColor(value)
        const Icon = getPaymentTypeIcon(value)

        return (
          <MultilineTextCell
            startIcon={Icon ? <Icon color={color} /> : null}
            text={getPaymentTypeTranslations(value)}
            color={color}
          />
        )
      },

      transformValueMethod: getPaymentTypeTranslations,

      columnKey: userBalance ? undefined : columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'sum',
      headerName: `${t(TranslationKey.Sum)}, $`,
      renderHeader: () => <MultilineTextHeaderCell text={`${t(TranslationKey.Sum)}, $`} />,

      width: 110,

      renderCell: params => <MultilineTextCell text={toFixed(params.value, 2)} />,

      columnKey: userBalance ? undefined : columnnsKeys.shared.NUMBER,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey.Initiator),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Initiator)} />,

      width: 170,

      renderCell: params => <UserLinkCell name={params.row?.createdBy?.name} userId={params.row?.createdBy?._id} />,
      valueGetter: params => params.value.name,

      columnKey: userBalance ? undefined : columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'recipient',
      headerName: t(TranslationKey.Recipient),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Recipient)} />,

      width: 170,

      renderCell: params => <UserLinkCell name={params.row?.recipient?.name} userId={params.row?.recipient?._id} />,
      valueGetter: params => params.value.name,

      columnKey: userBalance ? undefined : columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'entityType',
      headerName: t(TranslationKey.Category),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

      renderCell: params => <MultilineTextCell text={params.value} />,
      transformValueMethod: getEntityTypeTranslations,

      valueGetter: params => getEntityTypeTranslations(params.value),

      columnKey: userBalance ? undefined : columnnsKeys.shared.STRING_VALUE,

      width: 110,
    },

    {
      field: 'comment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      flex: 1,
      renderCell: params => <MultilineTextCell leftAlign threeLines text={params.value} />,

      columnKey: userBalance ? undefined : columnnsKeys.shared.STRING_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PAYMENTS
    }

    column.sortable = false
  }

  return columns
}
