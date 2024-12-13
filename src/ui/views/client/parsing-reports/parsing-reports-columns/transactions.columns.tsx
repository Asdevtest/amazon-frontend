import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const transactionsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'date',
      headerName: 'Date',
      renderHeader: () => <MultilineTextHeaderCell text="Date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE_VALUE,
    },

    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <MultilineTextHeaderCell text="Status" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'type',
      headerName: 'Type',
      renderHeader: () => <MultilineTextHeaderCell text="Type" />,

      renderCell: params => <Text isCell text={params.value?.replace?.(/_/g, ' ')} />,
      transformValueMethod: value => value?.replace?.(/_/g, ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'amzOrderId',
      headerName: 'AMZ order ID',
      renderHeader: () => <MultilineTextHeaderCell text="AMZ order ID" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'productId',
      headerName: ' Product ID',
      renderHeader: () => <MultilineTextHeaderCell text=" Product ID" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'productDetails',
      headerName: 'Product details',
      renderHeader: () => <MultilineTextHeaderCell text="Product details" />,

      renderCell: params => <Text isCell text={params.value} />,
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'totalProductCharges',
      headerName: 'Total product charges',
      renderHeader: () => <MultilineTextHeaderCell text="Total product charges" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'totalProductRebates',
      headerName: 'Total product rebates',
      renderHeader: () => <MultilineTextHeaderCell text="Total product rebates" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'amazonFees',
      headerName: 'Amazon fees',
      renderHeader: () => <MultilineTextHeaderCell text="Amazon fees" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'totalUsd',
      headerName: 'Total USD',
      renderHeader: () => <MultilineTextHeaderCell text="Total USD" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'fbaFee',
      headerName: 'Fba fee',
      renderHeader: () => <MultilineTextHeaderCell text="Fba fee" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'referralFee',
      headerName: 'Referral fee',
      renderHeader: () => <MultilineTextHeaderCell text="Referral fee" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'otherFees',
      headerName: 'Other fees',
      renderHeader: () => <MultilineTextHeaderCell text="Other fees" />,

      renderCell: params => <Text isCell text={toFixed(params.value)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <Text isCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => (
        <UserCell name={params.row.client?.name} id={params.row.client?._id} email={params.row.client?.email} />
      ),
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.TRANSACTIONS
    }

    column.sortable = false
  }

  return columns
}
