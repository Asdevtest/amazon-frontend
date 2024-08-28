import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  TextCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { getProductColumnMenuItems, getProductColumnMenuValue } from '@config/data-grid-column-menu/product-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const voiceColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

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
      renderCell: ({ row }) => (
        <ProductAsinCell withoutImage amazonTitle={row?.productName} asin={row?.asin} skuByClient={row?.sku} />
      ),

      fields: getProductColumnMenuItems(),
      columnMenuConfig: getProductColumnMenuValue({
        isSimpleSku: true,
        customTitleField: 'productName',
        table: ParsingReportsType.VOICE,
      }),
      columnKey: columnnsKeys.shared.MULTIPLE,
      width: 210,
    },

    {
      field: 'condition',
      headerName: 'Condition',
      renderHeader: () => <MultilineTextHeaderCell text="Condition" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 90,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'totalOrders',
      headerName: 'Total orders',
      renderHeader: () => <MultilineTextHeaderCell text="Total orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 90,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
    },

    {
      field: 'ncxOrders',
      headerName: 'Ncx orders',
      renderHeader: () => <MultilineTextHeaderCell text="Ncx orders" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 90,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
    },

    {
      field: 'fulfilledBy',
      headerName: 'Fulfilled by',
      renderHeader: () => <MultilineTextHeaderCell text="Fulfilled by" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 90,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'ncxRate',
      headerName: 'Ncx rate',
      renderHeader: () => <MultilineTextHeaderCell text="Ncx rate" />,

      renderCell: params => <TextCell text={toFixed(params.value)} />,
      width: 90,
      columnKey: columnnsKeys.shared.NUMBER,
      disableCustomSort: true,
    },

    {
      field: 'topNcxReason',
      headerName: 'Top ncx reason',
      renderHeader: () => <MultilineTextHeaderCell text="Top ncx reason" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 90,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'lastUpdated',
      headerName: 'Last updated',
      renderHeader: () => <MultilineTextHeaderCell text="Last updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'pcxHealth',
      headerName: 'Pcx health',
      renderHeader: () => <MultilineTextHeaderCell text="Pcx health" />,

      renderCell: params => <TextCell text={params.value} />,
      width: 90,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      disableCustomSort: true,
    },

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
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.VOICE
    }

    column.sortable = false
  }

  return columns
}
