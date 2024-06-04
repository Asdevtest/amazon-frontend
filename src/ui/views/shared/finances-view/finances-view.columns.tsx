import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { getPaymentTypeTranslations } from '@constants/finances/get-payment-type-translations'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  ScrollingCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { capitalizeFirstLetter, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const financesViewColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
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
      width: 280,
      table: DataGridFilterTables.PRODUCTS,
      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
    },

    // TODO: no data
    {
      field: 'type',
      headerName: t(TranslationKey.Type),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Type)} />,

      width: 90,
      renderCell: params => <MultilineTextCell text={params.value} />,
    },

    {
      field: 'sum',
      headerName: t(TranslationKey.Sum),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Sum)} />,

      width: 110,

      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey.Initiator),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Initiator)} />,

      width: 170,

      renderCell: params => <UserLinkCell name={params.value.name} userId={params.value?._id} />,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'recipient',
      headerName: t(TranslationKey.Recipient),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Recipient)} />,

      width: 170,

      renderCell: params => <UserLinkCell name={params.value.name} userId={params.value?._id} />,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },

    {
      field: 'paymentType',
      headerName: t(TranslationKey.Category),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Category)} />,

      renderCell: params => <MultilineTextCell text={getPaymentTypeTranslations(params.value)} />,
      width: 90,
    },

    {
      field: 'comment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

      flex: 1,
      renderCell: params => <MultilineTextCell leftAlign threeLines text={params.value} />,

      columnKey: columnnsKeys.shared.STRING,
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
