import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const returnsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'dateUpdated',
      headerName: 'Date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'amzOrderId',
      headerName: 'Amz order id',
      renderHeader: () => <MultilineTextHeaderCell text="Amz order id" />,
      renderCell: params => <TextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.ASIN),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,
      renderCell: ({ row }) => <ProductAsinCell withoutImage withoutTitle asin={row?.asin} skuByClient={row?.sku} />,

      fields: getProductColumnMenuItems({ withoutTitle: true }),
      columnMenuConfig: getProductColumnMenuValue<ParsingReportsType>({
        isSimpleSku: true,
        table: ParsingReportsType.RETURNS,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 210,
    },

    {
      field: 'reason',
      headerName: 'Reason',
      renderHeader: () => <MultilineTextHeaderCell text="Reason" />,
      renderCell: params => <TextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'dateReturned',
      headerName: 'Date returned',
      renderHeader: () => <MultilineTextHeaderCell text="Date returned" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'dateReversal',
      headerName: 'Date reversal',
      renderHeader: () => <MultilineTextHeaderCell text="Date reversal" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'dateReceived',
      headerName: 'Date received',
      renderHeader: () => <MultilineTextHeaderCell text="Date received" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'disposition',
      headerName: 'Disposition',
      renderHeader: () => <MultilineTextHeaderCell text="Disposition" />,
      renderCell: params => <TextCell text={params.value?.replaceAll('_', ' ')} />,
      transformValueMethod: value => value?.replaceAll('_', ' '),
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'status',
      headerName: 'Status',
      renderHeader: () => <MultilineTextHeaderCell text="Status" />,
      renderCell: params => <TextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'messageSent',
      headerName: 'Message sent',
      renderHeader: () => <MultilineTextHeaderCell text="Message sent" />,
      renderCell: params => <TextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 120,
      filterable: false,
      // columnKey: columnnsKeys.shared.STRING_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.RETURNS
    }

    column.sortable = false
  }

  return columns
}
